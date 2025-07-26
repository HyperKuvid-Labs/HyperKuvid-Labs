"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"

// Zod validation schema
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form data with Zod
      signupSchema.parse(formData)
      
      // Clear any previous errors
      setErrors({})
      
      // Continue with form submission
      console.log("Form submitted successfully", formData)
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
        
        // Show alert for the first error
        const firstError = error.issues[0]
        setAlertMessage(firstError.message)
        setShowAlert(true)
      }
    }
  }

  return (
    <div className="bg-black flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        {/* Header with Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Link href="/">
            <img
              src="/logo.jpg"
              alt="HyperKuvid Labs"
              className="w-10 h-10 rounded-lg object-cover cursor-pointer"
            />
          </Link>
          <span className="text-2xl font-bold text-white">HyperKuvid Labs</span>
        </div>
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0 bg-[#0F0F0F] border border-[#333333]">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="bg-[#1A1A1A] relative hidden md:block">
                <img
                  src="/builder_sp.png"
                  alt="Builder Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
                />
              </div>
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-white">Join as a User</h1>
                    <p className="text-gray-400 text-balance">
                      Create your user account to get started
                    </p>
                    <p className="text-[#A855F7] text-balance mt-1 font-bold">
                      Add your projects, get approved and become a builder
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="builder-firstname" className="text-white">First Name</Label>
                      <Input
                        id="builder-firstname"
                        type="text"
                        placeholder="Tyler"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="builder-lastname" className="text-white">Last Name</Label>
                      <Input
                        id="builder-lastname"
                        type="text"
                        placeholder="Durden"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="builder-email" className="text-white">Email</Label>
                    <Input
                      id="builder-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="builder-password" className="text-white">Password</Label>
                    <Input 
                      id="builder-password" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm">{errors.password}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters with uppercase, lowercase, number, and special character
                    </p>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="builder-confirm-password" className="text-white">Confirm Password</Label>
                    <Input 
                      id="builder-confirm-password" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white transition-colors">
                    Create Builder Account
                  </Button>
                  
                  <div className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 text-[#A855F7] hover:text-[#9333EA]">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Validation Error Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-[#0F0F0F] border border-[#333333]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Validation Error</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowAlert(false)}
              className="bg-[#A855F7] hover:bg-[#9333EA] text-white"
            >
              Fix Errors
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}