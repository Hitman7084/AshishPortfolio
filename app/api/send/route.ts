import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.SEND_EMAIL;
const recipientEmail = process.env.RECIEVE_EMAIL;

const senderEmailStr = senderEmail as string;
const recipientEmailStr = recipientEmail as string;
const resend = new Resend(apiKey);

interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    // Add request content type check
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type must be application/json' }),
        { 
          status: 415,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('JSON parse error:', e);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { name, email, message } = body as EmailRequest;
    
    // Validate all required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: name, email, and message are required.',
          received: { name, email, message }
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const subject = `New message from ${name}`;
    const html = `<p>You have received a new message from the contact form.</p>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>`;

    const result = await resend.emails.send({
      from: senderEmailStr,
      to: recipientEmailStr,
      subject,
      html,
      replyTo: email
    });

    return new Response(
      JSON.stringify({ success: true, result }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Email send error:', error);
    // Log detailed error for debugging
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });

    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email',
        message: error.message
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
