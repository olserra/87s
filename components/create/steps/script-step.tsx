"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, FileText, Wand2 } from 'lucide-react';
import type { CreatePodcastData } from '@/lib/types';

interface ScriptStepProps {
  data: Partial<CreatePodcastData>;
  updateData: (data: Partial<CreatePodcastData>) => void;
  onNext: () => void;
}

const templates = [
  {
    id: 'interview',
    name: 'Interview Style',
    description: 'Q&A format with host and guest',
    category: 'Conversational',
    script: `Host: Welcome to our podcast! Today we're discussing [TOPIC]. I'm your host, and I'm excited to explore this topic with you.

Let me start with the key question: [MAIN_QUESTION]

[ANSWER_SECTION]

Host: That's fascinating! Can you tell us more about [FOLLOW_UP_TOPIC]?

[DETAILED_EXPLANATION]

Host: What advice would you give to someone just starting with [TOPIC]?

[PRACTICAL_ADVICE]

Host: Thank you for joining us today! This has been incredibly insightful.`,
  },
  {
    id: 'educational',
    name: 'Educational',
    description: 'Teaching and explaining concepts',
    category: 'Educational',
    script: `Welcome to today's episode where we'll be learning about [TOPIC].

First, let's start with the basics. [BASIC_EXPLANATION]

Now that we understand the fundamentals, let's dive deeper into [SPECIFIC_ASPECT].

[DETAILED_CONTENT]

Here are the key takeaways from today's lesson:
1. [TAKEAWAY_1]
2. [TAKEAWAY_2]
3. [TAKEAWAY_3]

Next time, we'll be exploring [NEXT_TOPIC]. Until then, keep learning!`,
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    description: 'Narrative-driven content',
    category: 'Entertainment',
    script: `Today's story begins with [SETTING_THE_SCENE].

Our main character, [CHARACTER_NAME], faced an interesting challenge: [MAIN_CONFLICT].

[STORY_DEVELOPMENT]

But then something unexpected happened: [PLOT_TWIST]

[RESOLUTION]

And that's how [CHARACTER_NAME] learned that [MORAL_OR_LESSON].

What would you have done in this situation? Let us know your thoughts!`,
  },
];

export function ScriptStep({ data, updateData, onNext }: ScriptStepProps) {
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleUseTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    updateData({ script: template.script });
  };

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedScript = `Welcome to "${data.title || 'My Podcast'}"! 

${data.description || 'In this episode, we explore fascinating topics and insights.'}

Today's topic is particularly interesting because it affects so many people. Let me break this down for you step by step.

First, let's establish the foundation. Understanding the basics is crucial before we dive into the more complex aspects.

The key insight here is that most people overlook the fundamental principles. When we really examine this topic, we find that there are three main components to consider:

1. The theoretical framework
2. The practical applications  
3. The real-world implications

Let me elaborate on each of these points...

[Continue with detailed explanation]

In conclusion, this topic demonstrates the importance of taking a holistic approach. The connections between different aspects become clear when we step back and look at the bigger picture.

Thank you for listening to today's episode. I hope you found these insights valuable and actionable.`;
      
      updateData({ script: generatedScript });
      setIsGenerating(false);
    }, 2000);
  };

  const canProceed = data.title && data.script && data.script.trim().length > 50;

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Script & Content</span>
          </CardTitle>
          <CardDescription>
            Create your podcast content by writing manually, using a template, or generating with AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Podcast Title</Label>
              <Input
                id="title"
                placeholder="Enter your podcast title"
                value={data.title || ''}
                onChange={(e) => updateData({ title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Brief description of your podcast"
                value={data.description || ''}
                onChange={(e) => updateData({ description: e.target.value })}
              />
            </div>
          </div>

          {/* Script Creation */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manual">Write Manually</TabsTrigger>
              <TabsTrigger value="template">Use Template</TabsTrigger>
              <TabsTrigger value="generate">AI Generate</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="script">Your Script</Label>
                <Textarea
                  id="script"
                  placeholder="Write your podcast script here..."
                  className="min-h-[300px] resize-none"
                  value={data.script || ''}
                  onChange={(e) => updateData({ script: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  {data.script?.length || 0} characters • Recommended: 1000+ for a good podcast
                </p>
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleUseTemplate(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="space-y-2">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              {selectedTemplate && (
                <div className="space-y-2">
                  <Label>Template Preview</Label>
                  <Textarea
                    className="min-h-[200px] resize-none"
                    value={data.script || ''}
                    onChange={(e) => updateData({ script: e.target.value })}
                    placeholder="Template will appear here..."
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-6 border border-dashed rounded-lg">
                  <Wand2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">AI Script Generation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate a complete podcast script based on your title and description
                  </p>
                  <Button 
                    onClick={handleGenerateScript}
                    disabled={!data.title || isGenerating}
                    className="min-w-[140px]"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Script
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {data.script && (
                <div className="space-y-2">
                  <Label>Generated Script</Label>
                  <Textarea
                    className="min-h-[300px] resize-none"
                    value={data.script}
                    onChange={(e) => updateData({ script: e.target.value })}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continue to Voice Selection
        </Button>
      </div>
    </div>
  );
}