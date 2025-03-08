import { useState } from 'react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('active');

  const projects = [
    {
      title: "Sustainable Energy Solution",
      totalRaised: 45000,
      goal: 50000,
      progress: 90,
      status: "active",
      investors: 128,
      currentMilestone: "Manufacturing Setup",
      dueDate: "May 2024",
      lastUpdate: "2 days ago"
    },
    {
      title: "Green Transportation Initiative",
      totalRaised: 25000,
      goal: 40000,
      progress: 62.5,
      status: "active",
      investors: 85,
      currentMilestone: "Prototype Testing",
      dueDate: "June 2024",
      lastUpdate: "1 week ago"
    }
  ];

  const pendingTasks = [
    {
      type: "milestone",
      project: "Sustainable Energy Solution",
      task: "Submit manufacturing completion proof",
      deadline: "3 days"
    },
    {
      type: "update",
      project: "Green Transportation Initiative",
      task: "Monthly progress report due",
      deadline: "1 week"
    }
  ];

  const getFilteredProjects = () => {
    return projects.filter(project => project.status === activeTab);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 ">
          <div className="bg-black rounded-lg shadow p-6 ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Projects</h2>
              <Button variant="primary" size="sm">
                Create New Project
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {['active', 'completed', 'draft'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      ${activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-white hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Project Cards */}
            <div className="space-y-6">
              {getFilteredProjects().map((project, index) => (
                <div key={index} className="border rounded-lg p-6 bg-black shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {project.investors} Investors
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {project.status}
                    </span>
                  </div>

                  <ProgressBar progress={project.progress} className="mb-2" />
                  <div className="flex justify-between text-sm text-white mb-4">
                    <span>{project.totalRaised} / {project.goal} PYUSD</span>
                    <span>Current milestone due: {project.dueDate}</span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      Last updated: {project.lastUpdate}
                    </span>
                    <div className="space-x-3">
                      <Button variant="outline" size="sm">
                        Submit Update
                      </Button>
                      <Button variant="primary" size="sm">
                        Manage Project
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Pending Tasks */}
          <div className="bg-black rounded-lg shadow p-6 mb-6 border">
            <h3 className="text-lg font-semibold text-white mb-4">Pending Tasks</h3>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100">
                      <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{task.project}</p>
                    <p className="text-sm text-white">{task.task}</p>
                    <p className="text-xs text-white mt-1">Due in: {task.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-black rounded-lg shadow p-6 border">
            <h3 className="text-lg font-semibold text-white mb-4 ">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Total Raised</span>
                <span className="text-sm font-medium text-white">70,000 PYUSD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Active Projects</span>
                <span className="text-sm font-medium text-white">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Total Investors</span>
                <span className="text-sm font-medium text-white">213</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
