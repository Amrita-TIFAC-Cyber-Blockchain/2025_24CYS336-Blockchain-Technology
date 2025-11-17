
'use client';

import { useRouter } from 'next/navigation';
import { useWallet } from '@/components/wallet-provider';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { Wallet, ShieldCheck, HeartPulse, BrainCircuit, Stethoscope, Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { LogoCarousel } from '@/components/logo-carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Diagnosis',
    description: 'Leverage cutting-edge AI to get instant, data-driven health risk assessments.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'On-Chain EHR Control',
    description: 'You own your medical data. Grant and revoke access to healthcare providers on the blockchain.',
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'Immutable Audit Trails',
    description: 'Every access to your record is tracked on-chain, ensuring complete transparency and security.',
  },
];

const testimonials = [
    {
        name: 'Sarah J.',
        role: 'Patient',
        feedback: 'MediChain gave me control over my own health records for the first time. The AI assessment was insightful and helped me have a more productive conversation with my doctor.',
    },
    {
        name: 'Dr. Anil Kumar',
        role: 'Cardiologist',
        feedback: 'Accessing patient records is now seamless and secure. The on-chain permissions system removes ambiguity and builds trust. A revolutionary step for patient data management.',
    },
    {
        name: 'Emily White',
        role: 'Tech Enthusiast',
        feedback: 'The intersection of AI and blockchain in healthcare is fascinating. MediChain is a brilliant implementation that is both practical and secure. The future is here!',
    },
    {
        name: 'David R.',
        role: 'Patient',
        feedback: 'Finally, a healthcare app that respects my privacy. Knowing my data is on a blockchain and I control the keys gives me peace of mind.',
    }
]

const trustedBy = [
    { name: 'Evergreen Hospital', logo: 'https://i.pravatar.cc/150?u=hospital1' },
    { name: 'Mount Sinai', logo: 'https://i.pravatar.cc/150?u=hospital2' },
    { name: 'Johns Hopkins', logo: 'https://i.pravatar.cc/150?u=hospital3' },
    { name: 'Cleveland Clinic', logo: 'https://i.pravatar.cc/150?u=hospital4' },
    { name: 'Mayo Clinic', logo: 'https://i.pravatar.cc/150?u=hospital5' },
]

export default function LandingPage() {
  const { account, connectWallet, isConnecting } = useWallet();
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/dashboard');
  }

  return (
    <main className="flex flex-col items-center bg-background text-foreground area">
       <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 relative z-10">
        <div className="container mx-auto text-center px-4">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
            <Logo className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
            Welcome to MediChain AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your decentralized healthcare platform for AI-powered diagnosis,
            patient-controlled EHR, and transparent on-chain auditing.
            </p>
            
            {account ? (
            <Button size="lg" onClick={handleNavigation}>
                Go to Dashboard
            </Button>
            ) : (
            <Button size="lg" onClick={connectWallet} disabled={isConnecting}>
                {isConnecting ? (
                <>
                    <Wallet className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                </>
                ) : (
                <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Your Wallet to Get Started
                </>
                )}
            </Button>
            )}
        </div>
      </section>
      
      {/* Feature Image Section */}
      <section className="container mx-auto px-4 pb-16 md:pb-24 relative z-10">
        <div className="group relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 hover:shadow-primary/20">
            <Image 
                src="https://www.statnews.com/wp-content/uploads/2017/12/Blockchain-healthcare-graphic-768x432.png"
                alt="Blockchain blocks with medical icons"
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint="blockchain healthcare"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
             <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/10"></div>
        </div>
      </section>

       {/* Features Section */}
      <section className="w-full bg-primary/5 py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">The Future of Personalized Healthcare</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full">
                        <CardContent className="pt-6">
                        <p className="text-muted-foreground mb-4">"{testimonial.feedback}"</p>
                        </CardContent>
                        <div className="px-6 pb-6">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-primary/5 py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl font-semibold text-muted-foreground mb-8">
            Trusted by Leading Hospitals & Institutions
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {trustedBy.map((hospital) => (
               <div key={hospital.name} className="flex items-center gap-2 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                <Stethoscope className="h-6 w-6"/>
                <span className="font-semibold text-lg">{hospital.name}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

       {/* Supported Technologies Section */}
       <section className="w-full py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-xl font-semibold text-muted-foreground mb-12">
                Powered by Secure, Decentralized Technologies
            </h2>
            <LogoCarousel />
        </div>
       </section>

       {/* Footer */}
       <footer className="w-full border-t relative z-10">
         <div className="container mx-auto px-4 py-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-muted-foreground">
                <div className="flex flex-col items-center">
                    <Mail className="h-7 w-7 mb-2 text-primary"/>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a href="mailto:contact@medichain.ai" className="hover:text-primary">contact@medichain.ai</a>
                </div>
                <div className="flex flex-col items-center">
                    <MapPin className="h-7 w-7 mb-2 text-primary"/>
                    <h4 className="font-semibold text-foreground mb-1">Headquarters</h4>
                    <p>123 Health Tech Ave, Silicon Valley, CA 94043</p>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="font-semibold text-foreground mb-3">Global Offices</h4>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                        <span>USA</span>
                        <span>Germany</span>
                        <span>Singapore</span>
                        <span>India</span>
                        <span>Brazil</span>
                        <span>Nigeria</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></a>
              <a href="#" aria-label="Threads" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 2.75Zm4.06 14.75h-1.53c-.3 0-.58-.16-.74-.42-.83-1.35-1.53-2.9-2.8-2.9s-1.97 1.55-2.8 2.9a.8.8 0 0 1-.74.42H6.94c-.4 0-.7-.4-.61-.79.5-2.12 1.62-4.3 3.48-4.3s2.98 2.18 3.48 4.3c.09.39-.21.79-.61.79ZM12 8.5a1.25 1.25 0 1 1-1.25-1.25A1.25 1.25 0 0 1 12 8.5Zm-2.5 5.5c-1.86 0-3-2.18-3.48-4.3a.79.79 0 0 1 .6-.79h1.54c.3 0 .58.16.74.42.83 1.35 1.53 2.9 2.8 2.9s1.97-1.55 2.8-2.9a.8.8 0 0 1 .74-.42h1.54c.4 0 .7.4.6.79-0.5 2.12-1.62 4.3-3.48-4.3s-2.98-2.18-3.48-4.3Z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} MediChain AI. All Rights Reserved.
            </p>
         </div>
       </footer>
    </main>
  );
}

    
