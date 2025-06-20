"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';
import { Mic, Sparkles, Plus } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Mic className="h-8 w-8 text-primary" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-purple-500" />
            </div>
            <span className="text-xl font-bold gradient-text">PodcastAI</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Podcast
              </Link>
            </Button>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}