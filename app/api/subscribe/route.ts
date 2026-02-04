import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Google Sheets API integration
    const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets URL not configured');
      // Still return success to user, but log the error
      return NextResponse.json({ success: true });
    }

    // Send to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Failed to save to Google Sheets');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
