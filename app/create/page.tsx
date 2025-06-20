import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { CreateHeader } from '@/components/create/create-header';
import { CreateWorkflow } from '@/components/create/create-workflow';

export default async function CreatePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <CreateHeader />
      <main className="container mx-auto px-4 py-8">
        <CreateWorkflow />
      </main>
    </div>
  );
}