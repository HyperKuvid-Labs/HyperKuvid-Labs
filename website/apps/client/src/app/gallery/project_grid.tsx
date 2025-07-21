"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ProjectCard } from "./project_card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Search,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  ChevronDown,
  Users,
  Calendar,
  Code,
  Wrench,
  Zap,
  FlaskConical,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useRef } from "react"

// Enhanced project data matching ProjectCard interface with real images
const projects = [
  {
    id: "1",
    title: "AI-Powered Code Assistant",
    description: "An intelligent code completion and debugging tool using machine learning algorithms to enhance developer productivity and reduce coding errors.",
    githubLink: "https://github.com/example/ai-assistant",
    story: "This project started from our frustration with repetitive coding tasks and debugging issues.",
    documentation: "https://docs.example.com/ai-assistant",
    domain: "CS",
    status: "Aproved" as const,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    image: "/image1.png",
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
            profileImage: "/gh_logo.png"
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
    ],
    builders: [
      {
        builder: {
          user: {
            name: "Arjun Kumar"
          },
          profileImage: "/image3.png"
        }
      }
    ]
  },
  {
    id: "2",
    title: "Autonomous Drone Navigation",
    description: "Advanced flight control system with computer vision for autonomous navigation in complex environments and obstacle avoidance.",
    githubLink: "https://github.com/example/drone-nav",
    story: "Inspired by search and rescue operations, we wanted to create drones that could navigate autonomously.",
    documentation: "https://docs.example.com/drone-nav",
    domain: "MECH",
    status: "Waiting" as const,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-15"),
    image: "/image4.png",
    owner: {
      name: "KB Harish",
      builderProfile: {
        profileImage: "/image5.png"
      }
    },
    creators: [
      {
        user: {
          name: "Pradheep P",
          builderProfile: {
            profileImage: "/image6.png"
          }
        }
      },
      {
        user: {
          name: "Sarath S",
          builderProfile: {
            profileImage: "/image7.png"
          }
        }
      }
    ],
    builders: [
      {
        builder: {
          user: {
            name: "Priya Sharma"
          },
          profileImage: "/image8.png"
        }
      }
    ]
  },
  {
    id: "3",
    title: "Smart Grid Optimization",
    description: "IoT-based power distribution system that optimizes energy consumption using real-time data analytics and predictive modeling.",
    githubLink: "https://github.com/example/smart-grid",
    story: "Our goal was to reduce energy waste in urban areas through intelligent grid management.",
    documentation: "https://docs.example.com/smart-grid",
    domain: "ELEC",
    status: "Aproved" as const,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-10"),
    image: "/image9.png",
    owner: {
      name: "Yuvanesh S",
      builderProfile: {
        profileImage: "/image10.png"
      }
    },
    creators: [
      {
        user: {
          name: "KB Harish",
          builderProfile: {
            profileImage: "/image11.png"
          }
        }
      },
      {
        user: {
          name: "Arjun Kumar",
          builderProfile: {
            profileImage: "/image12.png"
          }
        }
      },
      {
        user: {
          name: "Priya Sharma",
          builderProfile: {
            profileImage: "/image13.png"
          }
        }
      }
    ],
    builders: []
  },
  {
    id: "4",
    title: "Green Hydrogen Production",
    description: "Sustainable hydrogen generation system using renewable energy sources and advanced electrolysis technology for clean fuel production.",
    githubLink: "https://github.com/example/hydrogen-prod",
    story: "Climate change motivated us to develop clean energy solutions for the future.",
    documentation: "https://docs.example.com/hydrogen-prod",
    domain: "CHEM",
    status: "Waiting" as const,
    createdAt: new Date("2024-04-12"),
    updatedAt: new Date("2024-04-18"),
    image: "/image1.png",
    owner: {
      name: "Pradheep P",
      builderProfile: {
        profileImage: "/gh_logo.png"
      }
    },
    creators: [
      {
        user: {
          name: "Sarath S",
          builderProfile: {
            profileImage: "/logo.jpg"
          }
        }
      }
    ],
    builders: [
      {
        builder: {
          user: {
            name: "Yuvanesh S"
          },
          profileImage: "/image2.png"
        }
      }
    ]
  },
  {
    id: "5",
    title: "Blockchain Security Platform",
    description: "Decentralized security framework for protecting digital assets with advanced cryptographic protocols and multi-layer authentication.",
    githubLink: "https://github.com/example/blockchain-security",
    story: "With rising cybersecurity threats, we aimed to create a more secure digital infrastructure.",
    documentation: "https://docs.example.com/blockchain-security",
    domain: "CS",
    status: "Aproved" as const,
    createdAt: new Date("2024-05-20"),
    updatedAt: new Date("2024-05-25"),
    image: "/image3.png",
    owner: {
      name: "KB Harish",
      builderProfile: {
        profileImage: "/image4.png"
      }
    },
    creators: [
      {
        user: {
          name: "Pradheep P",
          builderProfile: {
            profileImage: "/image5.png"
          }
        }
      },
      {
        user: {
          name: "Arjun Kumar",
          builderProfile: {
            profileImage: "/image6.png"
          }
        }
      },
      {
        user: {
          name: "Priya Sharma",
          builderProfile: {
            profileImage: "/image7.png"
          }
        }
      },
      {
        user: {
          name: "Sarath S",
          builderProfile: {
            profileImage: "/image8.png"
          }
        }
      }
    ],
    builders: []
  },
  {
    id: "6",
    title: "Robotic Assembly Line",
    description: "Automated manufacturing system with precision robotics for high-efficiency production processes and quality control.",
    githubLink: "https://github.com/example/robot-assembly",
    story: "Industry 4.0 inspired us to revolutionize manufacturing with intelligent automation.",
    documentation: "https://docs.example.com/robot-assembly",
    domain: "MECH",
    status: "Aproved" as const,
    createdAt: new Date("2024-06-08"),
    updatedAt: new Date("2024-06-12"),
    image: "/image9.png",
    owner: {
      name: "Yuvanesh S",
      builderProfile: {
        profileImage: "/image10.png"
      }
    },
    creators: [
      {
        user: {
          name: "KB Harish",
          builderProfile: {
            profileImage: "/image11.png"
          }
        }
      },
      {
        user: {
          name: "Arjun Kumar",
          builderProfile: {
            profileImage: "/image12.png"
          }
        }
      }
    ],
    builders: [
      {
        builder: {
          user: {
            name: "Priya Sharma"
          },
          profileImage: "/image13.png"
        }
      }
    ]
  },
  {
    id: "7",
    title: "Neural Interface Device",
    description: "Brain-computer interface technology for medical applications and assistive technologies to help patients with motor disabilities.",
    githubLink: "https://github.com/example/neural-interface",
    story: "Our mission is to help people with disabilities regain control through technology.",
    documentation: "https://docs.example.com/neural-interface",
    domain: "ELEC",
    status: "Waiting" as const,
    createdAt: new Date("2024-07-14"),
    updatedAt: new Date("2024-07-20"),
    image: "/image1.png",
    owner: {
      name: "Pradheep P",
      builderProfile: {
        profileImage: "/logo.jpg"
      }
    },
    creators: [
      {
        user: {
          name: "Sarath S",
          builderProfile: {
            profileImage: "/gh_logo.png"
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
    ],
    builders: []
  },
  {
    id: "8",
    title: "Carbon Capture System",
    description: "Industrial-scale CO2 capture and conversion technology for environmental sustainability and climate change mitigation.",
    githubLink: "https://github.com/example/carbon-capture",
    story: "Fighting climate change through innovative carbon capture and utilization technologies.",
    documentation: "https://docs.example.com/carbon-capture",
    domain: "CHEM",
    status: "Aproved" as const,
    createdAt: new Date("2024-08-22"),
    updatedAt: new Date("2024-08-28"),
    image: "/image3.png",
    owner: {
      name: "KB Harish",
      builderProfile: {
        profileImage: "/image4.png"
      }
    },
    creators: [
      {
        user: {
          name: "Pradheep P",
          builderProfile: {
            profileImage: "/image5.png"
          }
        }
      },
      {
        user: {
          name: "Arjun Kumar",
          builderProfile: {
            profileImage: "/image6.png"
          }
        }
      },
      {
        user: {
          name: "Priya Sharma",
          builderProfile: {
            profileImage: "/image7.png"
          }
        }
      }
    ],
    builders: [
      {
        builder: {
          user: {
            name: "Sarath S"
          },
          profileImage: "/image8.png"
        }
      }
    ]
  },
  {
    id: "9",
    title: "Quantum Computing Simulator",
    description: "High-performance quantum computing simulation platform for research and development of quantum algorithms and applications.",
    githubLink: "https://github.com/example/quantum-simulator",
    story: "Exploring the frontiers of quantum computing to solve complex computational problems.",
    documentation: "https://docs.example.com/quantum-simulator",
    domain: "CS",
    status: "Aproved" as const,
    createdAt: new Date("2024-09-30"),
    updatedAt: new Date("2024-10-05"),
    image: "/image9.png",
    owner: {
      name: "Sarath S",
      builderProfile: {
        profileImage: "/image10.png"
      }
    },
    creators: [
      {
        user: {
          name: "Pradheep P",
          builderProfile: {
            profileImage: "/image11.png"
          }
        }
      },
      {
        user: {
          name: "KB Harish",
          builderProfile: {
            profileImage: "/image12.png"
          }
        }
      }
    ],
    builders: [
      {
        builder: {
          user: {
            name: "Yuvanesh S"
          },
          profileImage: "/image13.png"
        }
      }
    ]
  },
  {
    id: "10",
    title: "Smart Waste Management System",
    description: "IoT-enabled waste management solution for efficient collection, sorting, and recycling of urban waste using real-time data.",
    githubLink: "https://github.com/example/smart-waste",
    story: "Creating sustainable cities through intelligent waste management and recycling systems.",
    documentation: "https://docs.example.com/smart-waste",
    domain: "MECH",
    status: "Waiting" as const,
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-20"),
    image: "/image1.png",
    owner: {
      name: "Yuvanesh S",
      builderProfile: {
        profileImage: "/logo.jpg"
      }
    },
    creators: [
      {
        user: {
          name: "Arjun Kumar",
          builderProfile: {
            profileImage: "/gh_logo.png"
          }
        }
      },
      {
        user: {
          name: "Priya Sharma",
          builderProfile: {
            profileImage: "/image2.png"
          }
        }
      },
      {
        user: {
          name: "Sarath S",
          builderProfile: {
            profileImage: "/image3.png"
          }
        }
      }
    ],
    builders: []
  }
]

interface ProjectGridProps {
  selectedCategory: string
}

const categoryIcons = {
  CS: Code,
  MECH: Wrench,
  ELEC: Zap,
  CHEM: FlaskConical,
}

const categoryColors = {
  CS: "from-purple-500 to-violet-600",
  MECH: "from-orange-500 to-red-600",
  ELEC: "from-yellow-500 to-orange-600",
  CHEM: "from-green-500 to-teal-600",
}

const statusColors = {
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "in-progress": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  research: "bg-amber-500/20 text-amber-300 border-amber-500/30",
}

// Color schemes for project cards
const colorSchemes = [
  {
    name: "neon-nexus",
    gradient: "from-[#1B0037] via-[#6100FF] to-[#1B0037]",
    accent: "text-[#D1B3FF]",
    badge: "bg-[#6100FF]/40 text-white border-[#B580FF]/30",
    card: "bg-[#24003C]/50 border-[#6100FF]/40",
  },
  {
    name: "quantum-core",
    gradient: "from-[#0A0F2C] via-[#2D3A6D] to-[#0A0F2C]",
    accent: "text-[#B4C5FF]",
    badge: "bg-[#2D3A6D]/50 text-[#E4E8FF] border-[#1D274F]/30",
    card: "bg-[#111C3C]/40 border-[#2D3A6D]/30",
  },
  {
    name: "plasma-circuit",
    gradient: "from-[#0D0D0D] via-[#FF00CC] to-[#3333FF]",
    accent: "text-[#F5E9FF]",
    badge: "bg-[#FF00CC]/40 text-white border-[#C300FF]/30",
    card: "bg-[#110011]/60 border-[#6600CC]/30",
  },
  {
    name: "elemental-tech",
    gradient: "from-[#0B3D3B] via-[#026773] to-[#013737]",
    accent: "text-[#A3F7BF]",
    badge: "bg-[#026773]/50 text-[#C9FFE0] border-[#014A4C]/30",
    card: "bg-[#011F20]/40 border-[#014A4C]/30",
  },
  {
    name: "lumina",
    gradient: "from-[#F3F4F6] via-[#FFFFFF] to-[#E5E7EB]",
    accent: "text-[#3D3D3D]",
    badge: "bg-[#F4F4F4]/50 text-[#2F2F2F] border-[#D1D5DB]/30",
    card: "bg-white/70 border-[#D6D6D6]/30",
  },
  {
    name: "aurora-synth",
    gradient: "from-[#3A0CA3] via-[#7209B7] to-[#4361EE]",
    accent: "text-[#E0D4F7]",
    badge: "bg-[#7209B7]/40 text-[#F5ECFF] border-[#B5179E]/30",
    card: "bg-[#3A0CA3]/50 border-[#7209B7]/30",
  },
  {
    name: "carbon-fade",
    gradient: "from-[#121212] via-[#1E1E1E] to-[#2B2B2B]",
    accent: "text-[#CCCCCC]",
    badge: "bg-[#2B2B2B]/60 text-[#E0E0E0] border-[#444444]/20",
    card: "bg-[#1A1A1A]/40 border-[#2C2C2C]/30",
  },
];

// Changed to 9 items per page for 3x3 grid
const ITEMS_PER_PAGE = 9

export function ProjectGrid({ selectedCategory }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: "-100px" })

  // Simulate loading state
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [selectedCategory])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, sortBy, sortOrder])

  // Filter and sort projects with enhanced search
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesCategory = selectedCategory === "ALL" || project.domain === selectedCategory
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch =
          !searchQuery ||
          project.title.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower) ||
          project.owner.name.toLowerCase().includes(searchLower) ||
          project.creators.some((creator) => creator.user.name.toLowerCase().includes(searchLower))
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case "name":
            comparison = a.title.localeCompare(b.title)
            break
          case "date":
            comparison = a.createdAt.getTime() - b.createdAt.getTime()
            break
          case "team":
            comparison = (a.creators.length + 1) - (b.creators.length + 1) // +1 for owner
            break
          case "popularity":
            // Generate deterministic popularity based on project ID
            const aPopularity = Math.sin(parseInt(a.id) * 123) * 100
            const bPopularity = Math.sin(parseInt(b.id) * 123) * 100
            comparison = aPopularity - bPopularity
            break
          default:
            comparison = 0
        }
        return sortOrder === "asc" ? comparison : -comparison
      })
  }, [selectedCategory, searchQuery, sortBy, sortOrder])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

  const categoryStats = useMemo(() => {
    return projects.reduce(
      (acc, project) => {
        acc[project.domain] = (acc[project.domain] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [])

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push("ellipsis-start")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  // Loading skeleton component - Updated for 3x3 grid
  const LoadingSkeleton = () => (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="h-[400px] rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 border border-purple-500/20 animate-pulse"
        >
          <div className="p-6 space-y-4">
            <div className="h-48 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-purple-500/20 rounded-xl animate-shimmer" />
            <div className="space-y-2">
              <div className="h-4 bg-purple-500/20 rounded animate-shimmer" />
              <div className="h-3 bg-purple-500/10 rounded w-3/4 animate-shimmer" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-purple-500/20 rounded animate-shimmer" />
              <div className="h-6 w-12 bg-purple-500/20 rounded animate-shimmer" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  // Empty state component
  const EmptyState = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 flex items-center justify-center"
        >
          <Sparkles className="w-12 h-12 text-purple-400" />
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
        <p className="text-slate-400 mb-6">
          {searchQuery
            ? `No projects match "${searchQuery}". Try adjusting your search.`
            : "No projects available in this category yet."}
        </p>
        {searchQuery && (
          <Button
            onClick={() => setSearchQuery("")}
            variant="outline"
            className="border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10"
          >
            Clear Search
          </Button>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="w-full space-y-8">
      {/* Enhanced Control Panel */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Enhanced Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects, authors, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 focus:border-purple-500/50 text-white placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-white/10"
                    >
                      ×
                    </Button>
                  )}
                </div>

                {/* Enhanced Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-white/20 hover:border-purple-500/40 bg-white/5 text-white"
                    >
                      {sortOrder === "asc" ? (
                        <SortAsc className="mr-2 h-4 w-4" />
                      ) : (
                        <SortDesc className="mr-2 h-4 w-4" />
                      )}
                      Sort by {sortBy}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-[#1A1A2E] border-white/20">
                    <DropdownMenuLabel className="text-white">Sort Options</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("date")
                        setSortOrder("desc")
                      }}
                      className="text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Latest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("date")
                        setSortOrder("asc")
                      }}
                      className="text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("name")
                        setSortOrder("asc")
                      }}
                      className="text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      <SortAsc className="mr-2 h-4 w-4" />
                      Name A-Z
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* View Mode Toggle */}
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
                <TabsList className="grid w-full grid-cols-2 bg-white/5 border-white/20">
                  <TabsTrigger
                    value="grid"
                    className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-slate-400"
                  >
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-slate-400"
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Header with Pagination Info */}
      <AnimatePresence>
        {(searchQuery || filteredProjects.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between"
          >
            <p className="text-sm text-slate-400">
              {searchQuery ? (
                <>
                  Found <span className="font-medium text-purple-300">{filteredProjects.length}</span> projects matching
                  <span className="font-medium text-white"> "{searchQuery}"</span>
                </>
              ) : (
                <>
                  Showing <span className="font-medium text-purple-300">{startIndex + 1}</span> to{" "}
                  <span className="font-medium text-purple-300">{Math.min(endIndex, filteredProjects.length)}</span> of{" "}
                  <span className="font-medium text-purple-300">{filteredProjects.length}</span> projects
                </>
              )}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-slate-400">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid - Updated for 3x3 grid */}
      <div ref={gridRef} className="min-h-[1300px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingSkeleton />
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmptyState />
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // 3x3 grid layout
                  : "grid-cols-1 max-w-4xl mx-auto",
              )}
            >
              {paginatedProjects.map((project, index) => (
                <motion.div key={project.id} className="group">
                  <ProjectCard 
                    project={project} 
                    colorScheme={colorSchemes[index % colorSchemes.length]} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isLoading && filteredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={cn(
                    "cursor-pointer hover:bg-purple-500/20 hover:text-purple-300 border-white/20",
                    currentPage === 1 && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-400"
                  )}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis-start" || page === "ellipsis-end" ? (
                    <PaginationEllipsis className="text-slate-400" />
                  ) : (
                    <PaginationLink
                      onClick={() => setCurrentPage(page as number)}
                      isActive={currentPage === page}
                      className={cn(
                        "cursor-pointer hover:bg-purple-500/20 hover:text-purple-300 border-white/20",
                        currentPage === page &&
                          "bg-purple-500/30 text-purple-300 border-purple-500/50 hover:bg-purple-500/40"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={cn(
                    "cursor-pointer hover:bg-purple-500/20 hover:text-purple-300 border-white/20",
                    currentPage === totalPages &&
                      "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-400"
                  )}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </div>
  )
}
