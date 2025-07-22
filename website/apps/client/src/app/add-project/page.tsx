"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/ui/file-upload"
import {
  Github,
  FileText,
  Star,
  GitFork,
  Calendar,
  User,
  Plus,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface GitHubRepo {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  owner: {
    login: string
    avatar_url: string
  }
  updated_at: string
}

interface FormData {
  githubUrl: string
  title: string
  description: string
  contributors: string[]
  domain: string
  tools: string[]
  story: string
  image: File | null
  documentation: File[]
}

const domains = [
  "Computer Science",
  "Mechanical",
  "Chemical",
  "Electrical",
]

export default function AddProjectPage() {
  const [activeTab, setActiveTab] = useState("github-only")
  const [formData, setFormData] = useState<FormData>({
    githubUrl: "",
    title: "",
    description: "",
    contributors: [],
    domain: "",
    tools: [],
    story: "",
    image: null,
    documentation: [],
  })
  const [githubRepo, setGithubRepo] = useState<GitHubRepo | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newContributor, setNewContributor] = useState("")
  const [progress, setProgress] = useState(0)
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !formData.tools.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        tools: [...prev.tools, newSkill.trim()],
      }))
      setNewSkill("")
      setErrors((prev) => ({ ...prev, skill: "" }))
    } else if (formData.tools.includes(newSkill.trim())) {
      setErrors((prev) => ({ ...prev, skill: "Skill already added" }))
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((s) => s !== skill),
    }))
  }

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields =
      activeTab === "github-only"
        ? ["githubUrl", "title", "description", "domain"]
        : ["title", "description", "domain", "story"]

    const completed = requiredFields.filter((field) => {
      const value = formData[field as keyof FormData]
      return value && (typeof value === "string" ? value.trim() : true)
    }).length

    setProgress((completed / requiredFields.length) * 100)
  }, [formData, activeTab])

  // Debounced GitHub URL fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.githubUrl && formData.githubUrl.includes("github.com")) {
        fetchGitHubRepo()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.githubUrl])

  const fetchGitHubRepo = async () => {
    setLoading(true)
    try {
      // Mock GitHub API response
      const mockRepo: GitHubRepo = {
        name: "awesome-project",
        description: "A revolutionary web application built with modern technologies",
        language: "TypeScript",
        stars: 1247,
        forks: 89,
        owner: {
          login: "developer",
          avatar_url: "/placeholder.svg?height=40&width=40",
        },
        updated_at: "2024-01-15T10:30:00Z",
      }

      setGithubRepo(mockRepo)
      setFormData((prev) => ({
        ...prev,
        title: prev.title || mockRepo.name,
        description: prev.description || mockRepo.description,
      }))
    } catch (error) {
      console.error("Error fetching GitHub repo:", error)
    } finally {
      setLoading(false)
    }
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const addContributor = () => {
    if (newContributor && validateEmail(newContributor)) {
      if (!formData.contributors.includes(newContributor)) {
        setFormData((prev) => ({
          ...prev,
          contributors: [...prev.contributors, newContributor],
        }))
        setNewContributor("")
        setErrors((prev) => ({ ...prev, contributor: "" }))
      }
    } else {
      setErrors((prev) => ({ ...prev, contributor: "Please enter a valid email address" }))
    }
  }

  const removeContributor = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      contributors: prev.contributors.filter((c) => c !== email),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleFileUpload = (files: File[]) => {
    setFormData((prev) => ({ ...prev, documentation: files }))
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = "/"}>
              <img
                src="/logo.jpg"
                alt="HyperKuvid Labs"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-semibold text-white">HyperKuvid Labs</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Project</h1>
          <p className="text-gray-400">Share your project with the community</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Form Completion</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="github-only"
                className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Only</span>
              </TabsTrigger>
              <TabsTrigger
                value="full-documentation"
                className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Full Documentation</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="github-only" className="space-y-6">
              {/* GitHub URL */}
              <div className="space-y-2">
                <Label htmlFor="github-url" className="text-sm font-medium text-white">
                  GitHub Repository URL *
                </Label>
                <Input
                  id="github-url"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  className="bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.githubUrl && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.githubUrl}</span>
                  </p>
                )}
              </div>

              {/* GitHub Preview Card */}
              {githubRepo && (
                <Card className="github-preview border border-gray-700 bg-gray-900">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={githubRepo.owner.avatar_url || "/placeholder.svg"}
                        alt={githubRepo.owner.login}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{githubRepo.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {githubRepo.language}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">{githubRepo.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{githubRepo.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="w-3 h-3" />
                            <span>{githubRepo.forks}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Updated {new Date(githubRepo.updated_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Project Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-white">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-white">
                  Description * (minimum 100 characters)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px] bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
                <div className="text-xs text-gray-400">{formData.description.length}/100 characters</div>
              </div>

              {/* Project Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Project Image</Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors bg-gray-900">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setFormData((prev) => ({ ...prev, image: file }))
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="full-documentation" className="space-y-6">
              {/* All fields from GitHub Only tab except GitHub URL */}
              <div className="space-y-2">
                <Label htmlFor="title-full" className="text-sm font-medium text-white">
                  Project Title *
                </Label>
                <Input
                  id="title-full"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description-full" className="text-sm font-medium text-white">
                  Description * (minimum 100 characters)
                </Label>
                <Textarea
                  id="description-full"
                  placeholder="Describe your project..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px] bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Project Story */}
              <div className="space-y-2">
                <Label htmlFor="story" className="text-sm font-medium text-white">
                  Project Story *
                </Label>
                <Textarea
                  id="story"
                  placeholder="Tell the story behind your project - inspiration, challenges, learnings..."
                  value={formData.story}
                  onChange={(e) => setFormData((prev) => ({ ...prev, story: e.target.value }))}
                  className="min-h-[150px] bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Documentation Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Documentation Upload</Label>
                <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white border-gray-200 rounded-lg">
                  <FileUpload onChange={handleFileUpload} />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Contributors */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-white">Contributors</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="contributor@example.com"
                value={newContributor}
                onChange={(e) => setNewContributor(e.target.value)}
                className="flex-1 bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addContributor())}
              />
              <Button type="button" onClick={addContributor} className="bg-black text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {errors.contributor && <p className="text-sm text-red-400">{errors.contributor}</p>}
            {formData.contributors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.contributors.map((email) => (
                  <Badge key={email} variant="secondary" className="flex items-center space-x-1 bg-gray-700 text-white">
                    <User className="w-3 h-3" />
                    <span>{email}</span>
                    <button type="button" onClick={() => removeContributor(email)} className="ml-1 hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Domain Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Domain *</Label>
            <Select
              value={formData.domain}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, domain: value }))}
            >
              <SelectTrigger className="bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500">
                <SelectValue placeholder="Select project domain" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-600">
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tools & Skills */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Tools & Skills</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tool or skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-gray-800 text-white border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2"
              >
                Add
              </Button>
            </div>
            {errors.skill && <p className="text-sm text-red-400">{errors.skill}</p>}
            {formData.tools.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tools.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:bg-red-500 rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              className="px-8 bg-transparent border-gray-600 text-white hover:bg-gray-800"
            >
              Save Draft
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800 px-8" disabled={progress < 100}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Project
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
