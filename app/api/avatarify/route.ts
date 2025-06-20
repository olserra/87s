import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { imageUrl, audioUrl } = await req.json();
    if (!imageUrl || !audioUrl) {
      return NextResponse.json({ error: 'Missing imageUrl or audioUrl parameter' }, { status: 400 });
    }

    const apiUrl = process.env.HUGGINGFACE_AVATAR_GEN;
    if (!apiUrl) {
      return NextResponse.json({ error: 'Missing Hugging Face Avatarify API URL' }, { status: 500 });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [imageUrl, audioUrl] }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const result = await response.json();
    // result.data[0] is usually the video URL or base64 string
    return NextResponse.json({ video: result.data[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
} 