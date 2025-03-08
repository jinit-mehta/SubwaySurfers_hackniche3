// pages/index.js
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';

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
    // Add more featured projects...
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Empowering Innovation</span>
              <span className="block text-blue-600">Through Crowdfunding</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join the future of decentralized fundraising. Support innovative projects 
              and be part of something extraordinary.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md ">
                <Button size="lg">
                  Explore Projects
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button variant="outline" size="lg">
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose Our Platform
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Secure & Transparent</h3>
              <p className="mt-2 text-gray-500">
                Built on blockchain technology ensuring complete transparency and security.
              </p>
            </div>

            
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Fast & Efficient</h3>
              <p className="mt-2 text-gray-500">
                Quick processing of funds with minimal transaction fees.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Community Driven</h3>
              <p className="mt-2 text-gray-500">
                Backed by a strong community of investors and creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover innovative projects making a difference.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of creators who have successfully funded their projects.
            </p>
            <div className="mt-8">
              <Button variant="secondary" size="lg">
                Launch Your Campaign
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}