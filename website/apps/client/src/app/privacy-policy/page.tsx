"use client";
import React from 'react';
import Link from 'next/link';
import { IconArrowRight, IconShield, IconEye, IconLock, IconDatabase, IconUserCheck, IconServer } from '@tabler/icons-react';
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

export default function PrivacyPolicy() {
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
    <div className="min-h-screen bg-black">
      {/* Professional Header */}
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

      {/* Page Header */}
      <section className="bg-black">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full mb-6">
              <IconShield size={18} className="text-green-400" />
              <span className="text-sm font-medium text-slate-300">Privacy Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive privacy protection standards for the HyperKuvid Labs engineering showcase platform
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <IconLock size={16} />
                <span>Last Updated: July 21, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <IconUserCheck size={16} />
                <span>Version 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Privacy Commitment Banner */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-700/30 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconShield size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Privacy Commitment</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              HyperKuvid Labs is built on the principle of <strong className="text-white">privacy by design</strong>. We collect only what's necessary for showcasing student engineering excellence, protect all data with industry-standard security, and maintain complete transparency about our practices.
            </p>
          </div>
        </section>

        {/* Section 1: Data Collection */}
        <section id="data-collection" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconDatabase size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 text-sm font-bold mr-3">✓</span>
                  Project Information
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Project documentation</strong> including descriptions, technical details, and visual materials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Creator attribution</strong> including name, university affiliation, and engineering discipline</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">GitHub repository links</strong> and associated metadata for showcased projects</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Project submission timestamp</strong> and review status information</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm font-bold mr-3">i</span>
                  Technical Data
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Basic analytics</strong> including page views and project engagement metrics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Device information</strong> for optimizing platform performance and user experience</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">IP address</strong> for security purposes and geographic analytics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Browser type and version</strong> for compatibility and performance optimization</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-red-900/20 rounded-xl border border-red-700/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <IconLock size={20} className="mr-2 text-red-400" />
                What We DON'T Collect
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Personal contact information (unless explicitly provided)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Financial or payment information</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Biometric or health data</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Third-party account credentials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Data Usage */}
        <section id="data-usage" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconUserCheck size={24} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-green-900/20 rounded-xl p-6 border border-green-700/30">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Primary Purposes
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Showcase engineering projects in our gallery</li>
                  <li>• Facilitate project discovery and inspiration</li>
                  <li>• Provide proper attribution to project creators</li>
                  <li>• Enable communication between reviewers and submitters</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700/30">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  Platform Improvement
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Analyze usage patterns to improve user experience</li>
                  <li>• Optimize platform performance and loading speeds</li>
                  <li>• Identify popular project categories and trends</li>
                  <li>• Enhance search and discovery functionality</li>
                </ul>
              </div>
              
              <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-700/30">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">🛡️</span>
                  Security & Compliance
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Prevent spam and abuse of submission system</li>
                  <li>• Maintain platform security and integrity</li>
                  <li>• Comply with legal requirements and policies</li>
                  <li>• Protect intellectual property rights</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Data Protection */}
        <section id="data-protection" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconLock size={24} className="text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Data Security & Protection</h2>
            </div>

            <div className="bg-yellow-900/20 rounded-2xl p-8 border border-yellow-700/30 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Industry-Standard Security Measures</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Encryption in Transit</h4>
                      <p className="text-slate-300 text-sm">All data transmission secured with TLS/SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Secure Storage</h4>
                      <p className="text-slate-300 text-sm">Data stored in secure, access-controlled environments</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Regular Backups</h4>
                      <p className="text-slate-300 text-sm">Automated backup systems prevent data loss</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Access Controls</h4>
                      <p className="text-slate-300 text-sm">Strict authentication and authorization protocols</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Data Retention Policy</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Project data:</strong> Retained while showcased, deleted upon removal request</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Analytics data:</strong> Anonymized after 24 months</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Security logs:</strong> Maintained for 12 months for protection purposes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Third-Party Services</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong className="text-white">GitHub:</strong> For repository linking (subject to GitHub's privacy policy)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong className="text-white">Analytics:</strong> Minimal, anonymized usage tracking for platform improvement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong className="text-white">Hosting:</strong> Secure cloud infrastructure with data protection guarantees</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: User Rights */}
        <section id="user-rights" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconUserCheck size={24} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Privacy Rights</h2>
            </div>

            <div className="bg-green-900/20 rounded-2xl p-8 border border-green-700/30 mb-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4 text-center">Complete Control Over Your Data</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconEye size={24} className="text-blue-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Access</h4>
                  <p className="text-slate-300 text-xs">Request copies of all data we have about you</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconDatabase size={24} className="text-yellow-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Correction</h4>
                  <p className="text-slate-300 text-xs">Update or correct any inaccurate information</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconLock size={24} className="text-red-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Deletion</h4>
                  <p className="text-slate-300 text-xs">Remove your projects and data from our platform</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconServer size={24} className="text-purple-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Portability</h4>
                  <p className="text-slate-300 text-xs">Export your data in a structured format</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">How to Exercise Your Rights</h3>
              <div className="space-y-4 text-sm text-slate-300">
                <p><strong className="text-white">Contact Method:</strong> Send your request to our privacy team with subject line "Privacy Request"</p>
                <p><strong className="text-white">Response Time:</strong> We will respond to all privacy requests within 30 days</p>
                <p><strong className="text-white">Verification:</strong> Identity verification may be required to protect your data security</p>
                <p><strong className="text-white">No Charge:</strong> All privacy rights requests are processed free of charge</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: AI Privacy */}
        <section id="ai-privacy" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconShield size={24} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">"Ask a Senior" AI Privacy</h2>
            </div>

            <div className="bg-purple-900/20 rounded-2xl p-8 border border-purple-700/30 mb-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">Zero Storage, Maximum Privacy</h3>
              <p className="text-lg text-slate-300 text-center mb-6">
                Our AI mentorship feature is designed with <strong className="text-white">privacy as the foundation</strong>. Every conversation is ephemeral and processed locally.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <IconServer size={18} className="mr-2 text-green-400" />
                    Local Processing
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• AI responses generated using local Ollama instance</li>
                    <li>• No data sent to external AI services</li>
                    <li>• Complete isolation from third-party AI platforms</li>
                    <li>• Your questions never leave our secure environment</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <IconLock size={18} className="mr-2 text-red-400" />
                    No Storage Policy
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Conversations are not logged or stored</li>
                    <li>• No conversation history maintained</li>
                    <li>• Questions deleted immediately after response</li>
                    <li>• No tracking of usage patterns or topics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">AI Privacy Guarantees</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-green-400 text-lg mb-2">🔒</div>
                  <div className="text-white font-medium text-sm">Anonymous</div>
                  <div className="text-xs text-slate-400">No user identification required</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-blue-400 text-lg mb-2">⚡</div>
                  <div className="text-white font-medium text-sm">Ephemeral</div>
                  <div className="text-xs text-slate-400">Conversations disappear instantly</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-purple-400 text-lg mb-2">🏠</div>
                  <div className="text-white font-medium text-sm">Local</div>
                  <div className="text-xs text-slate-400">Processed on our own servers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Contact Information */}
        <section id="contact-info" className="mb-12">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconUserCheck size={32} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Privacy Questions & Contact</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We're committed to transparency and are here to address any privacy concerns or questions you may have about our data practices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Privacy Inquiries</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong className="text-white">General Questions:</strong> Contact us about any aspect of this privacy policy</p>
                  <p><strong className="text-white">Data Requests:</strong> Exercise your privacy rights (access, correction, deletion)</p>
                  <p><strong className="text-white">Security Concerns:</strong> Report any potential privacy or security issues</p>
                  <p><strong className="text-white">Policy Updates:</strong> Get notifications about privacy policy changes</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Response Commitment</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong className="text-white">Response Time:</strong> Within 48 hours for urgent privacy concerns</p>
                  <p><strong className="text-white">Standard Inquiries:</strong> Within 5 business days for general questions</p>
                  <p><strong className="text-white">Data Requests:</strong> Within 30 days as required by privacy regulations</p>
                  <p><strong className="text-white">Follow-up:</strong> Regular updates for complex requests requiring investigation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
