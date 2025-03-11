import { useState } from 'react';

// First, let's define our interfaces
interface Client {
  id: number;
  name: string;
  engagement: string;
  sector: string;
  genAiStatus: 'Approved' | 'In Review' | 'Not Started' | 'Not Permitted';
  usage: number;
  doraImplemented: string;
}

interface DoraMetrics {
  deploymentFrequency: 'Elite' | 'High' | 'Medium' | 'Low';
  leadTime: 'Elite' | 'High' | 'Medium' | 'Low';
  mttr: 'Elite' | 'High' | 'Medium' | 'Low';
  changeFailureRate: 'Elite' | 'High' | 'Medium' | 'Low';
  cadence: string;
}

interface FeedbackData {
  satisfaction: number;
  productivity: number;
  summary: string;
  successStories: string;
}

// Simple app that showcases the GenAI and DORA metrics tracking concept
const GenAIDORATracker = () => {
  // Update your state definition
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'genai' | 'dora' | 'feedback'>('overview');

  // Type your data structures
  const clients: Client[] = [
    {
      id: 1,
      name: "Department of Energy",
      engagement: "Cloud Migration Phase 2",
      sector: "Federal",
      genAiStatus: "Approved",
      usage: 65,
      doraImplemented: "Yes"
    },
    {
      id: 2,
      name: "Veterans Affairs",
      engagement: "Healthcare Systems Modernization",
      sector: "Federal",
      genAiStatus: "In Review",
      usage: 0,
      doraImplemented: "Partial"
    },
    {
      id: 3,
      name: "XYZ Corporation",
      engagement: "DevOps Transformation",
      sector: "Commercial",
      genAiStatus: "Approved",
      usage: 90,
      doraImplemented: "Yes"
    }
  ];

  const doraMetrics: Record<number, DoraMetrics> = {
    1: {
      deploymentFrequency: "Medium",
      leadTime: "Medium",
      mttr: "High", 
      changeFailureRate: "Medium",
      cadence: "Bi-weekly"
    },
    2: {
      deploymentFrequency: "Low",
      leadTime: "Low",
      mttr: "Medium", 
      changeFailureRate: "Medium",
      cadence: "Monthly"
    },
    3: {
      deploymentFrequency: "Elite",
      leadTime: "High",
      mttr: "Elite", 
      changeFailureRate: "Elite",
      cadence: "Weekly"
    }
  };

  const feedbackData: Record<number, FeedbackData> = {
    1: {
      satisfaction: 4.2,
      productivity: 4.5,
      summary: "Most developers report high satisfaction with code suggestions; some concerns about context limitations",
      successStories: "30% reduction in code review time"
    },
    2: {
      satisfaction: 0,
      productivity: 0,
      summary: "No feedback yet - pending tool approval",
      successStories: ""
    },
    3: {
      satisfaction: 4.8,
      productivity: 4.9,
      summary: "Very high satisfaction across all teams; considered essential to workflow",
      successStories: "50% reduction in time to market for new features, 70% reduction in documentation time"
    }
  };

  // Add types to your helper functions
  const getStatusColor = (status: Client['genAiStatus']): string => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Not Permitted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoraLevelColor = (level: DoraMetrics[keyof DoraMetrics]): string => {
    switch(level) {
      case 'Elite': return 'bg-indigo-100 text-indigo-800';
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // When accessing data, add null checks
  const selectedClientData = selectedClient ? clients.find(c => c.id === selectedClient) : null;
  const selectedDoraMetrics = selectedClient ? doraMetrics[selectedClient] : null;
  const selectedFeedback = selectedClient ? feedbackData[selectedClient] : null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">GenAI & DORA Metrics Tracker</h1>
          <div className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-semibold">
            17 Engagements
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Client List */}
        <div className="w-64 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search engagements..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Client List */}
          <div className="overflow-y-auto">
            {clients.map(client => (
              <div 
                key={client.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-indigo-50 ${selectedClient === client.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
                onClick={() => setSelectedClient(client.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{client.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(client.genAiStatus)}`}>
                    {client.genAiStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{client.engagement}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-4">
                    {client.usage}% Usage
                  </span>
                  <span>
                    DORA: {client.doraImplemented}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add New Button */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Add New Engagement
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          {selectedClient && (
            <div className="bg-white border-b border-gray-200">
              <div className="flex">
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'genai' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('genai')}
                >
                  GenAI Status
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'dora' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('dora')}
                >
                  DORA Metrics
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'feedback' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('feedback')}
                >
                  Feedback
                </button>
              </div>
            </div>
          )}
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!selectedClient ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-xl">Select an engagement to view details</p>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedClientData?.name}</h2>
                      <p className="text-gray-600">{selectedClientData?.engagement}</p>
                      <div className="mt-2">
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full mr-2">
                          {selectedClientData?.sector}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(selectedClientData?.genAiStatus ?? 'Not Started')}`}>
                          {selectedClientData?.genAiStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* GenAI Stats */}
                      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">GenAI Implementation</h3>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Team Usage</p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${selectedClientData?.usage}%` }}
                            ></div>
                          </div>
                          <p className="text-sm font-medium">{selectedClientData?.usage}% of team members</p>
                        </div>
                      </div>
                      
                      {/* DORA Stats */}
                      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">DORA Metrics Status</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Deployment Frequency</p>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${getDoraLevelColor(selectedDoraMetrics?.deploymentFrequency ?? 'Not Provided')}`}>
                              {selectedDoraMetrics?.deploymentFrequency}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Lead Time for Changes</p>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${getDoraLevelColor(selectedDoraMetrics?.leadTime ?? 'Not Provided')}`}>
                              {selectedDoraMetrics?.leadTime}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Mean Time to Recovery</p>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${getDoraLevelColor(selectedDoraMetrics?.mttr ?? 'Not Provided')}`}>
                              {selectedDoraMetrics?.mttr}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Change Failure Rate</p>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${getDoraLevelColor(selectedDoraMetrics?.changeFailureRate ?? 'Not Provided')}`}>
                              {selectedDoraMetrics?.changeFailureRate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Feedback Summary */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Summary</h3>
                      
                      {selectedFeedback?.satisfaction ?? -1 > 0 ? (
                        <div>
                          <div className="flex mb-4">
                            <div className="mr-6">
                              <div className="flex items-center">
                                <span className="font-medium text-xl">{selectedFeedback?.satisfaction.toFixed(1)}</span>
                                <span className="text-gray-500 text-sm ml-1">satisfaction</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium text-xl">{selectedFeedback?.productivity.toFixed(1)}</span>
                                <span className="text-gray-500 text-sm ml-1">productivity</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Team Feedback</p>
                            <p className="text-sm">{selectedFeedback?.summary}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Success Stories</p>
                            <p className="text-sm">{selectedFeedback?.successStories || "No success stories documented yet"}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
                          <p className="font-medium">Feedback not yet available</p>
                          <p className="text-sm">{selectedFeedback?.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* GenAI Status Tab */}
                {activeTab === 'genai' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">GenAI Implementation Details</h2>
                    <p className="mb-6">This tab would contain detailed information about GenAI implementation status, tools, policies, and adoption strategies.</p>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500">For the selected client, we've built a simplified version of the interface. A complete implementation would include:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
                        <li>Approval process details and timeline</li>
                        <li>Approved tool configurations and limitations</li>
                        <li>Policy documentation links</li>
                        <li>Training and adoption resources</li>
                        <li>Integration status with development workflow</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* DORA Metrics Tab */}
                {activeTab === 'dora' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">DORA Metrics Detailed View</h2>
                    <p className="mb-6">This tab would contain comprehensive DORA metrics tracking data, historical trends, and improvement targets.</p>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500">For the selected client, we've built a simplified version of the interface. A complete implementation would include:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
                        <li>Historical performance charts for each metric</li>
                        <li>Benchmarking against industry standards</li>
                        <li>Integration with CI/CD platforms for automated data collection</li>
                        <li>Improvement targets and progress tracking</li>
                        <li>Correlation analysis with GenAI adoption metrics</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Feedback Tab */}
                {activeTab === 'feedback' && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Qualitative Feedback Collection</h2>
                    <p className="mb-6">This tab would contain detailed feedback from team members about their GenAI usage experience.</p>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500">For the selected client, we've built a simplified version of the interface. A complete implementation would include:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
                        <li>Individual feedback entries with sentiment analysis</li>
                        <li>Common themes and patterns identification</li>
                        <li>Tool-specific satisfaction metrics</li>
                        <li>Productivity impact assessments</li>
                        <li>Learning curve and adoption feedback</li>
                        <li>Links to survey form for collecting additional feedback</li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenAIDORATracker;