import React, { useState } from 'react';
import { X, Calendar, User, Flag, Paperclip, Plus, ChevronDown, Check, Trash2, Expand, Minimize, MessageSquare, Activity, Upload } from 'lucide-react';

interface Task {
  id?: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  taskType: string;
}

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assignee, setAssignee] = useState(task?.assignee || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(task?.priority || 'medium');
  const [taskType, setTaskType] = useState(task?.taskType || 'Task');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Mitchell',
      content: 'I\'ve started working on this task. Will have the initial review completed by tomorrow.',
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
  const [activities] = useState([
    { id: 1, action: 'Task created', author: 'Raj Dhakal', timestamp: 'Sep 17, 20:51' },
    { id: 2, action: 'Priority set to Medium', author: 'Raj Dhakal', timestamp: 'Sep 17, 20:52' },
    { id: 3, action: 'Due date set', author: 'Raj Dhakal', timestamp: 'Sep 17, 20:53' },
    { id: 4, action: 'Assigned to John Mitchell', author: 'Raj Dhakal', timestamp: 'Sep 17, 20:54' },
    { id: 5, action: 'Comment added', author: 'John Mitchell', timestamp: 'Sep 18, 09:15' },
    { id: 6, action: 'Comment added', author: 'Sarah Chen', timestamp: 'Sep 18, 10:30' }
  ]);
  const [editingAssignee, setEditingAssignee] = useState(false);

  // Update form when task prop changes
  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setAssignee(task.assignee || 'Raj Dhakal (You)');
      setDueDate(task.dueDate);
      setPriority(task.priority);
      setTaskType(task.taskType);
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setAssignee('Raj Dhakal (You)');
      setDueDate('');
      setPriority('medium');
      setTaskType('Task');
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() && description.trim() && dueDate) {
      const taskData: Task = {
        id: task?.id,
        title: title.trim(),
        description: description.trim(),
        assignee,
        dueDate,
        priority,
        taskType,
      };
      onSave(taskData);
      onClose();
    } else {
      alert('Please fill in all required fields: Title, Description, and Due Date');
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              placeholder="Task title"
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

        {/* Task Info */}

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
                {/* Priority, Due Date, Assign Row */}
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

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={formatDateForInput(dueDate)}
                      onChange={handleDateChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full text-sm text-gray-900 border rounded-lg px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 ${
                        !dueDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>

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
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h3>
                  <p className="text-gray-500">Task activity will appear here as actions are taken.</p>
                </div>
              ) : (
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
              )}
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
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;