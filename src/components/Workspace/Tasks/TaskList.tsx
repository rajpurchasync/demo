import React from 'react';
import { MoreHorizontal, Clock, AlertTriangle, CheckCircle, User, ArrowUp, ArrowDown, Minus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editField, setEditField] = useState<string | null>(null);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <ArrowUp className="w-3 h-3 text-red-500" />;
      case 'medium':
        return <Minus className="w-3 h-3 text-yellow-500" />;
      case 'low':
        return <ArrowDown className="w-3 h-3 text-green-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {task.title}
                </h4>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <button 
                    onClick={() => {
                      setEditingTask(task.id);
                      setEditField('dueDate');
                    }}
                    className="hover:text-gray-700 hover:bg-gray-100 px-1 py-0.5 rounded flex items-center space-x-1"
                  >
                    <span>{task.dueDate}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <button 
                    onClick={() => {
                      setEditingTask(task.id);
                      setEditField('assignee');
                    }}
                    className="hover:text-gray-700 hover:bg-gray-100 px-1 py-0.5 rounded flex items-center space-x-1"
                  >
                    <span>{task.assignee}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-4">
              {/* Priority */}
              <button 
                onClick={() => {
                  setEditingTask(task.id);
                  setEditField('priority');
                }}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 ${getPriorityColor(task.priority)}`}
              >
                {getPriorityIcon(task.priority)}
                <span className="capitalize">{task.priority}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Actions - shown on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700">
                  <User className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;