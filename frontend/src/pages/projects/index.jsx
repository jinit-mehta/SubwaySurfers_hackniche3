// pages/projects/index.js
import { useState } from 'react';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { Button } from '../../components/ui/Button';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');

  const projects = [
    {
      title: "Eco-Friendly Water Purifier",
      description: "Revolutionary water purification system using sustainable materials and minimal energy consumption.",
      progress: 75,
      goal: "50,000",
      timeRemaining: "15 days left",
      status: "active"
    },
    {
      title: "Smart Urban Farming Solution",
      description: "Automated vertical farming system for urban environments using IoT technology.",
      progress: 45,
      goal: "75,000",
      timeRemaining: "25 days left",
      status: "active"
    },
    // Add more projects...
  ];

  const filterButtons = [
    { label: 'All Projects', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Upcoming', value: 'upcoming' }
  ];

  const sortOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Most Funded', value: 'funded' },
    { label: 'Ending Soon', value: 'ending' }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {filterButtons.map((button) => (
          <Button
            key={button.value}
            variant={activeFilter === button.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(button.value)}
          >
            {button.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg">
          Load More Projects
        </Button>
      </div>
    </div>
  );
};

export default ProjectsPage;