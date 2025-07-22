"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { cn } from "@/lib/utils";
import {
  Code,
  Wrench,
  Zap,
  FlaskConical,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "1",
    title: "AI-Powered Code Assistant",
    domain: "CS",
    status: "Waiting",
    description: "An intelligent code completion and debugging tool that helps developers write code faster and with fewer errors.",
  },
  {
    id: "2",
    title: "Autonomous Drone Navigation",
    domain: "MECH",
    status: "Waiting",
    description: "Advanced flight control system for drones with obstacle avoidance and autonomous path planning.",
  },
  {
    id: "3",
    title: "Smart Grid Optimization",
    domain: "ELEC",
    status: "Waiting",
    description: "An IoT-based system for optimizing energy consumption in power grids using real-time data analytics.",
  },
  {
    id: "4",
    title: "Green Hydrogen Production",
    domain: "CHEM",
    status: "Waiting",
    description: "Sustainable hydrogen production using renewable energy sources and electrolysis technology.",
  },
  {
    id: "5",
    title: "Blockchain Security Platform",
    domain: "CS",
    status: "Waiting",
    description: "Decentralized security framework for securing digital assets with advanced cryptographic protocols.",
  },
  {
    id: "6",
    title: "Robotic Assembly Line",
    domain: "MECH",
    status: "Waiting",
    description: "Automated manufacturing system utilizing precision robotics for efficient production processes.",
  },
  {
    id: "7",
    title: "Neural Interface Device",
    domain: "ELEC",
    status: "Waiting",
    description: "Brain-computer interface technology to assist patients with motor disabilities.",
  },
  {
    id: "8",
    title: "Carbon Capture System",
    domain: "CHEM",
    status: "Waiting",
    description: "Industrial-scale carbon dioxide capture and conversion system for climate change mitigation.",
  },
  {
    id: "9",
    title: "Quantum Computing Simulator",
    domain: "CS",
    status: "Waiting",
    description: "Simulation platform aimed at accelerating research in quantum algorithms and computing.",
  },
  {
    id: "10",
    title: "Smart Waste Management System",
    domain: "MECH",
    status: "Waiting",
    description: "IoT-enabled solution for efficient urban waste collection, sorting, and recycling.",
  },
];

const categories = [
  { key: "ALL", label: "All", icon: <ChevronDown className="h-4 w-4" /> },
  { key: "CS", label: "Computer Science", icon: <Code className="h-4 w-4" /> },
  { key: "MECH", label: "Mechanical", icon: <Wrench className="h-4 w-4" /> },
  { key: "ELEC", label: "Electrical", icon: <Zap className="h-4 w-4" /> },
  { key: "CHEM", label: "Chemical", icon: <FlaskConical className="h-4 w-4" /> },
];

function AdminProjectList() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [adminProjects, setAdminProjects] = useState(projects);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const filteredProjects =
    selectedCategory === "ALL"
      ? adminProjects
      : adminProjects.filter((p) => p.domain === selectedCategory);

  const handleApprove = (id: string) => {
    setAdminProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Aproved" } : p))
    );
  };
  const handleReject = (id: string) => {
    setAdminProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={selectedCategory === cat.key ? "default" : "outline"}
            className={cn(
              "flex items-center gap-1 px-4 py-2 rounded-full capitalize",
              selectedCategory === cat.key
                ? "bg-purple-600 text-white"
                : "text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100 dark:bg-neutral-900 dark:text-purple-300"
            )}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.icon} {cat.label}
          </Button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="uppercase text-sm text-neutral-500">
              <th align="left" className="px-3 py-2">
                Project Name
              </th>
              <th align="left" className="px-3 py-2">
                Status
              </th>
              <th align="center" className="px-3 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={3} className="px-3 py-4 text-center text-neutral-400">
                  No projects in this category.
                </td>
              </tr>
            )}
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <React.Fragment key={project.id}>
                  <tr
                    className="group transition hover:bg-purple-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={isExpanded}
                  >
                    <td className="px-3 py-3 font-medium text-neutral-900 dark:text-neutral-200">
                      {project.title}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-semibold border",
                          project.status === "Aproved"
                            ? "border-green-400 bg-green-100 text-green-700"
                            : project.status === "Rejected"
                            ? "border-red-400 bg-red-100 text-red-700"
                            : "border-yellow-400 bg-yellow-100 text-yellow-800"
                        )}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-semibold text-neutral-400 whitespace-nowrap">
                        </span>
                        <div className="flex gap-2 mt-1">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white px-4"
                            onClick={e => {
                              e.stopPropagation();
                              handleApprove(project.id);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white px-4"
                            onClick={e => {
                              e.stopPropagation();
                              handleReject(project.id);
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={3} className="px-3 pb-4 pt-0 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-300 dark:border-neutral-700">
                        <div className="pt-2 text-sm text-neutral-800 dark:text-neutral-300">
                          {project.description}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const navItems = [
  { name: "Home", link: "/" },
  { name: "Story", link: "/story" },
  { name: "Gallery", link: "/gallery" },
];

export default function AdminDashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const ref = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 8) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-black w-full">
      {/* Navbar container with slide up/down */}
      <div
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-300 bg-black bg-opacity-90 backdrop-blur-sm`}
        style={{
          transform: showNavbar ? "translateY(0)" : "translateY(-120%)",
          pointerEvents: showNavbar ? "auto" : "none",
        }}
      >
        <Navbar>
          <NavBody visible>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton variant="secondary" href="/login">
                Login
              </NavbarButton>
              <NavbarButton variant="primary" href="/ask-senior">
                Ask Senior
              </NavbarButton>
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
                  href="/ask-senior"
                >
                  Ask Senior
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      {/* Spacer so content does not jump */}
      <div className="h-16" />

      <main className="bg-black pt-4 pb-20 min-h-screen">
        <AdminProjectList />
      </main>
    </div>
  );
}
