"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  navLinks?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Stack" },
  { href: "/#journey", label: "Journey" },
  { href: "/photography", label: "Photography" },
  { href: "/#contact", label: "Contact" },
];

export function NavbarClient({ navLinks = defaultLinks }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Right side controls (always visible) */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
        {/* Mobile hamburger — only shows on small screens */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <HugeiconsIcon
              icon={isOpen ? Cancel01Icon : Menu01Icon}
              size={18}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>
        </div>
      </div>

      {/* Mobile drawer — slides in from top */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-3 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
