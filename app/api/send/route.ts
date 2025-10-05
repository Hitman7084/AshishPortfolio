// Type definitions
interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

interface EmailJSResponse {
  status: number;
  text: string;
}

interface EmailJSParams {
  from_name: string;
  reply_to: string;
  to_email: string;
  message: string;
}

interface EmailJSRequestData {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: EmailJSParams;
}

// Function to send email using EmailJS REST API
async function sendEmailJS(
  templateParams: EmailJSParams,
  serviceId: string,
  templateId: string,
  userId: string
): Promise<EmailJSResponse> {
  const url = 'https://api.emailjs.com/api/v1.0/email/send';
  const data: EmailJSRequestData = {
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

  return {
    status: response.status,
    text: await response.text()
  };
}

// Environment variable validation with type safety
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const EMAILJS_SERVICE_ID = getRequiredEnvVar('EMAILJS_SERVICE_ID');
const EMAILJS_TEMPLATE_ID = getRequiredEnvVar('EMAILJS_TEMPLATE_ID');
const EMAILJS_USER_ID = getRequiredEnvVar('EMAILJS_USER_ID');
const RECIEVE_EMAIL = getRequiredEnvVar('RECIEVE_EMAIL');

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
    const templateParams: EmailJSParams = {
      from_name: name,
      reply_to: email,
      to_email: RECIEVE_EMAIL,
      message: message
    };

    // Send email using EmailJS REST API
    const emailResult = await sendEmailJS(
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
  } catch (error) {
    console.error('Email send error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred';

    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email',
        message: errorMessage
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
