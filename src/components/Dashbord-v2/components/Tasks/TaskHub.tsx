import React, { useState } from 'react';
import { Plus, Search, Filter, CheckSquare, Calendar, User, Flag, MoreHorizontal, Check, X, Minus, Tag } from 'lucide-react';
import TaskModal from './TaskModal';

const TaskHub = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);
  const [taskActionMenuId, setTaskActionMenuId] = useState<number | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [editingTask, setEditingTask] = useState<{ id: number; field: string } | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<{ taskId: number; show: boolean }>({ taskId: 0, show: false });

  // Listen for the custom event from Quick Actions and Calendar
  React.useEffect(() => {
    const handleOpenModal = () => {
      setShowTaskModal(true);
    };
    
    const handleAddEventTask = (event: any) => {
      const taskData = event.detail;
      const newTask = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description,
        taskType: taskData.taskType,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        assignee: taskData.assignee,
        status: 'pending'
      };
      setTasks(prev => [...prev, newTask]);
    };
    
    window.addEventListener('openTaskModal', handleOpenModal);
    window.addEventListener('addEventTask', handleAddEventTask);
    
    return () => {
      window.removeEventListener('openTaskModal', handleOpenModal);
      window.removeEventListener('addEventTask', handleAddEventTask);
    };
  }, []);

  const handleSaveTask = (taskData: any) => {
    if (taskData.id) {
      // Edit existing task
      setTasks(prev => prev.map(task => 
        task.id === taskData.id ? { ...task, ...taskData } : task
      ));
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        ...taskData,
        status: 'pending'
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const toggleTaskSelection = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleTaskFieldEdit = (taskId: number, field: string, value: any) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
    setEditingTask(null);
  };

  const handleDateSelect = (taskId: number, newDate: string) => {
    const formattedDate = new Date(newDate).toLocaleDateString();
    handleTaskFieldEdit(taskId, 'dueDate', formattedDate);
    setShowDatePicker({ taskId: 0, show: false });
  };

  const handleCompleteSelected = () => {
    setTasks(prev => prev.map(task => 
      selectedTasks.includes(task.id) ? { ...task, status: 'completed' } : task
    ));
    setSelectedTasks([]);
  };

  const handleLabelSelected = () => {
    console.log('Labeling tasks:', selectedTasks);
    // Add label functionality here
  };

  const handlePrioritySelected = () => {
    console.log('Setting priority for tasks:', selectedTasks);
    // Add priority functionality here
  };

  if (tasks.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My To Do List</h1>
            <p className="text-sm font-medium text-gray-600 mt-1">You have 3 Tasks due today and 8 due this week</p>
          </div>

          <button 
            onClick={() => setShowTaskModal(true)}
            className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add a Task</span>
          </button>
        </div>

        {/* Search and Filter */}

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
            <p className="text-gray-600 mb-6 text-sm font-medium">Start by creating a new task or import data from external sources.</p>
            <button 
              onClick={() => setShowTaskModal(true)}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
            >
              Add a Task
            </button>
          </div>
        </div>

        <TaskModal
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onSave={handleSaveTask}
          task={selectedTask}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} available</p>
        </div>

        <button 
          onClick={() => setShowTaskModal(true)}
          className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add a Task</span>
        </button>
      </div>

      {/* Search and Filter */}
      {tasks.length > 0 && (
        <div className="border-b border-gray-200 p-4 md:p-6">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-100">
                  Filter Options
                </div>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Date Selection
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  By Type
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  By Priority
                </button>
                <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  By Assignee
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedTasks.length === tasks.length
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : selectedTasks.length > 0
                          ? 'bg-blue-100 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {selectedTasks.length === tasks.length && <Check className="w-3 h-3" />}
                      {selectedTasks.length > 0 && selectedTasks.length < tasks.length && <Minus className="w-3 h-3" />}
                    </button>
                    <span>Title</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Assigned to</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Due</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className="hover:bg-gray-50 border-b border-gray-100"
                  onMouseEnter={() => setHoveredTask(task.id)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskSelection(task.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedTasks.includes(task.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : (hoveredTask === task.id || selectedTasks.length > 0)
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-transparent'
                        }`}
                        style={{
                          opacity: (hoveredTask === task.id || selectedTasks.includes(task.id) || selectedTasks.length > 0) ? 1 : 0
                        }}
                      >
                        {selectedTasks.includes(task.id) && <Check className="w-3 h-3" />}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskModal(true);
                        }}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        {task.title}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">{task.taskType}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {task.priority}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">{task.assignee || 'Unassigned'}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">{task.dueDate || 'No date'}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTaskActionMenuId(taskActionMenuId === task.id ? null : task.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {taskActionMenuId === task.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                          <button 
                            onClick={() => {
                              setSelectedTask(task);
                              setShowTaskModal(true);
                              setTaskActionMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => {
                              setTasks(prev => prev.filter(t => t.id !== task.id));
                              setTaskActionMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Bottom Action Panel */}
      {selectedTasks.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
            <span className="text-sm font-semibold">
              {selectedTasks.length} record{selectedTasks.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCompleteSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Mark as Complete"
              >
                <CheckSquare className="w-4 h-4" />
              </button>
              <button
                onClick={handleLabelSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Add Label"
              >
                <Tag className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrioritySelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Set Priority"
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setSelectedTasks([])}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskHub;