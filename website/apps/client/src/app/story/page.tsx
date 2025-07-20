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
import { useState } from "react";
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
import { CodeBlock } from "@/components/ui/code-block";
import { WobbleCard } from "@/components/ui/wobble-card";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function HyperKuvidDemo() {
  const storyMarkdown = `# 🧪 HyperKuvid Labs Story

## It All Started With Frugalsot
We were just a bunch of curious students building a project named **Frugalsot**. Every time we wanted to collaborate, we'd share GitHub links or keep adding each other as collaborators manually. At some point, someone said: _"Why don't we just create an organization?"_ — and just like that, **HyperKuvid Labs** was born.

## The Idea
We started this as a shared space to build projects together. First came **Phydra**, then a couple more — and soon, it wasn't just about code anymore. It was about building something meaningful together. We realized we had more than just a group — we had momentum.

## Growing Beyond Us
As we moved into our final year of college, we decided to expand — not just across people, but across domains. We brought in students from **Mechanical**, **Electrical**, **Chemical**, and **Design** backgrounds. Because let's be honest: innovation doesn't wear a single department's hoodie.

## What It Means for Students
We're not a startup, we're not a formal club — we're a student-led collective where the best ideas rise to the top. If you've ever felt tired of tutorial clones or wanted to build something crazy with friends, **this is your space**.

## From Student Projects to Talent Hub
What started as a workaround for GitHub friction is now becoming a **curated platform** showcasing the best interdisciplinary projects — built by students, for students — and hopefully, seen by the world.

> We're still learning, still building, and still asking: "What if we actually shipped this?"`

  const visionMarkdown = `# 🎯 Our Vision — Why HyperKuvid Labs Exists

## We've Been There.

We're a bunch of students who tried it all — AI, Web3, robotics, even weird UI experiments.  
Not everything stuck. We didn't master everything. And yeah, we lacked proper guidance.

We dabbled in **multi-language backends**, **full-stack web dev**, **ML/DL with actual paper implementations**, **Web3 with real smart contracts**, and so many other rabbit holes — just chasing what excited us.

But we don't call it wasted time — it was **experimentation**.  
And in that chaos, we found clarity.

A senior once told us:

> _"You don't need guidance. You need visibility — the push that comes when you see your peers doing the impossible."_  

That stuck with us.

So we created **HyperKuvid Labs** — not just to build projects, but to build *momentum*.

---

## 🚀 What We Do Differently

- Every project we release comes with:
  - 📚 **Detailed technical documentation**
  - 📖 **A story** — the "why" behind the build

🤝 **Ping a Senior** — ask doubts and get lightning-fast help
> (_How? Let's just say… our backend has a secret sauce. We're not revealing that here 😉_)

We aren't just another GitHub org or college club.  
We're a **launchpad** — especially for those who haven't had exposure or opportunities.

---

## 🔥 The HyperKuvid Method

\`\`\`python
def hyperkuvid_method():
    idea = brainstorm_wildly()
    prototype = build_fast(idea)
    community = gather_minds()
    return ship_fun(prototype, community)
\`\`\`

We don't wait for approvals. We don't obsess over perfection.  
If it solves a problem, teaches something, or inspires anyone — we ship it.

## 🌐 What "HyperKuvid" Means

**Hyperlearning** + **Kuv-id** (குவி)  
→ Tamil for "to gather or synthesize"  
→ A fusion of intensity + curiosity + community

We gather curious minds and build wildly ambitious things —  
Not because we have to. But because it's fun, and someone out there needs that spark.

## ✨ Who This is For

- Students tired of boring coursework
- Hackers stuck in tutorial hell  
- Builders with unfinished dreams
- Curious devs with crazy ideas

If you've ever asked "What if we built this?" —  
You belong here.
`
    const images = [
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    "/image6.png",
    "/image7.png",
    "/image8.png",
    "/image9.png",
    "/image10.png",
    "/image11.png",
    "/image12.png",
    "/logo.jpg",
    "/image13.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    "/image6.png",
    "/image7.png",
    "/image8.png",
    "/image9.png",
    "/image10.png",
    "/image11.png",
    "/image12.png",
    "/image13.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
  ];

  const people = [
    {
        id: 1,
        name: "Pradheep P",
        designation: "Builds. Breaks. Rebuilds.",
        image:
        "/pradheep_gh_logo.jpeg",
    },
    {
        id: 2,
        name: "KB Harish",
        designation: "Slow fire. Sharp aim.",
        image:
        "/kb_gh_logo.png",
    },
    {
        id: 3,
        name: "Yuvanesh S",
        designation: "Ghost mode. Godspeed.",
        image:
        "/yuvi_gh_logo.jpeg",
    },
    ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto w-full px-4 lg:px-0">
      <WobbleCard containerClassName="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 min-h-[400px] overflow-hidden border border-purple-800/20 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(/story.png)',
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative z-10 text-white p-4">
          <CodeBlock code={storyMarkdown} language="markdown" filename="story.md" />
        </div>
      </WobbleCard>

      <WobbleCard containerClassName="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 min-h-[400px] overflow-hidden border border-blue-800/20 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(/vision.png)',
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative z-10 text-white p-4">
          <CodeBlock code={visionMarkdown} language="markdown" filename="vision.md" />
        </div>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-transparent min-h-[500px] lg:min-h-[600px] xl:min-h-[400px] relative overflow-hidden">
        <div className="absolute inset-0">
          <ThreeDMarquee images={images} className="w-full h-full bg-gradient-to-br from-[#1A032B] via-[#4B0082] to-[#0D0118]" />
        </div>
        
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">The Minds Behind HyperKuvid Labs</h3>
            <div className="flex flex-row items-center justify-center">
              <AnimatedTooltip items={people} />
            </div>
          </div>
          
          <div className="text-center">
            <button className="group inline-flex items-center px-8 py-4 bg-white/90 hover:bg-white text-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
              <IconLayoutGrid className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Featured Projects
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <p className="text-white/80 text-sm mt-3 max-w-md">
              Explore our collection of student-built projects that solve real problems
            </p>
          </div>
        </div>
      </WobbleCard>
    </div>
  )
}

export default function Home() {
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
    <div ref={ref}>
      <Navbar>
        <NavBody visible>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Ask Senior</NavbarButton>
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
                href="#ask-senior"
              >
                Ask Senior
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="min-h-screen bg-black pt-20">
        <div className="container mx-auto">
          <HyperKuvidDemo />
        </div>
      </main>

      <footer className="w-full text-white px-6 pt-12 pb-6">
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
