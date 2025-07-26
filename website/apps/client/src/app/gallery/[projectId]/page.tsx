"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  IconHome,
  IconTerminal2,
  IconPlugConnected,
  IconBrandX,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
  IconArrowLeft,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Calendar, Users, ExternalLink, Github, Code, Wrench, Zap, FlaskConical } from "lucide-react";

// Domain configuration with colors and icons
const domainConfig = {
  CS: { icon: Code, label: "Computer Science", color: "bg-blue-600" },
  MECH: { icon: Wrench, label: "Mechanical", color: "bg-orange-600" },
  ELEC: { icon: Zap, label: "Electrical", color: "bg-yellow-600" },
  CHEM: { icon: FlaskConical, label: "Chemical", color: "bg-green-600" },
  Mechanical: { icon: Wrench, label: "Mechanical", color: "bg-orange-600" }, // Added for compatibility
}

// Mock project data - in a real app, you'd fetch this based on projectId
const getProjectById = (id: string) => {
  const projects = [
    {
      id: "1",
      title: "AI-Powered Code Assistant",
      description: "An intelligent code completion and debugging tool using machine learning algorithms to enhance developer productivity and reduce coding errors.",
      fullDescription: "This project represents a breakthrough in developer tooling, combining advanced natural language processing with code analysis to provide intelligent suggestions and automated debugging capabilities. Built over 6 months with a focus on real-world applicability.",
      githubLink: "https://github.com/example/ai-assistant",
      story: "This project started from our frustration with repetitive coding tasks and debugging issues. As developers, we found ourselves spending countless hours on mundane tasks that could be automated. The idea sparked during a late-night coding session when we realized that most bugs we encounter follow predictable patterns. We decided to build an AI system that could learn from these patterns and provide intelligent suggestions. The development process took us through multiple iterations, starting with a simple rule-based system and evolving into a sophisticated machine learning model. We faced challenges in training the model on diverse codebases, ensuring accuracy across different programming languages, and maintaining performance. After months of research, development, and testing with fellow developers, we created a tool that not only detects bugs but also suggests optimal solutions. The project has been a journey of continuous learning and improvement, and we're excited to see how it helps the developer community.",
      documentation: "This comprehensive documentation covers all aspects of the AI-Powered Code Assistant. It includes installation guides, API references, usage examples, and troubleshooting tips. The documentation is designed to help developers integrate the tool seamlessly into their workflow and maximize its potential.",
      domain: ["CS", "Mechanical"], 
      status: "Approved" as const,
      createdAt: new Date("2024-01-15"),
      image: "/image1.png",
      techStack: ["Python", "TensorFlow", "React", "Node.js"],
      owner: {
        name: "Pradheep P",
        builderProfile: {
          profileImage: "/logo.jpg"
        }
      },
      creators: [
        {
          user: {
            name: "KB Harish",
            builderProfile: {
              profileImage: "/kb_gh_logo.png"
            }
          }
        },
        {
          user: {
            name: "Yuvanesh S",
            builderProfile: {
              profileImage: "/image2.png"
            }
          }
        }
      ]
    },
    // Add more projects as needed
  ];
  
  return projects.find(project => project.id === id);
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Fix hydration by ensuring client-side only rendering for dates
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const project = getProjectById(projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = "/gallery"}>
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  // Normalize domain to always be an array
  const getDomains = (): string[] => {
    if (Array.isArray(project.domain)) {
      return project.domain
    }
    if (typeof project.domain === 'string') {
      return [project.domain]
    }
    return [] // Fallback for undefined/null
  }
  
  const domains = getDomains()

  // Get team members for animated tooltip
  const getTeamMembers = () => {
    const members = []
    
    // Add owner
    members.push({
      id: 1,
      name: project.owner.name,
      designation: "Project Owner",
      image: project.owner.builderProfile?.profileImage || "/logo.jpg",
    })
    
    // Add creators
    project.creators.forEach((creator, index) => {
      members.push({
        id: index + 2,
        name: creator.user.name,
        designation: "Creator",
        image: creator.user.builderProfile?.profileImage || "/gh_logo.png",
      })
    })
    
    return members // Limit to 4 members
  }

  const teamMembers = getTeamMembers()

  // Format date consistently for server and client
  const formatDate = (date: Date) => {
    if (!isClient) {
      // Return placeholder for SSR to prevent hydration mismatch
      return "••/••/••••";
    }
    
    // Client-side rendering with consistent format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${month}/${day}/${year}`;
  };

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
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.instagram.com/hyper_kuvid_labs/",
    },
    {
      title: "Youtube",
      icon: <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.youtube.com/@HyperKuvid-Labs",
    },
  ];

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Story", link: "/story" },
    { name: "Gallery", link: "/gallery" },
  ];

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
              >
                Ask Senior
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button 
            variant="outline" 
            className="mb-8 border-purple-500/30 hover:border-purple-500/50"
            onClick={() => window.location.href = "/gallery"}
          >
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>

          {/* Project Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  {/* Multiple Domain Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {domains.map((domainName, index) => {
                      const config = domainConfig[domainName as keyof typeof domainConfig];
                      const IconComponent = config?.icon || Code;
                      
                      return (
                        <Badge 
                          key={index} 
                          className={`${config?.color || "bg-purple-600"} text-white flex items-center gap-1`}
                        >
                          <IconComponent className="h-3 w-3" />
                          {config?.label || domainName}
                        </Badge>
                      );
                    })}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {project.title}
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* GitHub Link and Team Members in same row */}
                <div className="flex items-center gap-6">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                  
                  {/* Team Members Animated Tooltip */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">Team:</span>
                    <div className="flex items-center scale-70">
                      <AnimatedTooltip items={teamMembers} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </div>

          {/* Project Content */}
          <div className="space-y-8">
            {/* Project Story - Big Area */}
            <Card className="bg-transparent">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Project Story</h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.story}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documentation - Flexible Size */}
            {project.documentation && (
              <Card className="bg-transperant">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Documentation</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.documentation}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Project Submitted On - Single Line */}
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">
                Project submitted on <span suppressHydrationWarning className="text-white font-medium">{formatDate(project.createdAt)}</span>
              </p>
            </div>
          </div>
        </div>
      </main>

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
