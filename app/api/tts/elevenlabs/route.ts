import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('TTS API received body:', body);
    const { text, voice, speed = 1.0, pitch, stability = 0.5 } = body;
    if (!text || !voice) {
      return NextResponse.json({ error: 'Missing text or voice parameter' }, { status: 400 });
    }

    let clampedSpeed = Number(speed);
    if (clampedSpeed < 0.7) {
      console.warn(`Speed value ${clampedSpeed} is below ElevenLabs minimum. Clamping to 0.7.`);
      clampedSpeed = 0.7;
    } else if (clampedSpeed > 1.2) {
      console.warn(`Speed value ${clampedSpeed} is above ElevenLabs maximum. Clamping to 1.2.`);
      clampedSpeed = 1.2;
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing ElevenLabs API key' }, { status: 500 });
    }

    // Log pitch for future compatibility (not used by ElevenLabs as of now)
    if (typeof pitch !== 'undefined') {
      console.log('Received pitch (not used by ElevenLabs):', pitch);
    }

    // ElevenLabs API endpoint for TTS
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: Number(stability),
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true,
          speed: clampedSpeed,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json({ error }, { status: response.status });
    }

    // Return the audio stream
    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="preview.mp3"',
      },
    });
  } catch (err: any) {
    console.error('TTS API error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
} 