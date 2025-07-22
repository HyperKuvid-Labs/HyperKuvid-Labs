import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="bg-black flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        {/* Header with Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <img
            src="/logo.jpg"
            alt="HyperKuvid Labs"
            className="w-10 h-10 rounded-lg object-cover"
          />
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
              <form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-white">Join as a Builder</h1>
                    <p className="text-gray-400 text-balance">
                      Create your builder account to get started
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
                        className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                      />
                    </div>
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="builder-lastname" className="text-white">Last Name</Label>
                      <Input
                        id="builder-lastname"
                        type="text"
                        placeholder="Durden"
                        required
                        className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="builder-email" className="text-white">Email</Label>
                    <Input
                      id="builder-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="builder-password" className="text-white">Password</Label>
                    <Input 
                      id="builder-password" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                      className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="builder-confirm-password" className="text-white">Confirm Password</Label>
                    <Input 
                      id="builder-confirm-password" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                      className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                    />
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
    </div>
  )
}