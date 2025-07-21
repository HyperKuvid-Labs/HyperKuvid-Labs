"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ExternalLink,
  Users,
  Code,
  Wrench,
  Zap,
  FlaskConical,
} from "lucide-react"

// Updated interface based on Prisma schema
interface Project {
  id: string
  title: string
  description: string | null
  githubLink: string
  story: string | null
  documentation: string | null
  domain: string
  status: "Waiting" | "Aproved"
  createdAt: Date
  updatedAt: Date
  image?: string // Add image field
  owner: {
    name: string
    builderProfile?: {
      profileImage: string | null
    }
  }
  creators: Array<{
    user: {
      name: string
      builderProfile?: {
        profileImage: string | null
      }
    }
  }>
  builders: Array<{
    builder: {
      user: {
        name: string
      }
      profileImage: string | null
    }
  }>
}

interface ProjectGridProps {
  projects: Project[]
}

// Expanded color schemes - minimalist and logo-inspired
const colorSchemes = [
  {
    name: "quantum_azure",
    gradient: "from-blue-800 via-slate-800 to-slate-900",
    accent: "text-blue-50",
    badge: "bg-blue-700/50 text-blue-100 border-blue-600/30",
    card: "bg-blue-900/40 border-blue-800/30",
  },
  {
    name: "neural_violet",
    gradient: "from-violet-800 via-indigo-800 to-slate-900",
    accent: "text-violet-50",
    badge: "bg-violet-700/50 text-violet-100 border-violet-600/30",
    card: "bg-violet-900/40 border-violet-800/30",
  },
  {
    name: "biometric_green",
    gradient: "from-emerald-800 via-teal-800 to-slate-900",
    accent: "text-emerald-50",
    badge: "bg-emerald-700/50 text-emerald-100 border-emerald-600/30",
    card: "bg-emerald-900/40 border-emerald-800/30",
  },
  {
    name: "synapse_coral",
    gradient: "from-orange-800 via-red-800 to-slate-900",
    accent: "text-orange-100",
    badge: "bg-orange-700/50 text-orange-200 border-orange-600/30",
    card: "bg-orange-900/40 border-orange-800/30",
  },
  {
    name: "platinum_protocol",
    gradient: "from-gray-800 via-gray-900 to-black",
    accent: "text-gray-50",
    badge: "bg-gray-700/50 text-gray-200 border-gray-600/30",
    card: "bg-gray-900/40 border-gray-800/30",
  },
  {
    name: "arctic_intelligence",
    gradient: "from-slate-100 via-white to-slate-50",
    accent: "text-slate-900",
    badge: "bg-slate-200/50 text-slate-800 border-slate-300/30",
    card: "bg-white/40 border-slate-200/30",
  },
  {
    name: "obsidian_neural",
    gradient: "from-stone-950 via-stone-900 to-black",
    accent: "text-stone-50",
    badge: "bg-stone-800/50 text-stone-200 border-stone-700/30",
    card: "bg-stone-900/40 border-stone-800/30",
  },
]

const domainConfig = {
  CS: { icon: Code, label: "Computer Science" },
  MECH: { icon: Wrench, label: "Mechanical" },
  ELEC: { icon: Zap, label: "Electrical" },
  CHEM: { icon: FlaskConical, label: "Chemical" },
}

export const ProjectCard = ({ project, colorScheme }: { project: Project; colorScheme: any }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Fix hydration by ensuring client-side only rendering for dates
  useEffect(() => {
    setIsClient(true)
  }, [])
  
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
    
    return members.slice(0, 4) // Limit to 4 members
  }

  const teamMembers = getTeamMembers()
  
  // Truncate description
  const truncateDescription = (text: string | null, maxLength: number = 120) => {
    if (!text) return "No description available..."
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  // Format date consistently for server and client
  const formatDate = (date: Date) => {
    // Use a fixed locale and format to prevent hydration mismatch
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
        colorScheme.card
      )}
      whileHover={{ y: -5 }}
    >
      {/* Background Gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", colorScheme.gradient)} />
      
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=200&width=400&text=Project+Image"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Project Title */}
        <h3 className={cn("text-xl font-bold mb-3 line-clamp-2", colorScheme.accent)}>
          {project.title}
        </h3>
        
        {/* Project Description */}
        <p className={cn("text-sm mb-4 opacity-80", colorScheme.accent)}>
          {truncateDescription(project.description)}
        </p>
        
        {/* Project Meta */}
        <div className={cn("flex items-center gap-4 text-xs mb-4 opacity-70", colorScheme.accent)}>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {isClient ? formatDate(project.createdAt) : '---'}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {teamMembers.length} members
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between">
          {/* Team Avatars with AnimatedTooltip */}
          <div className="flex items-center scale-70">
            <AnimatedTooltip items={teamMembers} />
          </div>
          
          {/* Read More Button */}
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "border-opacity-30 backdrop-blur-sm hover:backdrop-blur-md transition-all",
              colorScheme.accent.includes("white") 
                ? "border-white/20 text-white hover:bg-white/10" 
                : "border-gray-700/30 text-current hover:bg-gray-800/20"
            )}
          >
            Read More
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}


