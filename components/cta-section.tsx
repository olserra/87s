"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="relative glass p-8 sm:p-12 rounded-2xl text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Ready to Get Started?</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Creating Your First
            <br />
            <span className="gradient-text">AI Podcast Today</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to produce
            professional podcasts in minutes, not hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/auth/signin">
                Create Your First Podcast
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="h-12 px-8">
              View Pricing
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free tier available • Cancel anytime
          </p>
        </div>
      </motion.div>
    </section>
  );
}