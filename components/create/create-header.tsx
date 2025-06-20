"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';
import { ArrowLeft, Mic, Sparkles } from 'lucide-react';

export function CreateHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center">
                <ArrowLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Back to Dashboard</span>
              </Link>
            </Button>

            <div className="h-6 w-px bg-border hidden md:block" />

            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Mic className="h-6 w-6 text-primary" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-purple-500" />
              </div>
              <span className="hidden sm:inline text-lg font-bold gradient-text">PodcastAI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}