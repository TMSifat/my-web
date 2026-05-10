import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { full_name, email, message } = await req.json();

  if (!full_name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // 1. Save to Supabase
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ full_name, email, message }]);

    if (dbError) {
      console.error('Supabase error:', dbError.message);
      return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
    }
  } catch (err) {
    console.error('DB error:', err);
    return NextResponse.json({ error: 'Database error.' }, { status: 500 });
  }

  // 2. Send Email via Resend
  try {
    const { error: emailError } = await resend.emails.send({
      from: 'CrunchBite Studio <onboarding@resend.dev>', // Resend test domain allows onboarding@resend.dev to verified email
      to: 'tanvirsifat51@gmail.com',
      subject: `🍔 New Message from ${full_name} | CrunchBite`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #E1E0CC; padding: 40px; border-radius: 16px; border: 1px solid #1a1a1a;">
          <h1 style="color: #f97316; font-size: 24px; margin-bottom: 8px;">🍔 New Contact Message</h1>
          <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 32px;">CrunchBite Studio — Admin Notification</p>
          
          <div style="background: #111; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
            <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Sender</p>
            <p style="color: #E1E0CC; font-size: 18px; font-weight: bold; margin: 0;">${full_name}</p>
          </div>

          <div style="background: #111; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
            <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Email Address</p>
            <p style="color: #f97316; font-size: 16px; margin: 0;">${email}</p>
          </div>

          <div style="background: #111; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Message</p>
            <p style="color: #E1E0CC; font-size: 15px; line-height: 1.8; margin: 0;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display: block; background: #f97316; color: black; text-align: center; padding: 16px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 1px;">
            REPLY TO ${full_name.toUpperCase()}
          </a>

          <p style="color: #333; font-size: 11px; text-align: center; margin-top: 24px;">CrunchBite Studio Admin Panel • Auto-generated notification</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend email error:', emailError);
      return NextResponse.json({ success: true, warning: 'Saved but email failed.' });
    }

  } catch (emailErr) {
    console.error('Email error:', emailErr);
    // Message saved to DB but email failed - still return success
    return NextResponse.json({ success: true, warning: 'Saved but email failed.' });
  }

  return NextResponse.json({ success: true });
}
