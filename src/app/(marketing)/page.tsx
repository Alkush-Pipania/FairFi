import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/formatCompactNumber";
import { subscriptionTiersInOrder } from "@/data/SubscriptionTiers";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { TypeScriptConfig } from "next/dist/server/config-shared";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";


// --legacy-peer-deps
export default function HomePage() {
  return <>
    <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold m-4 tracking-tight ">Price Smarter,Sell bigger!</h1>
      <p className="text-lg lg:text-3xl max-w-screen-xl">Optimize your product pricing across countries to maximize sales.
        Capture 85% of the untapped market with location-based dynamic pricing</p>
      <SignUpButton>
        <Button className="text-lg p-6 rounded-xl flex gap-2">
          Get started for free <ArrowRightIcon className="size-5" />
        </Button>
      </SignUpButton>
    </section>
    <section id="pricing" className="px-8 py-16 bg-accent/5">
      <h2 className="text-4xl text-center text-balance font-semibold mb-8">
        Pricing software which pays for itself 20x over
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
        {subscriptionTiersInOrder.map((tier) => (
          <PricingCard key={tier.name} {...tier} />
        ))}
      </div>
    </section>
    <footer className="container pt-16 pb-8 flex-col flex sm:flex-row gap-8 sm:gap-4 justify-between items-start">
      <Link href="/">
      <BrandLogo />
      </Link>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-8">
          <FotterLinkGroup
          title = "Help"
          links ={[
            { label : "PPP Discounts" , href:"#"},
            { label : "Discount API" , href: "#"},
          ]}
          />
          <FotterLinkGroup
              title="Solutions"
              links={[
                { label: "Newsletter", href: "#" },
                { label: "SaaS Business", href: "#" },
                { label: "Online Courses", href: "#" },
              ]}
            />
        </div>
        <div className="flex flex-col gap-8">
            <FotterLinkGroup
              title="Features"
              links={[{ label: "PPP Discounts", href: "#" }]}
            />
            <FotterLinkGroup
              title="Tools"
              links={[
                { label: "Salary Converter", href: "#" },
                { label: "Coupon Generator", href: "#" },
                { label: "Stripe App", href: "#" },
              ]}
            />
            <FotterLinkGroup
              title="Company"
              links={[
                { label: "Affiliate", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Terms of Service", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FotterLinkGroup
              title="Integrations"
              links={[
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
            <FotterLinkGroup
              title="Tutorials"
              links={[
                { label: "Any Website", href: "#" },
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
          </div>
      </div>
    </footer>
  </>
}


function PricingCard({
  name,
  priceInRupee,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,

}: (typeof subscriptionTiersInOrder)[number]) {
  const isMostPopulat = name === "Standard"
  return <Card>
    <CardHeader>
      <div className="text-accent font-semibold mb-8">{name}</div>
      <CardTitle className="text-xl font-bold">₹{priceInRupee} /mo</CardTitle>
      <CardDescription>
        {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
      </CardDescription>
    </CardHeader>
    <CardContent>
      <SignUpButton>
        <Button className="text-lg w-full rounded-lg" variant={isMostPopulat ? "accent" : "default"}>Get Started</Button>
      </SignUpButton>
    </CardContent>
    <CardFooter className="flex flex-col items-start gap-4">
      <Feature classname="font-bold">{maxNumberOfProducts} {" "}
        {maxNumberOfProducts === 1 ? "product" : "products"}</Feature>
      <Feature>PPP discounts</Feature>
      {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
      {canRemoveBranding && <Feature>Remove Easy PPP branding</Feature>}
      {canCustomizeBanner && <Feature>Banner customization</Feature>}
    </CardFooter>
  </Card>
}

function Feature({
  children,
  classname
}:
  {
    children: ReactNode,
    classname?: string
  }) {
  return (
    <div className={cn("flex items-center gap-2", classname)}>
      <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  )
}

function FotterLinkGroup({
  title ,
  links ,
}:{
  title : string , 
  links : {label : string , href : string}[]
}){
  return <div className="flex flex-col gap-4">
    <h3 className="font-semibold">{title}</h3>
    <ul className="flex flex-col gap-2 text-sm">
    {links.map(link =>(
      <li key={link.label}>
        <Link href={link.href}>{link.label}</Link>
      </li>
    ))}
    </ul>
  </div>
}