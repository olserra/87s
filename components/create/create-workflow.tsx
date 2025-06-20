"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, ChevronRight } from 'lucide-react';
import { ScriptStep } from './steps/script-step';
import { VoiceStep } from './steps/voice-step';
import { AvatarStep } from './steps/avatar-step';
import { ReviewStep } from './steps/review-step';
import { cn } from '@/lib/utils';
import type { CreatePodcastData } from '@/lib/types';

const steps = [
  { id: 'script', title: 'Script & Content', description: 'Write or generate your podcast script' },
  { id: 'voice', title: 'Voice Selection', description: 'Choose the perfect AI voice' },
  { id: 'avatar', title: 'Avatar & Visuals', description: 'Select avatar and visual style' },
  { id: 'review', title: 'Review & Generate', description: 'Final review and generation' },
];

export function CreateWorkflow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CreatePodcastData>>({
    title: '',
    description: '',
    script: '',
    avatarType: 'none',
    voiceType: 'default',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateFormData = (data: Partial<CreatePodcastData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ScriptStep data={formData} updateData={updateFormData} onNext={nextStep} />;
      case 1:
        return <VoiceStep data={formData} updateData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <AvatarStep data={formData} updateData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <ReviewStep data={formData} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">Create Your Podcast</h1>
        <p className="text-muted-foreground">
          Follow these steps to create your AI-powered podcast
        </p>
      </div>

      {/* Progress */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Steps Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "relative p-4 rounded-lg border transition-all duration-300",
              index < currentStep ? "bg-primary/10 border-primary/20" : 
              index === currentStep ? "bg-card border-primary" : 
              "bg-muted/50 border-border"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                index < currentStep ? "bg-primary text-primary-foreground" :
                index === currentStep ? "bg-primary text-primary-foreground" :
                "bg-muted-foreground/20 text-muted-foreground"
              )}>
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{step.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{step.description}</p>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <ChevronRight className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hidden md:block" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}