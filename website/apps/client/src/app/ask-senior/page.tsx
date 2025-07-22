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
import AskSeniorWrapper from "@/components/ask-senior-wrapper";

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
                href="#ask-senior"
              >
                Ask Senior
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="bg-black pt-20">
        <AskSeniorWrapper />
      </main>

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
