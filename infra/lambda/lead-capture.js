/* ════════════════════════════════════════════════════════════════════════
   MMA Design — Lead Capture Lambda
   Receives enquiry form submissions from the website, sends an email
   notification via Amazon SES, and optionally stores the lead in DynamoDB
   for CRM-ready data capture. Deployed behind API Gateway (REST, POST).
   Environment variables (set in CloudFormation / deploy):
     NOTIFY_EMAIL    — address enquiry notifications are sent to
     FROM_EMAIL      — SES verified sender address
     LEADS_TABLE     — (optional) DynamoDB table name for lead storage
     REGION          — AWS region (defaults to ap-south-1)
   ════════════════════════════════════════════════════════════════════════ */
const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Pre-flight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }

  // Parse the submission
  let data;
  try {
    data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } catch (e) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ ok: false, error: 'Invalid JSON' }) };
  }

  // Validate required fields
  const errors = [];
  if (!data.name || !data.name.trim()) errors.push('Name is required');
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('A valid email is required');
  if (errors.length) {
    return { statusCode: 422, headers: corsHeaders, body: JSON.stringify({ ok: false, errors }) };
  }

  const region = process.env.REGION || 'ap-south-1';
  const notifyEmail = process.env.NOTIFY_EMAIL || 'enquiries@mmadesign.in';
  const fromEmail = process.env.FROM_EMAIL || notifyEmail;
  const leadId = 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  const timestamp = new Date().toISOString();

  const lead = {
    id: leadId,
    timestamp,
    name: data.name.trim(),
    email: data.email.trim(),
    company: (data.company || '').trim(),
    projectType: (data.projectType || '').trim(),
    message: (data.message || '').trim(),
    source: data.source || 'website-enquiry',
    userAgent: event.headers ? (event.headers['User-Agent'] || '') : '',
    ip: event.requestContext ? (event.requestContext.identity || {}).sourceIp : ''
  };

  const results = { ok: true, leadId };

  // ── Send email via SES ──
  try {
    const ses = new AWS.SES({ region });
    const emailBody = [
      'New enquiry from mmadesign.in',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      'Name:           ' + lead.name,
      'Email:          ' + lead.email,
      'Company:        ' + lead.company,
      'Project type:   ' + lead.projectType,
      '',
      'Message:',
      lead.message,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Submitted:      ' + timestamp,
      'Lead ID:        ' + leadId,
      'Source IP:      ' + lead.ip
    ].join('\n');

    await ses.sendEmail({
      Source: fromEmail,
      Destination: { ToAddresses: [notifyEmail] },
      Message: {
        Subject: { Data: '[MMA Design] New enquiry from ' + lead.name, Charset: 'UTF-8' },
        Body: { Text: { Data: emailBody, Charset: 'UTF-8' } }
      }
    }).promise();
    results.emailSent = true;
  } catch (err) {
    results.emailSent = false;
    results.emailError = err.message;
  }

  // ── Store lead in DynamoDB (optional) ──
  if (process.env.LEADS_TABLE) {
    try {
      const doc = new AWS.DynamoDB.DocumentClient({ region });
      await doc.put({
        TableName: process.env.LEADS_TABLE,
        Item: lead
      }).promise();
      results.stored = true;
    } catch (err) {
      results.stored = false;
      results.storeError = err.message;
    }
  }

  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(results)
  };
};
