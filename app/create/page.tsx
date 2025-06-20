"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreateHeader } from '@/components/create/create-header';
import { CreateWorkflow } from '@/components/create/create-workflow';

export default function CreatePage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('session_token')) {
      router.replace('/auth/signin');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <CreateHeader />
      <main className="container mx-auto px-4 py-8">
        <CreateWorkflow />
      </main>
    </div>
  );
}