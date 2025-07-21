"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  author: string;
  authorAvatar: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Static people data for tooltip (matches the author)
  const people = [
    {
      id: 1,
      name: "Pradheep P",
      designation: "Builds. Breaks. Rebuilds.",
      image: "/pradheep_gh_logo.jpeg",
    },
    {
      id: 2,
      name: "KB Harish",
      designation: "Slow fire. Sharp aim.",
      image: "/kb_gh_logo.png",
    },
    {
      id: 3,
      name: "Yuvanesh S",
      designation: "Ghost mode. Godspeed.",
      image: "/yuvi_gh_logo.jpeg",
    },
  ];

  // Find tooltip person by author name
  const tooltipPerson = people.find(person => person.name === project.author) || null;

  return (
    <div
      className={cn(
        "max-w-2xl w-full group/card cursor-pointer overflow-hidden relative card h-48 rounded-md shadow-xl bg-black border border-purple-500/20 flex",
        "hover:shadow-purple-500/25 transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side - Project Image */}
      <div className="w-48 relative bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-50"></div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-purple-300 mb-2">{project.name}</h3>
          <p className="text-gray-300 text-sm line-clamp-3">{project.description}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button className="bg-gradient-to-r from-purple-600 to-magenta-600 text-white px-4 py-2 rounded-md text-sm hover:from-purple-700 hover:to-magenta-700 transition-colors">
            Read More
          </button>

          <AnimatedTooltip items={people} />
        </div>
      </div>
    </div>
  );
}
