"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function UserProfileFormPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScroll = useRef(0);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Story", link: "/story" },
    { name: "Gallery", link: "/gallery" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll.current && current > 24) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-transform duration-300 bg-black`}
        style={{
          transform: showNavbar ? "translateY(0)" : "translateY(-120%)",
          pointerEvents: showNavbar ? "auto" : "none",
        }}
      >
        <Navbar>
          <NavBody visible>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton variant="secondary" href="/login">
                Login
              </NavbarButton>
              <NavbarButton variant="primary" href="/ask-senior">
                Ask Senior
              </NavbarButton>
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
                  href="/ask-senior"
                >
                  Ask Senior
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
      <div className="h-16" />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <form className="w-full max-w-lg px-8 py-10 space-y-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
            u.config.json
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="relative h-28 w-28 mb-2">
              <div className="h-28 w-28 rounded-full border-2 border-purple-700 shadow-[0_0_16px_#A78BFA] overflow-hidden flex items-center justify-center bg-black">
                {image ? (
                  <img
                    src={image}
                    alt="Profile Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-neutral-400 text-sm">No Image</span>
                )}
              </div>
              <button
                type="button"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-900 text-xs rounded-xl hover:bg-purple-700 transition shadow"
                onClick={() => fileInputRef.current?.click()}
              >
                Facial Hash Input
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-4">
            <FormField label="Full Name" name="fullName" placeholder="The Name They Gave You" />
            <FormField label="NickName" name="NickName" placeholder="Underground Handle" />
            <FormField label="Email" name="email" placeholder="areYouaDEV@email.com" type="email" />
            <FormField label="Bio" name="bio" placeholder="Error Logs of Existence	" textarea />
            <FormField label="Skills" name="skills" placeholder="Illegal Ops Learned" />
            <FormField label="LinkedIn" name="linkedin" placeholder="LinkedIn Profile URL" />
            <FormField label="X (Twitter)" name="x" placeholder="X (Twitter) handle/id" />
            <FormField label="GitHub Username" name="github" placeholder="GitHub username" />
            <FormField label="Portfolio" name="portfolio" placeholder="Portfolio URL" />
          </div>
          <button
            type="submit"
            className="w-full mt-8 rounded-xl bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 px-6 py-3 text-base font-semibold text-white transition hover:scale-105 hover:from-purple-600 hover:to-purple-800"
          >
            Commit Soul()
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  placeholder,
  textarea = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label
        className="block text-sm mb-1 font-semibold text-purple-300"
        htmlFor={name}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className="w-full rounded-md bg-black border border-purple-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows={4}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className="w-full rounded-md bg-black border border-purple-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      )}
    </div>
  );
}
