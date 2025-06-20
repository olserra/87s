"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';

// Mock data - in real app, this would come from your database
const activities = [
  {
    id: '1',
    type: 'podcast_completed',
    title: 'Tech Trends 2024',
    description: 'Podcast generation completed successfully',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'success',
  },
  {
    id: '2',
    type: 'podcast_processing',
    title: 'AI in Healthcare',
    description: 'Voice synthesis in progress',
    timestamp: new Date('2024-01-15T09:15:00'),
    status: 'processing',
  },
  {
    id: '3',
    type: 'podcast_created',
    title: 'Sustainable Living',
    description: 'New podcast draft created',
    timestamp: new Date('2024-01-14T16:45:00'),
    status: 'draft',
  },
  {
    id: '4',
    type: 'podcast_completed',
    title: 'Future of Work',
    description: 'Podcast generation completed successfully',
    timestamp: new Date('2024-01-14T14:20:00'),
    status: 'success',
  },
];

function getActivityIcon(status: string) {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'processing':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Circle className="h-4 w-4 text-gray-500" />;
  }
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
}

export function RecentActivity() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your latest podcast creation activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="mt-1">
                {getActivityIcon(activity.status)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {getRelativeTime(activity.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}