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
  IconBrandYoutube,
  IconBrandTabler,
  IconUserBolt,
  IconSettings,
  IconArrowLeft,
  IconTool,
  IconBrandVscode,
  IconTestPipe2Filled,
  IconCircuitResistor,
  IconGitBranch
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar";
import { ProjectGrid } from "./project_grid";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


// Main Dashboard component with ProjectGrid
function MainDashboard({ selectedCategory }: { selectedCategory: string }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="p-6 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-8 flex-1 w-full h-full overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-4">
              <motion.h1
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Project Gallery
                </motion.h1>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mt-2">
                {selectedCategory === "ALL" ? "All Projects" : 
                 selectedCategory === "CS" ? "Computer Science Projects" :
                 selectedCategory === "ELEC" ? "Electrical Projects" :
                 selectedCategory === "MECH" ? "Mechanical Projects" :
                 selectedCategory === "CHEM" ? "Chemical Projects" : "Projects"}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
                Discover innovative student projects across engineering disciplines. Each project represents cutting-edge work from talented builders pushing the boundaries of technology.
              </p>
            </div>
            
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black border-green-500 hover:border-green-600" onClick={() => window.location.href = "/add-project"}>
              <IconGitBranch className="h-4 w-4 mr-2" />
              Add Your Project
            </Button>
          </div>
        </div>
        
        {/* Project Grid */}
        <div className="flex-1 min-h-0">
          <ProjectGrid selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export function SidebarDemo() {
  const links = [
    {
      label: "All Projects",
      href: "/gallery",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Computer Science",
      href: "/gallery/cs",
      icon: (
        <IconBrandVscode  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Electrical",
      href: "/gallery/elec",
      icon: (
        <IconCircuitResistor className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Mechanical",
      href: "/gallery/mech",
      icon: (
        <IconTool className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Chemical",
      href: "/gallery/chem",
      icon: (
        <IconTestPipe2Filled     className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Update links to handle category selection
  const handleLinkClick = (label: string) => {
    switch(label) {
      case "All Projects":
        setSelectedCategory("ALL");
        break;
      case "Computer Science":
        setSelectedCategory("CS");
        break;
      case "Electrical":
        setSelectedCategory("ELEC");
        break;
      case "Mechanical":
        setSelectedCategory("MECH");
        break;
      case "Chemical":
        setSelectedCategory("CHEM");
        break;
      default:
        setSelectedCategory("ALL");
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-none flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "min-h-[calc(100vh-5rem)]" // Increased height, accounting for navbar
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={() => handleLinkClick(link.label)}>
                  <SidebarLink link={{ ...link, href: "#" }} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "HyperKuvid Labs",
                href: "/",
                icon: (
                  <img
                    src="/logo.jpg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <MainDashboard selectedCategory={selectedCategory} />
    </div>
  );
}

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
    <div ref={ref} className="min-h-screen bg-black">
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

      <main className="bg-black pt-20 pb-0">
        <div className="w-full px-4 md:px-6 lg:px-8">
            <SidebarDemo />
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
