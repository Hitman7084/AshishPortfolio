// Function to send email using EmailJS REST API
async function sendEmailJS(templateParams: FormData, serviceId: string, templateId: string, userId: string) {
  const url = 'https://api.emailjs.com/api/v1.0/email/send';
  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    template_params: templateParams,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`EmailJS API error: ${errorData}`);
  }

  return response;
}

interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

type FormData = {
  from_name: string;
  reply_to: string;
  to_email: string;
  message: string;
}

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || '';
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID || '';
const RECIEVE_EMAIL = process.env.RECIEVE_EMAIL || '';

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID || !RECIEVE_EMAIL) {
  throw new Error('Missing required EmailJS environment variables');
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type must be application/json' }),
        { 
          status: 415,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    let body: EmailRequest;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { name, email, message } = body;

    // Validate fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare EmailJS parameters
    const templateParams: FormData = {
      from_name: name,
      reply_to: email,
      to_email: RECIEVE_EMAIL,
      message: message
    };

    // Send email using EmailJS REST API
    await sendEmailJS(
      templateParams,
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      EMAILJS_USER_ID
    );

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Email send error:', error);
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
