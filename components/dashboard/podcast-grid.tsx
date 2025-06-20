"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, MoreHorizontal, Clock, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data - in real app, this would come from your database
const podcasts = [
  {
    id: '1',
    title: 'Tech Trends 2024',
    description: 'Exploring the latest technology trends and innovations',
    status: 'completed',
    duration: 1440, // 24 minutes in seconds
    createdAt: new Date('2024-01-15'),
    avatarType: 'male',
    voiceType: 'professional',
  },
  {
    id: '2',
    title: 'AI in Healthcare',
    description: 'How artificial intelligence is transforming healthcare',
    status: 'processing',
    duration: null,
    createdAt: new Date('2024-01-14'),
    avatarType: 'female',
    voiceType: 'conversational',
  },
  {
    id: '3',
    title: 'Sustainable Living',
    description: 'Tips and tricks for living a more sustainable lifestyle',
    status: 'draft',
    duration: null,
    createdAt: new Date('2024-01-13'),
    avatarType: 'none',
    voiceType: 'default',
  },
];

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'draft':
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    case 'failed':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
}

export function PodcastGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Podcasts</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <Card key={podcast.id} className="glass group hover:bg-card/80 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{podcast.title}</CardTitle>
                  <CardDescription>{podcast.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{podcast.createdAt.toLocaleDateString()}</span>
                </div>
                {podcast.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(podcast.duration)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getStatusColor(podcast.status)}>
                  {podcast.status}
                </Badge>
                
                {podcast.status === 'completed' && (
                  <Button size="sm" variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}