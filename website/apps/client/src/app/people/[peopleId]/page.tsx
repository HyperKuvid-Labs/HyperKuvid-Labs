"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconHome,
  IconTerminal2,
  IconPlugConnected,
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconArrowLeft,
  IconMail,
  IconCalendar,
  IconWorld,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Meteors } from "@/components/ui/meteors";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { WobbleCard } from "@/components/ui/wobble-card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LampContainer } from "@/components/ui/lamp";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { 
  Calendar, 
  Users, 
  ExternalLink, 
  Github, 
  Code, 
  Wrench, 
  Zap, 
  FlaskConical, 
  Trophy,
  Star,
  BookOpen,
  Briefcase,
  GraduationCap,
  Link,
  Clock,
  Activity,
  Target,
  Award,
  Lightbulb
} from "lucide-react";

// Types based on Prisma schema
interface BuilderProfile {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  linkedin: string | null;
  x: string | null;
  githubUsername: string | null;
  hasPortfolio: boolean;
  portfolioSite: string | null;
  profileImage: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    level: 'ADMIN' | 'GENERAL' | 'CORE_GENERAL';
    createdAt: Date;
    lastSeen: Date;
  };
  builtProjects: BuilderProject[];
}

interface BuilderProject {
  id: string;
  projectId: string;
  githubLink: string;
  addedAt: Date;
  project: {
    id: string;
    title: string;
    description: string | null;
    githubLink: string | null;
    story: string | null;
    documentation: string | null;
    createdAt: Date;
    status: 'Waiting' | 'Aproved';
    techstack: string[];
  };
}

// Mock function to simulate API call
const getBuilderProfileById = async (userId: string): Promise<BuilderProfile | null> => {
  const mockProfile: BuilderProfile = {
    id: "builder-1",
    userId: userId,
    bio: "Passionate full-stack developer with expertise in modern web technologies. I love building innovative solutions that solve real-world problems and contribute to open-source projects. My journey in tech started with curiosity and has evolved into a passion for creating impactful digital experiences.",
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", "Python", 
      "PostgreSQL", "Prisma", "Docker", "AWS", "Git", "TensorFlow",
      "GraphQL", "MongoDB", "Redis", "Kubernetes"
    ],
    linkedin: "pradheep-dev",
    x: "pradheep_dev",
    githubUsername: "pradheep-dev",
    hasPortfolio: true,
    portfolioSite: "https://pradheep.dev",
    profileImage: "/logo.jpg",
    user: {
      id: userId,
      name: "Pradheep P",
      email: "pradheep@hyperkuvid.com",
      level: "CORE_GENERAL",
      createdAt: new Date("2023-01-15"),
      lastSeen: new Date("2025-01-27")
    },
    builtProjects: [
      {
        id: "bp-1",
        projectId: "proj-1",
        githubLink: "https://github.com/pradheep-dev/ai-assistant",
        addedAt: new Date("2024-06-15"),
        project: {
          id: "proj-1",
          title: "AI-Powered Code Assistant",
          description: "An intelligent code completion and debugging tool using machine learning algorithms to help developers write better code faster.",
          githubLink: "https://github.com/pradheep-dev/ai-assistant",
          story: "This project started as a personal need to have better code suggestions...",
          documentation: "https://docs.ai-assistant.dev",
          createdAt: new Date("2024-06-01"),
          status: "Aproved",
          techstack: ["Python", "TensorFlow", "FastAPI", "React", "TypeScript"]
        }
      },
      {
        id: "bp-2",
        projectId: "proj-2",
        githubLink: "https://github.com/pradheep-dev/smart-home",
        addedAt: new Date("2024-03-20"),
        project: {
          id: "proj-2",
          title: "Smart Home Automation",
          description: "IoT-based home automation system with voice control, mobile app, and energy monitoring features.",
          githubLink: "https://github.com/pradheep-dev/smart-home",
          story: "Built this to automate my own home and reduce energy consumption...",
          documentation: "https://docs.smarthome.dev",
          createdAt: new Date("2024-03-01"),
          status: "Aproved",
          techstack: ["Node.js", "Arduino", "React Native", "MongoDB", "MQTT"]
        }
      },
      {
        id: "bp-3",
        projectId: "proj-3",
        githubLink: "https://github.com/pradheep-dev/blockchain-voting",
        addedAt: new Date("2024-01-10"),
        project: {
          id: "proj-3",
          title: "Blockchain Voting System",
          description: "Secure and transparent voting platform using blockchain technology to ensure election integrity.",
          githubLink: "https://github.com/pradheep-dev/blockchain-voting",
          story: "Democracy deserves transparency and security...",
          documentation: "https://docs.blockchain-voting.dev",
          createdAt: new Date("2024-01-01"),
          status: "Aproved",
          techstack: ["Solidity", "Web3.js", "React", "Hardhat", "IPFS"]
        }
      }
    ]
  };
  
  return mockProfile;
};

// Helper function to get user level badge color
const getUserLevelConfig = (level: string) => {
  switch (level) {
    case 'ADMIN':
      return { color: 'bg-red-600', label: 'Admin', icon: <Award className="w-4 h-4" /> };
    case 'CORE_GENERAL':
      return { color: 'bg-purple-600', label: 'Core Member', icon: <Star className="w-4 h-4" /> };
    case 'GENERAL':
      return { color: 'bg-blue-600', label: 'Member', icon: <Users className="w-4 h-4" /> };
    default:
      return { color: 'bg-gray-600', label: 'Member', icon: <Users className="w-4 h-4" /> };
  }
};

export default function BuilderProfilePage({ params }: { params: Promise<{ peopleId: string }> }) {
  const resolvedParams = use(params);
  const peopleId = resolvedParams.peopleId;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [builderProfile, setBuilderProfile] = useState<BuilderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setIsClient(true);
    fetchBuilderProfile();
  }, [peopleId]);

  const fetchBuilderProfile = async () => {
    try {
      setLoading(true);
      const profile = await getBuilderProfileById(peopleId);
      setBuilderProfile(profile);
    } catch (error) {
      console.error('Error fetching builder profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    if (!isClient) return "••/••/••••";
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (date: Date) => {
    if (!isClient) return "••";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return formatDate(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Loading Profile...
          </motion.h1>
        </LampContainer>
      </div>
    );
  }

  if (!builderProfile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Builder Not Found</h1>
          <p className="text-gray-400 mb-8">The builder profile you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = "/people"}>
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to People
          </Button>
        </div>
      </div>
    );
  }

  const userLevelConfig = getUserLevelConfig(builderProfile.user.level);

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Projects",
      icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/gallery",
    },
    {
      title: "People",
      icon: <Users className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/people",
    },
    {
      title: "Ping Senior",
      icon: <IconPlugConnected className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/ask-senior",
    },
    {
      title: "X(Twitter)",
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://x.com/HyperKuvid_Labs/",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/HyperKuvid-Labs/",
    },
  ];

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Story", link: "/story" },
    { name: "Gallery", link: "/gallery" },
    { name: "People", link: "/people" },
  ];

  // Bento Grid Items for Profile Stats
  const bentoItems = [
    {
      title: "Projects Built",
      description: `${builderProfile.builtProjects.length} innovative solutions`,
      header: (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg">
          <Code className="w-8 h-8 text-white" />
        </div>
      ),
      icon: <Code className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Skills Mastered",
      description: `${builderProfile.skills.length} technologies and frameworks`,
      header: (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
      ),
      icon: <Lightbulb className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Success Rate",
      description: `${Math.round((builderProfile.builtProjects.filter(p => p.project.status === 'Aproved').length / builderProfile.builtProjects.length) * 100)}% approval rate`,
      header: (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-500 to-green-700 rounded-lg">
          <Target className="w-8 h-8 text-white" />
        </div>
      ),
      icon: <Target className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Portfolio Status",
      description: builderProfile.hasPortfolio ? "Professional portfolio live" : "Portfolio in progress",
      header: (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
      ),
      icon: <Briefcase className="h-4 w-4 text-neutral-500" />,
    },
  ];

  // Moving cards for skills
  const skillCards = builderProfile.skills.slice(0, 6).map((skill, index) => ({
    quote: skill,
    name: "Technology",
    title: `Skill ${index + 1}`,
  }));

  return (
    <div className="min-h-screen bg-black">
      <Navbar>
        <NavBody visible>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
            <NavbarButton variant="primary" href="/ask-senior">Ask Senior</NavbarButton>
          </div>
        </NavBody>

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
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <TracingBeam className="px-6">
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Button 
              variant="outline" 
              className="mb-8 border-purple-500/30 hover:border-purple-500/50"
              onClick={() => window.location.href = "/people"}
            >
              <IconArrowLeft className="mr-2 h-4 w-4" />
              Back to People
            </Button>

            {/* Hero Section with Container Scroll */}
            <ContainerScroll
              titleComponent={
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 border-4 border-purple-500/50 mb-6">
                    <AvatarImage src={builderProfile.profileImage || undefined} alt={builderProfile.user.name} />
                    <AvatarFallback className="bg-purple-600 text-white text-2xl">
                      {builderProfile.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    <TextGenerateEffect words={builderProfile.user.name} />
                  </h1>
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className={`${userLevelConfig.color} text-white flex items-center gap-2`}>
                      {userLevelConfig.icon}
                      {userLevelConfig.label}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                      Builder
                    </Badge>
                  </div>
                </div>
              }
            >
              <div className="mx-auto rounded-2xl object-cover h-full object-left-top">
                <div className="h-full w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Featured Work</h3>
                    <p className="text-purple-200">Innovative projects that make a difference</p>
                  </div>
                </div>
              </div>
            </ContainerScroll>

            {/* Profile Header with Background Gradient */}
            <BackgroundGradient className="rounded-3xl mb-12 p-1 bg-black">
              <div className="relative bg-black rounded-3xl p-8 overflow-hidden">
                {/* Sparkles Background */}
                <div className="absolute inset-0 w-full h-full">
                  <SparklesCore
                    id="profile-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={40}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                  />
                </div>
                
                {/* Meteors Effect */}
                <Meteors number={20} />
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Social Links & Info */}
                  <WobbleCard containerClassName="bg-gradient-to-br from-purple-900/20 via-purple-800/20 to-indigo-900/20 border border-purple-500/20">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-white mb-4">Connect & Info</h2>
                      
                      {/* Social Links */}
                      <div className="flex flex-wrap gap-3">
                        {builderProfile.githubUsername && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 hover:border-purple-500/50"
                            asChild
                          >
                            <a href={`https://github.com/${builderProfile.githubUsername}`} target="_blank" rel="noopener noreferrer">
                              <IconBrandGithub className="mr-2 h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {builderProfile.linkedin && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 hover:border-purple-500/50"
                            asChild
                          >
                            <a href={`https://linkedin.com/in/${builderProfile.linkedin}`} target="_blank" rel="noopener noreferrer">
                              <IconBrandLinkedin className="mr-2 h-4 w-4" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                        {builderProfile.x && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 hover:border-purple-500/50"
                            asChild
                          >
                            <a href={`https://x.com/${builderProfile.x}`} target="_blank" rel="noopener noreferrer">
                              <IconBrandX className="mr-2 h-4 w-4" />
                              X (Twitter)
                            </a>
                          </Button>
                        )}
                        {builderProfile.hasPortfolio && builderProfile.portfolioSite && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 hover:border-purple-500/50"
                            asChild
                          >
                            <a href={builderProfile.portfolioSite} target="_blank" rel="noopener noreferrer">
                              <IconWorld className="mr-2 h-4 w-4" />
                              Portfolio
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center gap-2">
                          <IconMail className="h-4 w-4 text-purple-400" />
                          <span>{builderProfile.user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconCalendar className="h-4 w-4 text-purple-400" />
                          <span suppressHydrationWarning>Joined {formatDate(builderProfile.user.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <span suppressHydrationWarning>Last seen {formatRelativeTime(builderProfile.user.lastSeen)}</span>
                        </div>
                      </div>
                    </div>
                  </WobbleCard>

                  {/* Evervault Card */}
                  <EvervaultCard text="Builder" />
                </div>
              </div>
            </BackgroundGradient>

            {/* Bento Grid Stats */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Builder Statistics</h2>
              <BentoGrid className="max-w-4xl mx-auto">
                {bentoItems.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                ))}
              </BentoGrid>
            </div>

            {/* Bio Section */}
            {builderProfile.bio && (
              <WobbleCard containerClassName="bg-gradient-to-br from-purple-900/20 via-purple-800/20 to-indigo-900/20 border border-purple-500/20 mb-12">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="w-8 h-8 text-purple-400" />
                    About
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">{builderProfile.bio}</p>
                </div>
              </WobbleCard>
            )}

            {/* Skills Moving Cards */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Technologies</h2>
              <InfiniteMovingCards
                items={skillCards}
                direction="right"
                speed="slow"
                className="bg-gradient-to-br from-purple-900/20 via-purple-800/20 to-indigo-900/20"
              />
            </div>

            {/* Projects Tab */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Built Projects</h2>
              {builderProfile.builtProjects.length > 0 ? (
                <HoverEffect
                  items={builderProfile.builtProjects.map(bp => ({
                    title: bp.project.title,
                    description: bp.project.description || "No description available",
                    link: bp.project.githubLink || "#",
                  }))}
                  className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                />
              ) : (
                <Card className="bg-transparent border-purple-500/30">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">No Projects Yet</h3>
                    <p className="text-gray-400">This builder hasn't added any projects yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* All Skills Badge Display */}
            <WobbleCard containerClassName="bg-gradient-to-br from-purple-900/20 via-purple-800/20 to-indigo-900/20 border border-purple-500/20 mb-12">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="w-8 h-8 text-purple-400" />
                  All Skills
                </h2>
                {builderProfile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {builderProfile.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors text-sm py-2 px-4"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">No Skills Listed</h3>
                    <p className="text-gray-400">This builder hasn't added any skills yet.</p>
                  </div>
                )}
              </div>
            </WobbleCard>
          </div>
        </main>
      </TracingBeam>

      <footer className="w-full text-white px-6 pt-12 pb-6 bg-transparent">
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
