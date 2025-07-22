import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
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
            <CardContent className="p-0">
              <Tabs defaultValue="builder" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1A1A1A] border border-[#333333] rounded-b-none">
                  <TabsTrigger
                    value="builder"
                    className="text-white data-[state=active]:bg-[#A855F7] data-[state=active]:text-white transition-all duration-200"
                  >
                    Builder
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="text-white data-[state=active]:bg-[#A855F7] data-[state=active]:text-white transition-all duration-200"
                  >
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="builder">
                  <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                          <h1 className="text-2xl font-bold text-white">Welcome back, Builder</h1>
                          <p className="text-gray-400 text-balance">
                            Login to your builder account
                          </p>
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
                          <div className="flex items-center">
                            <Label htmlFor="builder-password" className="text-white">Password</Label>
                            <a
                              href="#"
                              className="ml-auto text-sm underline-offset-2 hover:underline text-[#A855F7]"
                            >
                              Forgot your password?
                            </a>
                          </div>
                          <Input 
                            id="builder-password" 
                            type="password" 
                            required 
                            className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                          />
                        </div>
                        <Button type="submit" className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white transition-colors">
                          Login
                        </Button>
                        <div className="text-center text-sm text-gray-400">
                          Don&apos;t have an account?{" "}
                          <Link href="/signup" className="underline underline-offset-4 text-[#A855F7] hover:text-[#9333EA]">
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </form>
                    <div className="bg-[#1A1A1A] relative hidden md:block">
                      <img
                        src="/builder.png"
                        alt="Builder Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
                      />
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="admin">
                  <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                          <p className="text-gray-400 text-balance">
                            Login to your admin dashboard
                          </p>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="admin-email" className="text-white">Email</Label>
                          <Input
                            id="admin-email"
                            type="email"
                            placeholder="admin@hyperkuvid.com"
                            required
                            className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                          />
                        </div>
                        <div className="grid gap-3">
                          <div className="flex items-center">
                            <Label htmlFor="admin-password" className="text-white">Password</Label>
                            <a
                              href="#"
                              className="ml-auto text-sm underline-offset-2 hover:underline text-[#A855F7]"
                            >
                              Forgot your password?
                            </a>
                          </div>
                          <Input 
                            id="admin-password" 
                            type="password" 
                            required 
                            className="bg-[#1F1F1F] border-[#333333] text-white placeholder:text-gray-500 focus:border-[#A855F7] focus:ring-[#A855F7] transition-colors"
                          />
                        </div>
                        <Button type="submit" className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white transition-colors">
                          Login as Admin
                        </Button>
                      </div>
                    </form>
                    <div className="bg-[#1A1A1A] relative hidden md:block">
                      <img
                        src="/admin_builder1.png"
                        alt="Admin Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
                      />
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
