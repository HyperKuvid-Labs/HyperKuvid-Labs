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

// Example projects data (use your real data)
const projects = [
  { id: "1", title: "AI-Powered Code Assistant", domain: "CS", status: "Waiting" },
  { id: "2", title: "Autonomous Drone Navigation", domain: "MECH", status: "Waiting" },
  { id: "3", title: "Smart Grid Optimization", domain: "ELEC", status: "Waiting" },
  { id: "4", title: "Green Hydrogen Production", domain: "CHEM", status: "Waiting" },
  { id: "5", title: "Blockchain Security Platform", domain: "CS", status: "Waiting" },
  { id: "6", title: "Robotic Assembly Line", domain: "MECH", status: "Waiting" },
  { id: "7", title: "Neural Interface Device", domain: "ELEC", status: "Waiting" },
  { id: "8", title: "Carbon Capture System", domain: "CHEM", status: "Waiting" },
  { id: "9", title: "Quantum Computing Simulator", domain: "CS", status: "Waiting" },
  { id: "10", title: "Smart Waste Management System", domain: "MECH", status: "Waiting" },
];

// Category configs
const categories = [
  { key: "ALL", label: "All", icon: <ChevronDown className="h-4 w-4" /> },
  { key: "CS", label: "Computer Science", icon: <Code className="h-4 w-4" /> },
  { key: "MECH", label: "Mechanical", icon: <Wrench className="h-4 w-4" /> },
  { key: "ELEC", label: "Electrical", icon: <Zap className="h-4 w-4" /> },
  { key: "CHEM", label: "Chemical", icon: <FlaskConical className="h-4 w-4" /> },
];

const statusColors = {
  Waiting: "bg-yellow-100 text-yellow-800",
  Aproved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

// Admin grid component
function AdminProjectList() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [adminProjects, setAdminProjects] = useState(projects);

  // Filtering projects by selected category
  const filteredProjects =
    selectedCategory === "ALL"
      ? adminProjects
      : adminProjects.filter((p) => p.domain === selectedCategory);

  // Approve/Reject handlers
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
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                className="group transition hover:bg-purple-50 dark:hover:bg-neutral-800 rounded-lg"
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
                <td className="px-3 py-3 flex gap-3">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white px-4"
                    onClick={() => handleApprove(project.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white px-4"
                    onClick={() => handleReject(project.id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Navbar items
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

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 8) {
        setShowNavbar(true); // Show near top
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-black w-full">
      {/* Navbar Container with hide/show */}
      <div
        className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 bg-black bg-opacity-90 backdrop-blur-sm ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar>
          {/* Desktop Navigation */}
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
                >
                  Ask Senior
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      {/* Spacer div prevents content jump when navbar hides */}
      <div className="h-[5rem] sm:h-[4.5rem]" />

      {/* Admin Project List */}
      <main className="bg-black pt-4 pb-20 min-h-screen">
        <AdminProjectList />
      </main>
    </div>
  );
}
