"use client";

import { motion } from 'framer-motion';
import { 
  Mic, 
  Video, 
  Sparkles, 
  Zap, 
  Globe, 
  Shield,
  Clock,
  TrendingUp 
} from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'AI Voice Synthesis',
    description: 'Choose from multiple AI voices or clone your own for authentic podcast narration.',
  },
  {
    icon: Video,
    title: 'Avatar Generation',
    description: 'Create lifelike avatars that speak your content with natural expressions.',
  },
  {
    icon: Sparkles,
    title: 'Script Generation',
    description: 'AI-powered script writing with templates for different podcast formats.',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Generate your podcast episodes in minutes, not hours of manual work.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Create podcasts in multiple languages to reach a global audience.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your content is protected with enterprise-grade security and privacy.',
  },
  {
    icon: Clock,
    title: 'Time-Efficient',
    description: 'Reduce production time by 90% while maintaining professional quality.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    description: 'Track performance and optimize your content with detailed analytics.',
  },
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Powerful features designed to make podcast creation simple, fast, and professional.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-6 rounded-xl hover:bg-card/80 transition-all duration-300 group"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}