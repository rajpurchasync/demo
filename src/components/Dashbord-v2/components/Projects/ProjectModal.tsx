import React, { useState } from 'react';
import { X, Calendar, User, Flag, Paperclip, Plus, ChevronDown, Check, Trash2, Expand, Minimize, MessageSquare, Activity, Upload } from 'lucide-react';

interface Project {
  id?: number;
  title: string;
  description: string;
  assignee: string;
  startDate: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  label?: string;
}

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [assignee, setAssignee] = useState(project?.assignee || '');
  const [startDate, setStartDate] = useState(project?.startDate || '');
  const [dueDate, setDueDate] = useState(project?.dueDate || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(project?.priority || 'medium');
  const [status, setStatus] = useState(project?.status || 'To Do');
  const [label, setLabel] = useState(project?.label || '');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Mitchell',
      content: 'I\'ve started working on this project. Will have the initial review completed by tomorrow.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'Sarah Chen',
      content: 'Thanks for the update! Let me know if you need any additional resources.',
      timestamp: '1 hour ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [activities] = useState([]);
  const [editingAssignee, setEditingAssignee] = useState(false);

  // Update form when project prop changes
  React.useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description || '');
      setAssignee(project.assignee || 'Raj Dhakal (You)');
      setStartDate(project.startDate || '');
      setDueDate(project.dueDate);
      setPriority(project.priority);
      setStatus(project.status);
      setLabel(project.label || '');
    } else {
      // Reset form for new project
      setTitle('');
      setDescription('');
      setAssignee('Raj Dhakal (You)');
      setStartDate('');
      setDueDate('');
      setPriority('medium');
      setStatus('To Do');
      setLabel('');
    }
  }, [project]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() && description.trim() && startDate && dueDate) {
      const projectData: Project = {
        id: project?.id,
        title: title.trim(),
        description: description.trim(),
        assignee,
        startDate,
        dueDate,
        priority,
        status,
        label,
      };
      onSave(projectData);
      onClose();
    } else {
      alert('Please fill in all required fields: Title, Description, Start Date, and Due Date');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'You',
        content: newComment.trim(),
        timestamp: 'Just now'
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([...checklist, {
        id: Date.now(),
        text: newChecklistItem.trim(),
        completed: false
      }]);
      setNewChecklistItem('');
    }
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeChecklistItem = (id: number) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr === 'Today') return new Date().toISOString().split('T')[0];
    if (dateStr === 'Tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    if (dateStr === 'This week') {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    }
    // Try to parse as ISO date
    try {
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString();
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setStartDate(formatDateForDisplay(selectedDate));
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setDueDate(formatDateForDisplay(selectedDate));
    }
  };

  const tabs = [
    { id: 'properties', label: 'Properties', icon: Flag },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'activity', label: 'Activity', icon: Activity }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="flex-1 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`bg-white shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-full' : 'w-2/5'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 cursor-pointer transition-colors" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              className="text-lg font-semibold text-gray-900 bg-transparent border-none outline-none flex-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? <Minimize className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'properties' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description *"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    !description.trim() ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Properties */}
              <div className="space-y-4">
                {/* First Row: Priority, Start Date, Due Date */}
                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                      className={`w-full text-sm px-3 py-2 rounded-lg font-medium border outline-none cursor-pointer ${getPriorityColor(priority)}`}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formatDateForInput(startDate)}
                      onChange={handleStartDateChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full text-sm text-gray-900 border rounded-lg px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 ${
                        !startDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={formatDateForInput(dueDate)}
                      onChange={handleDueDateChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full text-sm text-gray-900 border rounded-lg px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 ${
                        !dueDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Second Row: Assign, Status, Label */}
                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                  {/* Assign */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign</label>
                    <div className="relative">
                      <button
                        onClick={() => setEditingAssignee(!editingAssignee)}
                        className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {assignee || 'Raj Dhakal (You)'}
                      </button>
                      
                      {editingAssignee && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                          {['Raj Dhakal (You)', 'John Mitchell', 'Sarah Chen', 'Mike Rodriguez', 'Lisa Wang'].map((person) => {
                            const currentAssignees = assignee ? assignee.split(',').map(a => a.trim()) : ['Raj Dhakal (You)'];
                            const isSelected = currentAssignees.includes(person);
                            return (
                              <label key={person} className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    let updatedAssignees;
                                    if (person === 'Raj Dhakal (You)') {
                                      // Always keep main user, just toggle others
                                      updatedAssignees = isSelected && currentAssignees.length > 1
                                        ? currentAssignees.filter(a => a !== person)
                                        : currentAssignees.includes(person) ? currentAssignees : [...currentAssignees, person];
                                    } else {
                                      updatedAssignees = isSelected
                                        ? currentAssignees.filter(a => a !== person)
                                        : [...currentAssignees, person];
                                    }
                                    setAssignee(updatedAssignees.join(', '));
                                  }}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-900">{person}</span>
                              </label>
                            );
                          })}
                          <div className="border-t border-gray-100 p-2">
                            <button
                              onClick={() => setEditingAssignee(false)}
                              className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  {/* Label */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                    <select
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">None</option>
                      <option value="urgent">Urgent</option>
                      <option value="important">Important</option>
                      <option value="review">Review</option>
                      <option value="approved">Approved</option>
                      <option value="on-hold">On-hold</option>
                    </select>
                  </div>
                </div>

                {/* Attachments */}
                <div className="py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Attachments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Add file</span>
                      </label>
                    </div>
                  </div>
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Checklist</h3>
                <div className="space-y-2">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 group">
                      <button
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-gray-300 hover:border-blue-600'
                        }`}
                      >
                        {item.completed && <Check className="w-3 h-3" />}
                      </button>
                      <span className={`text-sm flex-1 ${
                        item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {item.text}
                      </span>
                      <button
                        onClick={() => removeChecklistItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
                      >
                        <Trash2 className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Add new checklist item */}
                  <div className="flex items-center space-x-3 mt-3">
                    <div className="w-4 h-4 rounded border-2 border-gray-300" />
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addChecklistItem()}
                      placeholder="Add checklist item"
                      className="text-sm flex-1 bg-transparent border-none outline-none placeholder-gray-400"
                    />
                    {newChecklistItem && (
                      <button
                        onClick={addChecklistItem}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{comment.author.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.author} • {activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;