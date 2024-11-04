import { BrandLogo } from "@/components/BrandLogo";
import { SignedOut, SignInButton ,SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export function NavBar() {
  return <header className="flex py-6 px-5 shadow-xl absolute top-0 w-full z-10 bg-background/95">
    <nav className="flex items-center gap-10 container font-semibold">
      <Link href="/" className="mr-auto">
        <BrandLogo />
      </Link>
      <Link className="text-lg" href="#" >
        Features
      </Link>
      <Link className="text-lg" href="/#pricing" >
        Pricing
      </Link>
      <Link className="text-lg" href="#" >
        About
      </Link>
      <span className="text-lg">
        <SignedIn>
          <Link href="/dashboard" >Dashboard</Link>
        </SignedIn>
        <SignedOut>
          <SignInButton>Login</SignInButton>
        </SignedOut>
      </span>
    </nav>
  </header>
}