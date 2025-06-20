"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If token exists in localStorage, redirect to dashboard
    if (typeof window !== "undefined" && localStorage.getItem("session_token")) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Generate a simple session token and store in localStorage
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("session_token", token);
    setIsLoading(false);
    toast.success('Signed in! Redirecting...');
    setTimeout(() => router.replace("/dashboard"), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="glass">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your email to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}