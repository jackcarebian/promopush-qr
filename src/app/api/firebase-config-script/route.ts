
import { NextResponse } from 'next/server';

export async function GET() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Prevent returning an incomplete config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    const errorScript = 'console.error("Firebase config is missing from environment variables.");';
    return new Response(errorScript, {
        headers: { 'Content-Type': 'application/javascript' },
        status: 500,
    });
  }

  const scriptContent = `self.firebaseConfig = ${JSON.stringify(firebaseConfig)};`;

  return new Response(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}
