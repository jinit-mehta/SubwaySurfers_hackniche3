// pages/create-project.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet, createProject } from '../utils/contract'; // Import blockchain functions
import { Button } from '../components/ui/Button';

const CreateProject = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    fundingGoal: '',
    duration: '30',
    description: '',
    milestones: [{ title: '', description: '', deadline: '' }]
  });

  useEffect(() => {
    const loadBlockchain = async () => {
      try {
        console.log("Loading blockchain...");
        const blockchain = await connectWallet(); 
        if (blockchain) {
          setContract(blockchain.contract);
          setAccount(await blockchain.signer.getAddress()); // ✅ Await the getAddress call
        }
      } catch (error) {
        console.error("Blockchain connection error:", error);
      }
    };

    loadBlockchain();
  }, []);

  const handleAddMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', description: '', deadline: '' }]
    }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = formData.milestones.map((milestone, i) => {
      if (i === index) {
        return { ...milestone, [field]: value };
      }
      return milestone;
    });
    setFormData(prev => ({ ...prev, milestones: newMilestones }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Contract not connected");

    const success = await createProject(
      formData.title,
      formData.category,
      formData.fundingGoal,
      formData.duration,
      formData.description,
      formData.milestones
    );

    if (success) {
      alert("Project created successfully!");
      setFormData({ title: '', category: '', fundingGoal: '', duration: '30', description: '', milestones: [{ title: '', description: '', deadline: '' }] });
    } else {
      alert("Project creation failed!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Project</h1>
        {account ? <p>Connected: {account}</p> : <p>Not Connected</p>}
      <Button onClick={() => console.log("Smart contract instance:", contract)}>Check Contract</Button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="environment">Environment</option>
                <option value="social">Social Impact</option>
                <option value="creative">Creative</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Funding Goal (ETH)</label>
                <input type="number" value={formData.fundingGoal} onChange={(e) => setFormData(prev => ({ ...prev, fundingGoal: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Campaign Duration (Days)</label>
                <select value={formData.duration} onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Description</label>
              <textarea rows={6} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Project Milestones</h2>
              <Button type="button" variant="outline" size="sm" onClick={handleAddMilestone}>Add Milestone</Button>
            </div>

            {formData.milestones.map((milestone, index) => (
              <div key={index} className="space-y-4 p-6 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Milestone {index + 1} Title</label>
                  <input type="text" value={milestone.title} onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea rows={3} value={milestone.description} onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Deadline</label>
                  <input type="date" value={milestone.deadline} onChange={(e) => handleMilestoneChange(index, 'deadline', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" size="lg">Save as Draft</Button>
            <Button type="submit" size="lg">Submit Project</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
