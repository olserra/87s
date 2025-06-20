import Link from 'next/link';
import { Mic, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Mic className="h-6 w-6 text-primary" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-purple-500" />
              </div>
              <span className="text-lg font-bold gradient-text">PodcastAI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Create professional podcasts with AI-powered voice synthesis and avatar generation.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link></li>
              <li><Link href="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/community" className="hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 PodcastAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}