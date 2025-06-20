"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, Users, UserX, Video, Monitor } from 'lucide-react';
import type { CreatePodcastData } from '@/lib/types';

interface AvatarStepProps {
  data: Partial<CreatePodcastData>;
  updateData: (data: Partial<CreatePodcastData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const avatarOptions = [
  {
    id: 'none',
    name: 'Audio Only',
    description: 'Pure audio podcast without visual avatar',
    icon: UserX,
    preview: null,
    free: true,
  },
  {
    id: 'male',
    name: 'Professional Male',
    description: 'Business professional male avatar',
    icon: User,
    preview: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    free: true,
  },
  {
    id: 'female',
    name: 'Professional Female',
    description: 'Business professional female avatar',
    icon: Users,
    preview: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    free: true,
  },
];

const backgrounds = [
  {
    id: 'studio',
    name: 'Professional Studio',
    description: 'Modern podcast studio background',
    preview: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    free: true,
  },
  {
    id: 'office',
    name: 'Modern Office',
    description: 'Clean, professional office setting',
    preview: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    free: true,
  },
  {
    id: 'home',
    name: 'Home Office',
    description: 'Comfortable home office environment',
    preview: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    free: true,
  },
];

export function AvatarStep({ data, updateData, onNext, onPrev }: AvatarStepProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(data.avatarType || 'none');
  const [selectedBackground, setSelectedBackground] = useState('studio');

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    updateData({ avatarType: avatarId as any });
  };

  const canProceed = selectedAvatar !== '';

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Avatar & Visuals</span>
          </CardTitle>
          <CardDescription>
            Choose your podcast's visual style and avatar presentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold">Avatar Style</h3>
            <RadioGroup value={selectedAvatar} onValueChange={handleAvatarSelect}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {avatarOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <Label
                      htmlFor={option.id}
                      className={`cursor-pointer block p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        selectedAvatar === option.id ? 'ring-2 ring-primary border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <span className="font-medium">{option.name}</span>
                        {option.free && (
                          <Badge variant="secondary" className="text-xs">Free</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {option.preview ? (
                          <div className="aspect-square rounded-lg bg-muted overflow-hidden">
                            <img
                              src={option.preview}
                              alt={option.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                            <option.icon className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Background Selection - Only show if avatar is selected */}
          {selectedAvatar !== 'none' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Background Setting</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {backgrounds.map((bg) => (
                  <Card
                    key={bg.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedBackground === bg.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedBackground(bg.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                          <img
                            src={bg.preview}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{bg.name}</h4>
                            {bg.free && (
                              <Badge variant="secondary" className="text-xs">Free</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {bg.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Preview */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base">
                <Monitor className="h-4 w-4" />
                <span>Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {selectedAvatar === 'none' ? (
                  <div className="text-center space-y-2">
                    <UserX className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Audio Only Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Your podcast will be delivered as pure audio
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Video Preview</p>
                    <p className="text-xs text-muted-foreground">
                      Your avatar will appear with the selected background
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back to Voice
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continue to Review
        </Button>
      </div>
    </div>
  );
}