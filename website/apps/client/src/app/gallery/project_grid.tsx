"use client"

import { useState } from "react"
import { ProjectCard } from "./project_card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Search, 
  Filter, 
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
  FlaskConical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Enhanced project data with more details
const projects = [
  {
    id: 1,
    name: "AI-Powered Code Assistant",
    description: "An intelligent code completion and debugging tool using machine learning algorithms to enhance developer productivity and reduce coding errors.",
    category: "CS",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "Pradheep P",
    authorAvatar: "/pradheep_gh_logo.jpeg",
    tags: ["AI", "Machine Learning", "Developer Tools"],
    createdAt: "2024-01-15",
    status: "completed",
    teamSize: 4,
  },
  {
    id: 2,
    name: "Autonomous Drone Navigation",
    description: "Advanced flight control system with computer vision for autonomous navigation in complex environments and obstacle avoidance.",
    category: "MECH",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "KB Harish",
    authorAvatar: "/kb_gh_logo.png",
    tags: ["Robotics", "Computer Vision", "IoT"],
    createdAt: "2024-02-10",
    status: "in-progress",
    teamSize: 3,
  },
  {
    id: 3,
    name: "Smart Grid Optimization",
    description: "IoT-based power distribution system that optimizes energy consumption using real-time data analytics and predictive modeling.",
    category: "ELEC",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "Yuvanesh S",
    authorAvatar: "/yuvi_gh_logo.jpeg",
    tags: ["IoT", "Energy", "Data Analytics"],
    createdAt: "2024-03-05",
    status: "completed",
    teamSize: 5,
  },
  {
    id: 4,
    name: "Green Hydrogen Production",
    description: "Sustainable hydrogen generation system using renewable energy sources and advanced electrolysis technology for clean fuel production.",
    category: "CHEM",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "Pradheep P",
    authorAvatar: "/pradheep_gh_logo.jpeg",
    tags: ["Sustainability", "Clean Energy", "Chemistry"],
    createdAt: "2024-04-12",
    status: "research",
    teamSize: 2,
  },
  {
    id: 5,
    name: "Blockchain Security Platform",
    description: "Decentralized security framework for protecting digital assets with advanced cryptographic protocols and multi-layer authentication.",
    category: "CS",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "KB Harish",
    authorAvatar: "/kb_gh_logo.png",
    tags: ["Blockchain", "Security", "Cryptography"],
    createdAt: "2024-05-20",
    status: "in-progress",
    teamSize: 6,
  },
  {
    id: 6,
    name: "Robotic Assembly Line",
    description: "Automated manufacturing system with precision robotics for high-efficiency production processes and quality control.",
    category: "MECH",
    image: "https://images.unsplash.com/photo-1565514020179-026b92e2d1b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "Yuvanesh S",
    authorAvatar: "/yuvi_gh_logo.jpeg",
    tags: ["Automation", "Manufacturing", "Robotics"],
    createdAt: "2024-06-08",
    status: "completed",
    teamSize: 4,
  },
  {
    id: 7,
    name: "Neural Interface Device",
    description: "Brain-computer interface technology for medical applications and assistive technologies to help patients with motor disabilities.",
    category: "ELEC",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "Pradheep P",
    authorAvatar: "/pradheep_gh_logo.jpeg",
    tags: ["BCI", "Medical Tech", "AI"],
    createdAt: "2024-07-14",
    status: "research",
    teamSize: 3,
  },
  {
    id: 8,
    name: "Carbon Capture System",
    description: "Industrial-scale CO2 capture and conversion technology for environmental sustainability and climate change mitigation.",
    category: "CHEM",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
    author: "KB Harish",
    authorAvatar: "/kb_gh_logo.png",
    tags: ["Environment", "Sustainability", "Climate Tech"],
    createdAt: "2024-08-22",
    status: "in-progress",
    teamSize: 5,
  },
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

const statusColors = {
  completed: "bg-green-500/10 text-green-700 border-green-200",
  "in-progress": "bg-blue-500/10 text-blue-700 border-blue-200",
  research: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
}

export function ProjectGrid({ selectedCategory }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === "ALL" || project.category === selectedCategory
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case "team":
          comparison = a.teamSize - b.teamSize
          break
        default:
          comparison = 0
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const categoryStats = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="w-full space-y-8 p-6">
      {/* Enhanced Header Section */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Project Showcase
            </h1>
            <p className="text-muted-foreground">
              Discover innovative projects across different engineering disciplines
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="flex gap-4">
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-300">
                  {filteredProjects.length}
                </div>
                <p className="text-xs text-muted-foreground">Projects</p>
              </CardContent>
            </Card>
            
            <Card className="bg-magenta-500/10 border-magenta-500/20">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-magenta-300">
                  {new Set(projects.map(p => p.author)).size}
                </div>
                <p className="text-xs text-muted-foreground">Contributors</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryStats).map(([category, count]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <Card key={category} className="bg-background/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <IconComponent className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{category}</div>
                      <div className="text-sm text-muted-foreground">{count} projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Separator className="bg-purple-500/20" />
      </div>

      {/* Enhanced Control Panel */}
      <Card className="bg-background/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects, tags, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-purple-500/20 focus:border-purple-500/50"
                />
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-purple-500/20 hover:border-purple-500/40">
                    {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
                    Sort by {sortBy}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc") }}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Latest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc") }}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("name"); setSortOrder("asc") }}>
                    <SortAsc className="mr-2 h-4 w-4" />
                    Name A-Z
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy("team"); setSortOrder("desc") }}>
                    <Users className="mr-2 h-4 w-4" />
                    Team Size
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
              <TabsList className="grid w-full grid-cols-2 bg-background/50">
                <TabsTrigger value="grid" className="data-[state=active]:bg-purple-500/20">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-purple-500/20">
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      {searchQuery && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Found <span className="font-medium text-purple-300">{filteredProjects.length}</span> projects matching "{searchQuery}"
          </p>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="text-muted-foreground hover:text-white"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Projects Grid/List */}
      <ScrollArea className="h-[calc(100vh-400px)]">
        {isLoading ? (
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" 
              ? "grid-cols-1 lg:grid-cols-2" 
              : "grid-cols-1"
          )}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-background/50 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <Skeleton className="h-24 w-32 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card className="bg-background/50 border-purple-500/20">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground space-y-2">
                <p className="text-lg font-medium">No projects found</p>
                <p className="text-sm">Try adjusting your search criteria or browse all categories</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" 
              ? "grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2" 
              : "grid-cols-1"
          )}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative animate-in fade-in-50 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
                
                {/* Enhanced Project Metadata Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className={cn("text-xs", statusColors[project.status as keyof typeof statusColors])}>
                    {project.status.replace('-', ' ')}
                  </Badge>
                </div>

                {/* Tags at bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
