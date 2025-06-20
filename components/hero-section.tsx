"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, Mic, Video } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-20 pb-16">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Podcast Creation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Create Professional
            <br />
            <span className="gradient-text">Podcasts with AI</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into engaging podcasts with AI-powered voice synthesis
            and avatar generation. No expensive equipment or editing skills required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/auth/signin">
              Start Creating
              <Play className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" className="h-12 px-8">
            Watch Demo
            <Video className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-12"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
            <div className="relative glass p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                    <Mic className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Voice Synthesis</h3>
                  <p className="text-sm text-muted-foreground">
                    Natural-sounding voices powered by advanced AI models
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                    <Video className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Avatar Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Realistic avatars that bring your podcasts to life
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Editing</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatic editing and optimization for professional results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}