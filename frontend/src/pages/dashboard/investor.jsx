import { useState } from 'react';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('active');

  const investments = [
    {
      projectTitle: "Eco-Friendly Water Purifier",
      amountInvested: 5000,
      totalRaised: 37500,
      goal: 50000,
      progress: 75,
      status: "active",
      nextMilestone: "Manufacturing Setup",
      nextMilestoneDate: "June 2024"
    },
    {
      projectTitle: "Smart Urban Farming Solution",
      amountInvested: 3000,
      totalRaised: 25000,
      goal: 40000,
      progress: 62.5,
      status: "active",
      nextMilestone: "Beta Testing",
      nextMilestoneDate: "July 2024"
    }
  ];

  const notifications = [
    {
      type: "milestone",
      project: "Smart Urban Farming Solution",
      message: "Milestone 'Prototype Development' completed",
      date: "2 days ago"
    },
    {
      type: "update",
      project: "Eco-Friendly Water Purifier",
      message: "Monthly progress report available",
      date: "1 week ago"
    },
    {
      type: "alert",
      project: "Smart Urban Farming Solution",
      message: "New investor update available",
      date: "1 week ago"
    }
  ];

  const getFilteredInvestments = () => {
    return investments.filter(investment => investment.status === activeTab);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'milestone':
        return (
          <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'update':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Investments</h2>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {['active', 'completed', 'refunded'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      ${activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Investment Cards */}
            <div className="space-y-6">
              {getFilteredInvestments().map((investment, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {investment.projectTitle}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Invested: {investment.amountInvested} PYUSD
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {investment.status}
                    </span>
                  </div>

                  <ProgressBar progress={investment.progress} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{investment.progress}% of {investment.goal} PYUSD</span>
                    <span>Next milestone: {investment.nextMilestoneDate}</span>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your investment data is protected by Calimero&apos;s privacy technology.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Manage Privacy Settings
            </Button>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                      notification.type === 'milestone' ? 'bg-green-100' :
                      notification.type === 'update' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification.project}</p>
                    <p className="text-sm text-gray-500">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full">
                View All Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;