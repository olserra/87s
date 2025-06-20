"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Pause, Volume2, User, Settings } from 'lucide-react';
import type { CreatePodcastData } from '@/lib/types';

interface VoiceStepProps {
  data: Partial<CreatePodcastData>;
  updateData: (data: Partial<CreatePodcastData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const voices = [
  {
    id: 'default',
    name: 'Alex',
    type: 'Neural',
    gender: 'Neutral',
    accent: 'American',
    description: 'Clear, professional voice perfect for educational content',
    tags: ['Professional', 'Clear', 'Versatile'],
    premium: false,
  },
  {
    id: 'male-1',
    name: 'Marcus',
    type: 'Neural',
    gender: 'Male',
    accent: 'American',
    description: 'Warm, authoritative voice ideal for business and tech content',
    tags: ['Authoritative', 'Warm', 'Business'],
    premium: false,
  },
  {
    id: 'female-1',
    name: 'Sarah',
    type: 'Neural',
    gender: 'Female',
    accent: 'American',
    description: 'Friendly, engaging voice perfect for lifestyle and educational podcasts',
    tags: ['Friendly', 'Engaging', 'Conversational'],
    premium: false,
  },
  {
    id: 'male-2',
    name: 'James',
    type: 'Neural',
    gender: 'Male',
    accent: 'British',
    description: 'Sophisticated British accent for premium content',
    tags: ['Sophisticated', 'British', 'Premium'],
    premium: true,
  },
  {
    id: 'female-2',
    name: 'Emma',
    type: 'Neural',
    gender: 'Female',
    accent: 'British',
    description: 'Elegant British voice with clear articulation',
    tags: ['Elegant', 'Clear', 'British'],
    premium: true,
  },
];

// Map local voice IDs to ElevenLabs voice IDs (replace with real IDs as needed)
const elevenLabsVoiceMap: Record<string, string> = {
  default: 'EXAVITQu4vr4xnSDxMaL', // Example ElevenLabs voice ID for "Rachel"
  'male-1': 'TxGEqnHWrfWFTfGW9XjX', // Example for "Domi"
  'female-1': 'pNInz6obpgDQGcFmaJgB', // Example for "Bella"
  'male-2': 'ErXwobaYiN019PkySvjV', // Example for "Antoni"
  'female-2': 'MF3mGyEYCl7XYWbV9V6O', // Example for "Elli"
};

export function VoiceStep({ data, updateData, onNext, onPrev }: VoiceStepProps) {
  const [selectedVoice, setSelectedVoice] = useState(data.voiceType || 'default');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    speed: [1.0],
    pitch: [1.0],
    stability: [0.5],
  });
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    updateData({ voiceType: voiceId });
  };

  const handlePlayPreview = async (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }
    setLoadingAudio(true);
    setPlayingVoice(voiceId);
    setAudioUrl(null);
    try {
      const res = await fetch('/api/tts/elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'This is a sample preview of the selected AI voice.',
          voice: elevenLabsVoiceMap[voiceId] || elevenLabsVoiceMap['default'],
        }),
      });
      if (!res.ok) throw new Error('Failed to fetch audio');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100); // slight delay to ensure audio element updates
    } catch (err) {
      setPlayingVoice(null);
      alert('Error fetching audio preview.');
    } finally {
      setLoadingAudio(false);
    }
  };

  const canProceed = selectedVoice !== '';

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="h-5 w-5" />
            <span>Voice Selection</span>
          </CardTitle>
          <CardDescription>
            Choose the perfect AI voice for your podcast and customize its settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voices.map((voice) => (
              <Card
                key={voice.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedVoice === voice.id ? 'ring-2 ring-primary' : ''
                  } ${voice.premium ? 'border-primary/50' : ''}`}
                onClick={() => handleVoiceSelect(voice.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-base">{voice.name}</CardTitle>
                        {voice.premium && (
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{voice.gender}</span>
                        <span>•</span>
                        <span>{voice.accent}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handlePlayPreview(voice.id);
                      }}
                      disabled={loadingAudio && playingVoice === voice.id}
                    >
                      {loadingAudio && playingVoice === voice.id ? (
                        <span className="animate-spin">🔄</span>
                      ) : playingVoice === voice.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription className="text-sm">
                    {voice.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {voice.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Voice Settings */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base">
                <Settings className="h-4 w-4" />
                <span>Voice Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Speed</Label>
                  <Slider
                    value={voiceSettings.speed}
                    onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, speed: value }))}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slow</span>
                    <span>{voiceSettings.speed[0]}x</span>
                    <span>Fast</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pitch</Label>
                  <Slider
                    value={voiceSettings.pitch}
                    onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, pitch: value }))}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low</span>
                    <span>{voiceSettings.pitch[0]}x</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stability</Label>
                  <Slider
                    value={voiceSettings.stability}
                    onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, stability: value }))}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Variable</span>
                    <span>{Math.round(voiceSettings.stability[0] * 100)}%</span>
                    <span>Stable</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button variant="outline" onClick={() => handlePlayPreview(selectedVoice)}>
                  {playingVoice === selectedVoice ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Test Voice Settings
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audio element for preview */}
          <audio
            ref={audioRef}
            src={audioUrl || undefined}
            onEnded={() => setPlayingVoice(null)}
            style={{ display: 'none' }}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back to Script
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continue to Avatar
        </Button>
      </div>
    </div>
  );
}