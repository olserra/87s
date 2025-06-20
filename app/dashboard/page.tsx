import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { PodcastGrid } from '@/components/dashboard/podcast-grid';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user?.name || 'Creator'}! Manage your podcasts and track your progress.
          </p>
        </div>
        
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PodcastGrid />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}