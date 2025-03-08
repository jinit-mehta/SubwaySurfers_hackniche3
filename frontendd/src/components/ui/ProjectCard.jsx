// // components/ui/ProjectCard.js
// import React from 'react';
// import { ProgressBar } from './ProgressBar';

// export const ProjectCard = ({ title, description, progress, goal, timeRemaining, status }) => {
//   const statusColors = {
//     active: 'bg-green-100 text-green-800',
//     completed: 'bg-blue-100 text-blue-800',
//     upcoming: 'bg-yellow-100 text-yellow-800'
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
//           {status}
//         </span>
//       </div>
//       <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
//       <ProgressBar progress={progress} className="mb-4" />
//       <div className="flex justify-between text-sm text-gray-500">
//         <span>{`${progress}% of ${goal} PYUSD`}</span>
//         <span>{timeRemaining}</span>
//       </div>
//     </div>
//   );
// };

// components/ui/ProjectCard.js
import React from 'react';
import { ProgressBar } from './ProgressBar';

export const ProjectCard = ({ title, description, image, progress, goal, timeRemaining, status }) => {
  const statusColors = {
    active: "bg-green-600 text-white",
    completed: "bg-blue-600 text-white",
    upcoming: "bg-yellow-600 text-black",
  };

  return (
    <div className="bg-black rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 text-white flex flex-col overflow-hidden">
      {/* Image Section (Top) */}
      <div className="w-full">
        {/* <img
          src={image} // Fetches the image URL from the database
          alt={""}
          className="w-full h-60 object-cover rounded-t-xl"
        /> */}
 <img src="/Img.jpg" alt="Local Image" className="w-full h-auto"/>
      </div>

      {/* Details Section (Bottom) */}
      <div className="w-full flex flex-col justify-between p-4">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
              {status}
            </span>
          </div>
          <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>
        </div>
        <ProgressBar progress={progress} className="mb-4" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>{`${progress}% of ${goal} PYUSD`}</span>
          <span>{timeRemaining}</span>
        </div>
      </div>
    </div>
  );
};




