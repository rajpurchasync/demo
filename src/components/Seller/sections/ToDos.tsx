import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  Flag, 
  User,
  Clock,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';

const ToDos: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const todos = [
    {
      id: 1,
      title: 'Follow up on Hotel Paradise Resort RFQ',
      description: 'Send detailed quote for premium bed linens - 500 sets',
      priority: 'high',
      dueDate: '2024-01-20',
      status: 'pending',
      assignee: 'You',
      category: 'Sales',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Process sample request from Cafe Central',
      description: 'Prepare and ship coffee bean samples - 5kg variety pack',
      priority: 'medium',
      dueDate: '2024-01-22',
      status: 'in-progress',
      assignee: 'You',
      category: 'Operations',
      createdDate: '2024-01-16'
    },
    {
      id: 3,
      title: 'Update product catalog with new linen collection',
      description: 'Add photos and descriptions for spring linen collection',
      priority: 'low',
      dueDate: '2024-01-25',
      status: 'pending',
      assignee: 'You',
      category: 'Marketing',
      createdDate: '2024-01-14'
    },
    {
      id: 4,
      title: 'Review and respond to customer feedback',
      description: 'Address concerns raised by Restaurant ABC about delivery times',
      priority: 'high',
      dueDate: '2024-01-18',
      status: 'completed',
      assignee: 'You',
      category: 'Customer Service',
      createdDate: '2024-01-12'
    },
    {
      id: 5,
      title: 'Prepare monthly sales report',
      description: 'Compile sales data and performance metrics for January',
      priority: 'medium',
      dueDate: '2024-01-31',
      status: 'pending',
      assignee: 'You',
      category: 'Analytics',
      createdDate: '2024-01-10'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sales':
        return 'bg-purple-100 text-purple-800';
      case 'Operations':
        return 'bg-blue-100 text-blue-800';
      case 'Marketing':
        return 'bg-pink-100 text-pink-800';
      case 'Customer Service':
        return 'bg-orange-100 text-orange-800';
      case 'Analytics':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || todo.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleTodoStatus = (todoId: number) => {
    console.log(`Toggle status for todo ${todoId}`);
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">To-Dos</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your tasks and priorities</p>
        </div>
        <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{todos.filter(t => t.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{todos.filter(t => t.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{todos.filter(t => t.status === 'completed').length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {todos.filter(t => isOverdue(t.dueDate, t.status)).length}
          </div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0">
              <div className="flex items-start space-x-3 flex-1">
                <button
                  onClick={() => toggleTodoStatus(todo.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.status === 'completed'
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {todo.status === 'completed' && <CheckSquare className="w-3 h-3" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${
                      todo.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {todo.title}
                    </h3>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    todo.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {todo.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                      <Flag className="w-3 h-3 inline mr-1" />
                      {todo.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      isOverdue(todo.dueDate, todo.status) ? 'overdue' : todo.status
                    )}`}>
                      {isOverdue(todo.dueDate, todo.status) ? 'Overdue' : todo.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(todo.category)}`}>
                      {todo.category}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className={isOverdue(todo.dueDate, todo.status) ? 'text-red-600 font-medium' : ''}>
                          Due: {formatDate(todo.dueDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{todo.assignee}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Created: {formatDate(todo.createdDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try adjusting your search or filters, or create a new task.</p>
        </div>
      )}
    </div>
  );
};

export default ToDos;