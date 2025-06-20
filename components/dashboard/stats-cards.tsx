"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Clock, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Podcasts',
    value: '12',
    icon: Mic,
    change: '+2 this month',
  },
  {
    title: 'Total Duration',
    value: '4.2h',
    icon: Clock,
    change: '+45m this week',
  },
  {
    title: 'Avg. Quality Score',
    value: '94%',
    icon: TrendingUp,
    change: '+3% vs last month',
  },
  {
    title: 'Listeners',
    value: '1,284',
    icon: Users,
    change: '+12% this month',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}