"use client";
import React from "react";
import { useScroll, useTransform } from "motion/react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconAtom,
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconLayoutGrid,
  IconStar,
  IconTerminal2,
  IconPlugConnected,
  IconBrandInstagram,
  IconBrandYoutube
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { WavyBackground } from "@/components/ui/wavy-background";

// Sparkles Component with hydration fix
const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    top: number;
    left: number;
    animationDelay: number;
    size: number;
  }>>([]);

  useEffect(() => {
    // Generate sparkles only on client side to avoid hydration mismatch
    const generatedSparkles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      size: Math.random() * 4 + 2,
    }));
    setSparkles(generatedSparkles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.animationDelay}s`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        >
          <div className="w-full h-full bg-purple-400 rounded-full opacity-60 animate-ping" />
        </div>
      ))}
    </div>
  );
};

// Hero Section Component with WavyBackground
const HeroSection = () => {
  return (
    <WavyBackground className="max-w-screen mx-auto pb-40 min-h-screen flex items-center justify-center">
      <Sparkles />
      
      <div className="relative z-40 text-center px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 tracking-wide">
          Welcome to
        </h2>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight font-mono">
          HyperKuvid-Labs
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-normal">
          HyperKuvid Labs is a curated talent hub where the best student-built projects across CS, Mechanical, Electrical, and Chemical domains converge to push boundaries and redefine what's possible.
        </p>
      </div>
    </WavyBackground>
  );
};

// Add the Cta11 component definition
interface Cta11Props {
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
}

const Cta11 = ({
  heading = "Fueling Student Innovation Across Disciplines",
  description = "HyperKuvid Labs is a curated talent hub where the best student-built projects across CS, Mechanical, Electrical, and Chemical domains converge to push boundaries and redefine what's possible.",
  imageSrc = "/logo.jpg", 
  imageAlt = "HyperKuvid Labs Logo",
}: Cta11Props) => {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="bg-[#1A032B] flex m-5 w-full flex-col gap-16 overflow-hidden rounded-2xl p-8 shadow-[0_0_25px_#6B21A8] md:p-10 lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1 text-white">
            <h3 className="mb-3 text-3xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
              {heading}
            </h3>
            <p className="text-[#cfcfcf] max-w-xl lg:text-lg">
              {description}
            </p>
            <button className="mt-6 rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:from-purple-600 hover:to-purple-800">
              Get Started
            </button>
          </div>

          <div className="shrink-0">
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-purple-700 shadow-[0_0_20px_#6B21A8] sm:h-40 sm:w-40">
                <img src={imageSrc} alt={imageAlt} className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default function Home() {
  const features = [
    {
      title: "Engineering Without Borders",
      description:
        "We bring together minds from CS, Mechanical, Electrical, Chemical, and more — all under one innovation-first banner.",
      icon: <IconAtom />,
    },
    {
      title: "Crafted by Builders, Not Bystanders",
      description:
        "Every featured project is battle-tested, peer-reviewed, and built by students who build for impact, not just checkboxes.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Community-Curated Excellence",
      description:
        "Only the most promising, original, and impactful student projects make it here — this is not your average GitHub wall.",
      icon: <IconStar />,
    },
    {
      title: "Domain-Agnostic, Talent-Obsessed",
      description:
        "Whether it's AI, robotics, circuits, materials, or anything in between — if it's brilliant, it belongs here.",
      icon: <IconLayoutGrid />,
    },
  ];

  //this is for floating dock component, do not remove wihtout asking me or informing me
   const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
 
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/gallery",
    },
    {
      title: "Ping Senior",
      icon: (
        <IconPlugConnected className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  
    {
      title: "X(Twitter)",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/HyperKuvid_Labs/",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/HyperKuvid-Labs/",
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/hyper_kuvid_labs/",
    },
    {
      title: "Youtube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.youtube.com/@HyperKuvid-Labs",
    },
  ];
  const ref = React.useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Story",
      link: "/story",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
  ];

  return (
    <div ref={ref} className="max-h-screen max-w-screen">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody visible>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
            <NavbarButton variant="primary" href="/ask-senior">Ask Senior</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/login"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/ask-senior"
              >
                Ask Senior
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section with Sparkles and WavyBackground */}
      <HeroSection />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto mt-5 gap-8 bg-black">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4 bg-black">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Flowchart
        </h2>
        <div className="flex justify-center">
          <img 
            src="/flowchart.png" 
            alt="HyperKuvid Labs Process Flowchart" 
            className="w-full max-w-5xl h-auto rounded-lg"
          />
        </div>
      </section>

      <Cta11 
        heading="Ready to Showcase Your Innovation?"
        description="Join HyperKuvid Labs and share your groundbreaking projects with a community of passionate builders and innovators."
        imageSrc="/logo.jpg"
        imageAlt="Innovation showcase"
      />

      <footer className="w-full bg-black text-white px-6 pt-12 pb-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
          
          <div className="w-full flex items-center justify-center">
            <FloatingDock items={links} />
          </div>

          <div className="w-full h-px bg-neutral-800 my-4" />

          <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p className="mb-2 md:mb-0">© 2025 HyperKuvid Labs. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/terms-of-service" className="hover:text-purple-400 transition">Terms of Service</a>
              <a href="/privacy-policy" className="hover:text-purple-400 transition">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
