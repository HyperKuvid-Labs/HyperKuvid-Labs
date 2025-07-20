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
        "Whether it’s AI, robotics, circuits, materials, or anything in between — if it's brilliant, it belongs here.",
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
    <div ref={ref}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody visible>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Ask Senior</NavbarButton>
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
