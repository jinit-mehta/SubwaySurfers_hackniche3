// pages/projects/[id].js
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Milestone } from '../../components/ui/Milestone';
import { Button } from '../../components/ui/Button';

const ProjectDetail = () => {
  const project = {
    title: "Eco-Friendly Water Purifier",
    description: "Revolutionary water purification system using sustainable materials and minimal energy consumption. Our solution addresses the growing need for clean water while maintaining environmental responsibility.",
    progress: 75,
    goal: "50,000",
    timeRemaining: "15 days left",
    creator: "GreenTech Solutions",
    category: "Environmental",
    milestones: [
      {
        title: "Product Design",
        description: "Complete detailed product design and engineering specifications",
        completed: true,
        date: "January 2024"
      },
      {
        title: "Prototype Development",
        description: "Build and test first working prototype",
        completed: true,
        date: "March 2024"
      },
      {
        title: "Manufacturing Setup",
        description: "Setup manufacturing facility and supply chain",
        completed: false,
        date: "June 2024"
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
          
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img 
              src="/api/placeholder/800/450"
              alt="Project preview"
              className="rounded-lg object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
            <p className="text-gray-600">{project.description}</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Project Milestones</h2>
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <Milestone key={index} {...milestone} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <div className="mb-6">
              <ProgressBar progress={project.progress} className="mb-4" />
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{project.progress}% Funded</span>
                <span>{project.timeRemaining}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {project.goal} PYUSD
              </div>
            </div>

            <Button size="lg" className="w-full mb-4">
              Invest Now
            </Button>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-500">Creator</span>
                  <p className="font-medium">{project.creator}</p>
                </div>
                <div>
                  <span className="text-gray-500">Category</span>
                  <p className="font-medium">{project.category}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Data Privacy</h3>
              <p className="text-gray-600 text-sm">
                Your investment data is protected via Calimero&apos;s advanced privacy technology. 
                Learn more about our security measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;