"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Volume2,
  Video,
  Clock,
  Sparkles,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import type { CreatePodcastData } from '@/lib/types';

interface ReviewStepProps {
  data: Partial<CreatePodcastData>;
  onPrev: () => void;
}

export function ReviewStep({ data, onPrev }: ReviewStepProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const estimatedDuration = Math.ceil((data.script?.length || 0) / 200); // Rough estimate: 200 chars per minute

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedVideo(null);
    setVideoError(null);

    const steps = [
      { name: 'Processing script...', duration: 2000 },
      { name: 'Generating voice audio...', duration: 3000 },
      { name: 'Creating avatar video...', duration: data.avatarType !== 'none' ? 4000 : 0 },
      { name: 'Synchronizing audio and video...', duration: data.avatarType !== 'none' ? 2000 : 0 },
      { name: 'Finalizing podcast...', duration: 1000 },
    ];

    let totalProgress = 0;
    const totalSteps = steps.filter(step => step.duration > 0).length;

    for (const step of steps) {
      if (step.duration === 0) continue;

      setCurrentStep(step.name);

      // Simulate progress for this step
      const stepProgress = 100 / totalSteps;
      const stepDuration = step.duration;
      const progressInterval = 50; // Update every 50ms
      const progressIncrement = stepProgress / (stepDuration / progressInterval);

      for (let i = 0; i < stepDuration; i += progressInterval) {
        await new Promise(resolve => setTimeout(resolve, progressInterval));
        totalProgress += progressIncrement;
        setGenerationProgress(Math.min(totalProgress, 100));
      }
    }

    // Call Avatarify microservice if avatarType is not 'none'
    if (data.avatarType !== 'none') {
      setCurrentStep('Generating avatar video...');
      try {
        const imageUrl = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop';
        const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
        const res = await fetch('/api/avatarify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl, audioUrl }),
        });
        if (!res.ok) throw new Error('Failed to generate avatar video');
        const result = await res.json();
        setGeneratedVideo(result.video);
        setCurrentStep('Complete!');
        setGenerationProgress(100);
        toast.success('Podcast generated successfully!');
      } catch (err: any) {
        setVideoError('Error generating avatar video.');
        setCurrentStep('Error');
        setGenerationProgress(100);
        toast.error('Failed to generate avatar video.');
      }
    } else {
      setCurrentStep('Complete!');
      setGenerationProgress(100);
      toast.success('Podcast generated successfully!');
    }
  };

  const getAvatarTypeLabel = (type: string) => {
    switch (type) {
      case 'none': return 'Audio Only';
      case 'male': return 'Professional Male';
      case 'female': return 'Professional Female';
      default: return 'Not Selected';
    }
  };

  const getVoiceTypeLabel = (type: string) => {
    switch (type) {
      case 'default': return 'Alex (Neural)';
      case 'male-1': return 'Marcus (Male)';
      case 'female-1': return 'Sarah (Female)';
      case 'male-2': return 'James (British)';
      case 'female-2': return 'Emma (British)';
      default: return 'Default Voice';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Review & Generate</span>
          </CardTitle>
          <CardDescription>
            Review your podcast settings and generate your AI-powered content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Content</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="font-medium">{data.title || 'Untitled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Description:</span>
                    <span className="font-medium text-right max-w-xs truncate">
                      {data.description || 'No description'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Script Length:</span>
                    <span className="font-medium">{data.script?.length || 0} characters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Duration:</span>
                    <span className="font-medium">{estimatedDuration} minutes</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Voice</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Voice:</span>
                    <span className="font-medium">{getVoiceTypeLabel(data.voiceType || 'default')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality:</span>
                    <Badge variant="secondary">Neural</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span>Visual</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avatar:</span>
                    <span className="font-medium">{getAvatarTypeLabel(data.avatarType || 'none')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">
                      {data.avatarType === 'none' ? 'Audio' : 'Video + Audio'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Generation Time</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Voice Synthesis:</span>
                    <span className="font-medium">~2-3 minutes</span>
                  </div>
                  {data.avatarType !== 'none' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avatar Generation:</span>
                      <span className="font-medium">~3-5 minutes</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing:</span>
                    <span className="font-medium">~1 minute</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Estimated Time:</span>
                    <span>{data.avatarType !== 'none' ? '6-9 minutes' : '3-4 minutes'}</span>
                  </div>
                </div>
              </div>

              <Card className="border-dashed bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">AI Generation</h4>
                      <p className="text-xs text-muted-foreground">
                        Your podcast will be generated using state-of-the-art AI models
                        for voice synthesis and avatar creation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="glass">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <h3 className="font-semibold">Generating Your Podcast</h3>
                <p className="text-sm text-muted-foreground">{currentStep}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>

              <p className="text-xs text-center text-muted-foreground">
                This process may take several minutes. Please don't close this window.
              </p>
              {generatedVideo && (
                <div className="mt-4">
                  <video src={generatedVideo} controls className="w-full rounded-lg" />
                  <p className="text-xs text-center mt-2">Your generated avatar video</p>
                </div>
              )}
              {videoError && (
                <div className="mt-4 text-red-500 text-center text-xs">{videoError}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isGenerating}>
          Back to Avatar
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          size="lg"
          className="min-w-[160px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Podcast
            </>
          )}
        </Button>
      </div>
    </div>
  );
}