import React, { useState } from 'react';
import { Filter, Plus, Search, ChevronDown, ChevronRight } from 'lucide-react';
import TaskList from './TaskList';

const TaskHub = () => {
  const [expandedSections, setExpandedSections] = useState(['today', 'week']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const filterOptions = ['High Priority', 'Medium Priority', 'Low Priority', 'Overdue', 'Assigned to me'];

  const taskSections = [
    { id: 'today', title: 'Due Today', count: 5, tasks: [
      { id: 1, title: 'Review supplier quotations for office supplies', dueDate: 'Today', priority: 'high', assignee: 'John D.', status: 'in-progress' },
      { id: 2, title: 'Send RFQ to potential vendors', dueDate: 'Today', priority: 'medium', assignee: 'Sarah M.', status: 'pending' },
      { id: 3, title: 'Approve contract terms with Acme Corp', dueDate: 'Today', priority: 'high', assignee: 'Mike R.', status: 'pending' },
    ]},
    { id: 'week', title: 'This Week', count: 8, tasks: [
      { id: 4, title: 'Conduct supplier evaluation meeting', dueDate: 'Wed', priority: 'medium', assignee: 'Lisa K.', status: 'pending' },
      { id: 5, title: 'Update procurement policies document', dueDate: 'Thu', priority: 'low', assignee: 'John D.', status: 'in-progress' },
      { id: 6, title: 'Review and finalize Q2 budget', dueDate: 'Fri', priority: 'high', assignee: 'Sarah M.', status: 'pending' },
    ]},
    { id: 'month', title: 'This Month', count: 12, tasks: [
      { id: 7, title: 'Annual supplier audit preparation', dueDate: 'Mar 15', priority: 'medium', assignee: 'Mike R.', status: 'pending' },
      { id: 8, title: 'Negotiate contract renewal terms', dueDate: 'Mar 20', priority: 'high', assignee: 'Lisa K.', status: 'pending' },
    ]},
    { id: 'later', title: 'Later', count: 15, tasks: [
      { id: 9, title: 'Research new suppliers for IT equipment', dueDate: 'Apr 10', priority: 'low', assignee: 'John D.', status: 'pending' },
      { id: 10, title: 'Create supplier onboarding checklist', dueDate: 'Apr 25', priority: 'medium', assignee: 'Sarah M.', status: 'pending' },
    ]},
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              {selectedFilters.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {selectedFilters.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Task Sections */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {taskSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                  <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {section.count}
                  </span>
                </div>
              </button>

              {expandedSections.includes(section.id) && (
                <div className="border-t border-gray-200">
                  <TaskList tasks={section.tasks} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskHub;