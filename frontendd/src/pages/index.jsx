import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import Link from 'next/link';
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from 'react';
import Leaderboard from '@/components/leaderboard';

export default function Home() {
  const featuredProjects = [
    {
      title: "Eco-Friendly Water Purifier",
      description: "Revolutionary water purification system using sustainable materials and minimal energy consumption.",
      progress: 75,
      goal: "50,000",
      timeRemaining: "15 days left",
      status: "active"
    },
  ];

  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondLine(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-gray-300">
      
      {/* Hero Section */}
      <section className="bg-black-900">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">
                <Typewriter words={["Empowering Innovation"]} typeSpeed={80} deleteSpeed={50} cursor={false} />
              </span>

              {showSecondLine && (
                <span className="block text-blue-400">
                  <Typewriter words={["Through Crowdfunding"]} typeSpeed={80} deleteSpeed={50} cursor={true} />
                </span>
              )}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join the future of decentralized fundraising. Support innovative projects and be part of something extraordinary.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md m-3">
                <Link href="/projects">
                  <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
                    Campaigns
                  </Button>
                </Link>
              </div>
              <div className="rounded-md m-3">
                <Link href="/create-project">
                <Button size="lg" className="bg-black text-white border-blue-500 hover:border-blue-600 hover:bg-black">
                    Start a Campaign
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Why Choose Our Platform</h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "Secure & Transparent", description: "Built on blockchain technology ensuring complete transparency and security." },
              { title: "Fast & Efficient", description: "Quick processing of funds with minimal transaction fees." },
              { title: "Community Driven", description: "Backed by a strong community of investors and creators." }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <span className="text-xl">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-medium text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Featured Projects Section */}
      <section className="bg-black-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-400 on hover:text-white">Discover innovative projects making a difference.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* CTA Section */}
      <section className="bg-black-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to Start Your Project?</h2>
            <p className="mt-4 text-xl text-gray-400">Join thousands of creators who have successfully funded their projects.</p>
            <div className="mt-8">
            <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
              Launch Your Campaign
            </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-800"></div>


      {/* Leaderboard */}
      <Leaderboard />
    </div>
  );
}
