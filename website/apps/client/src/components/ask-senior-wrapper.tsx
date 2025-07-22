"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, RefreshCw } from 'lucide-react';
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import AskSenior from '@/components/ask-senior';
import { LampContainer } from "@/components/ui/lamp";
import { SparklesCore } from "@/components/ui/sparkles";

export function SparklesPreview() {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h2 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Ask Your Seniors
      </h2>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}


const AskSeniorWrapper = () => {
  return (
    <div className="max-w-4xl mx-auto bg-black text-white">
      <div className='scale-75 md:scale-100 '>
        <  SparklesPreview />
      </div>
      {/* Content Section */}
      <div className="p-6">
        <AskSenior />
      </div>
    </div>
  );
};

export default AskSeniorWrapper;