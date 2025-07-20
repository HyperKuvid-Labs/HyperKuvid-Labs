"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import { IconArrowRight, IconShield, IconScale, IconFileCheck, IconUsers, IconGavel, IconLock } from '@tabler/icons-react';

export default function TermsOfService() {
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
              <IconScale size={18} className="text-blue-400" />
              <span className="text-sm font-medium text-slate-300">Legal Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Professional standards governing the use of HyperKuvid Labs' university engineering innovation showcase platform
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <IconFileCheck size={16} />
                <span>Last Updated: July 21, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <IconShield size={16} />
                <span>Version 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Section 1: Platform Overview */}
        <section id="platform-overview" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconShield size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Platform Overview & Mission</h2>
            </div>
            
            <div className="prose prose-slate prose-invert max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                HyperKuvid Labs operates as a premier showcase platform dedicated to highlighting exceptional engineering projects developed by university-level students across all disciplines of engineering and applied sciences.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Our Core Mission</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To provide professional recognition and visibility for outstanding university-level engineering innovations across electrical, mechanical, chemical, computer science, and interdisciplinary domains.
                  </p>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Platform Scope</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    We exclusively showcase projects that demonstrate university-level technical competency, innovation, and engineering problem-solving capabilities.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-900/20 rounded-xl border border-blue-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">User Agreement Terms</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 text-sm">Submit authentic, original engineering work with proper documentation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 text-sm">Maintain professional standards in all platform interactions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 text-sm">Comply with academic integrity requirements and institutional policies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300 text-sm">Support fellow engineers through constructive engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Submission Guidelines */}
        <section id="submission-guidelines" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconFileCheck size={24} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Project Submission Requirements</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm font-bold mr-3">A</span>
                  Comprehensive Project Documentation
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Complete project narrative</strong> including problem statement, methodology, and outcomes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Technical documentation</strong> with implementation details, code, schematics, or design specifications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Visual materials</strong> including photographs, diagrams, screenshots, or demonstration videos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Learning reflection</strong> documenting challenges, solutions, and knowledge gained</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 text-sm font-bold mr-3">B</span>
                  GitHub Repository Submission
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Public repository</strong> with comprehensive README documentation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Well-organized codebase</strong> with clear file structure and commenting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">Installation and usage instructions</strong> for project replication</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-white">License information</strong> and proper attribution of third-party components</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30">
              <h3 className="text-lg font-semibold text-white mb-4">Engineering Disciplines Coverage</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-white font-medium text-sm">Electrical Engineering</div>
                  <div className="text-xs text-slate-400 mt-1">Circuits, Embedded Systems, Power Electronics</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="text-white font-medium text-sm">Mechanical Engineering</div>
                  <div className="text-xs text-slate-400 mt-1">Robotics, Design, Manufacturing</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🧪</div>
                  <div className="text-white font-medium text-sm">Chemical Engineering</div>
                  <div className="text-xs text-slate-400 mt-1">Process Design, Materials Science</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">💻</div>
                  <div className="text-white font-medium text-sm">Computer Science</div>
                  <div className="text-xs text-slate-400 mt-1">Software, AI/ML, Systems</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Review Process */}
        <section id="review-process" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconUsers size={24} className="text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Professional Review Standards</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-900/20 rounded-xl p-6 border border-green-700/30">
                <h3 className="text-lg font-semibold text-white mb-3">Evaluation Criteria</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Technical competency appropriate for university level</li>
                  <li>• Innovation and problem-solving approach</li>
                  <li>• Documentation quality and clarity</li>
                  <li>• Educational value for peer community</li>
                  <li>• Engineering principles application</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700/30">
                <h3 className="text-lg font-semibold text-white mb-3">Review Process</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Expert evaluation by domain specialists</li>
                  <li>• Constructive feedback with improvement suggestions</li>
                  <li>• Professional communication standards</li>
                  <li>• Opportunity for revision and resubmission</li>
                  <li>• Transparent decision-making criteria</li>
                </ul>
              </div>
              
              <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-700/30">
                <h3 className="text-lg font-semibold text-white mb-3">Showcase Standards</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Demonstrated learning and growth</li>
                  <li>• Clear presentation of methodology</li>
                  <li>• Practical application of theory</li>
                  <li>• Potential to inspire other students</li>
                  <li>• Professional presentation quality</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Intellectual Property */}
        <section id="intellectual-property" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconLock size={24} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Intellectual Property Protection</h2>
            </div>

            <div className="bg-green-900/10 rounded-2xl p-8 border-2 border-green-700/30 mb-6">
              <h3 className="text-xl font-bold text-green-300 mb-4 text-center">Complete Ownership Guarantee</h3>
              <p className="text-lg text-slate-300 text-center mb-6">
                All submitted projects, innovations, code, designs, and intellectual property remain <strong className="text-white">100% owned by the original creators</strong>.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Your Rights Include:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Full commercial rights and monetization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Patent and trademark applications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Further development and iteration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Removal request at any time</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Platform Rights:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Showcase permission on platform only</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Educational and inspirational use</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>No commercial exploitation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Attribution and proper crediting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-700/30">
              <h3 className="text-lg font-semibold text-white mb-3">Academic Integrity Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm text-slate-300">
                  <p><strong className="text-white">Original Work Certification:</strong> All submissions must represent primarily original work by the submitter</p>
                  <p><strong className="text-white">Proper Attribution:</strong> Third-party components, libraries, and inspirations must be clearly credited</p>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p><strong className="text-white">Collaboration Disclosure:</strong> Team projects must identify all contributors and their specific contributions</p>
                  <p><strong className="text-white">Institutional Compliance:</strong> Submissions must comply with submitter's university academic policies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Community Standards */}
        <section id="community-standards" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconUsers size={24} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Professional Community Standards</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Expected Conduct</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Professional communication appropriate for university-level discourse</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Constructive feedback that supports peer learning and growth</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Respect for diverse engineering approaches and methodologies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Encouragement of experimental and interdisciplinary innovation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-red-900/20 rounded-xl p-6 border border-red-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Prohibited Conduct</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Plagiarism, intellectual property theft, or misrepresentation of work</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Discriminatory behavior or harassment of any community member</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Engineering domain elitism or gatekeeping behavior</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Discouragement of experimental approaches or learning-focused projects</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Legal Framework */}
        <section id="legal-framework" className="mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                <IconGavel size={24} className="text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Legal Framework & Disclaimers</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">Platform Designation</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong className="text-white">Educational Showcase Platform:</strong> HyperKuvid Labs operates exclusively as an educational platform for displaying university-level engineering projects.</p>
                  <p><strong className="text-white">No Professional Services:</strong> We do not provide engineering consultation, professional advice, or commercial services.</p>
                  <p><strong className="text-white">University Independence:</strong> Platform operates independently from any specific academic institution.</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Limitation of Liability</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><strong className="text-white">Educational Purpose Only:</strong> All content provided for educational and inspirational purposes.</p>
                  <p><strong className="text-white">No Warranties:</strong> Platform provided "as is" without warranties regarding functionality or outcomes.</p>
                  <p><strong className="text-white">User Responsibility:</strong> Users responsible for compliance with institutional policies and safety protocols.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-blue-900/30 rounded-2xl p-12 border border-blue-700/30 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Professional Engineering Excellence</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                HyperKuvid Labs is dedicated to maintaining the highest standards of professionalism while celebrating the innovative spirit of university-level engineering education. We provide a platform where technical excellence meets creative exploration, where rigorous documentation standards support bold experimentation, and where the next generation of engineers can showcase their capabilities to a global community.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">Our Commitment</h3>
                  <p className="text-slate-400 text-sm">Professional standards, complete IP protection, and educational excellence in every interaction.</p>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">Your Innovation</h3>
                  <p className="text-slate-400 text-sm">Cutting-edge engineering projects that demonstrate the exceptional capabilities of university students worldwide.</p>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">Shared Impact</h3>
                  <p className="text-slate-400 text-sm">Inspiring the global engineering community through documented excellence and collaborative learning.</p>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 mb-8">
                <p className="text-blue-300 font-semibold text-xl">
                  Your engineering excellence deserves professional recognition.
                </p>
              </div>
              
              <p className="text-slate-300 text-base leading-relaxed">
                By accepting these terms, you join a community committed to advancing engineering education through professional showcase standards, comprehensive intellectual property protection, and the celebration of innovation across all engineering disciplines. Together, we demonstrate that university-level engineering represents the cutting edge of technological advancement and creative problem-solving.
              </p>
            </div>
          </div>
        </section>
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
                    <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
}
