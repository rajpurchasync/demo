import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, Calendar, Flag, Check, MoreHorizontal, Edit2 } from 'lucide-react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface Project {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  checklist: ChecklistItem[];
  status: string;
  comments?: number;
  attachments?: number;
  assignee?: string;
  label?: string;
}

interface KanbanBoardProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onProjectUpdate: (projectId: number, updates: Partial<Project>) => void;
  onAddProject: (status: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  projects, 
  onProjectClick, 
  onProjectUpdate, 
  onAddProject 
}) => {
  const [expandedChecklists, setExpandedChecklists] = useState<number[]>([]);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<{ id: number; field: string } | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projectMenuId, setProjectMenuId] = useState<number | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<{ projectId: number; show: boolean }>({ projectId: 0, show: false });
  const [columnTitles, setColumnTitles] = useState({
    'To Do': 'To Do',
    'In Progress': 'In Progress',
    'Review': 'Review',
    'Done': 'Done'
  });

  const columns = [
    { id: 'To Do', title: columnTitles['To Do'], color: 'bg-gray-100' },
    { id: 'In Progress', title: columnTitles['In Progress'], color: 'bg-blue-100' },
    { id: 'Review', title: columnTitles['Review'], color: 'bg-yellow-100' },
    { id: 'Done', title: columnTitles['Done'], color: 'bg-green-100' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleChecklist = (projectId: number) => {
    setExpandedChecklists(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleChecklistItem = (projectId: number, itemId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const updatedChecklist = project.checklist.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      onProjectUpdate(projectId, { checklist: updatedChecklist });
    }
  };

  const getProjectsByStatus = (status: string) => {
    return projects.filter(project => project.status === status);
  };

  const handleDragStart = (e: React.DragEvent, project: Project) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(project));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const projectData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onProjectUpdate(projectData.id, { status });
  };

  const handleColumnTitleEdit = (columnId: string, newTitle: string) => {
    setColumnTitles(prev => ({ ...prev, [columnId]: newTitle }));
    setEditingColumn(null);
  };

  const handleProjectFieldEdit = (projectId: number, field: string, value: string) => {
    onProjectUpdate(projectId, { [field]: value });
    setEditingProject(null);
  };

  const handleProjectComplete = (projectId: number) => {
    onProjectUpdate(projectId, { status: 'Done' });
  };

  const handleDuplicateProject = (project: Project) => {
    const duplicatedProject = {
      ...project,
      id: Date.now(),
      title: `${project.title} (Copy)`
    };
    // Add new project instead of updating
    const newProject = { ...duplicatedProject };
    onProjectUpdate(newProject.id, newProject);
    setProjectMenuId(null);
  };

  const handleDeleteProject = (projectId: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      // Filter out the project to delete it
      const updatedProjects = projects.filter(p => p.id !== projectId);
      // Notify parent component about the deletion
      onProjectUpdate(projectId, { deleted: true });
    }
    setProjectMenuId(null);
  };

  const getAssigneeInitials = (assignee: string) => {
    if (!assignee) return '';
    return assignee.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
  };

  const handleDateClick = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDatePicker({ projectId, show: true });
  };

  const handleDateSelect = (projectId: number, newDate: string) => {
    onProjectUpdate(projectId, { dueDate: newDate });
    setShowDatePicker({ projectId: 0, show: false });
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-full overflow-x-auto pb-6">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 min-w-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className={`${column.color} rounded-t-lg p-4 border-b border-gray-200`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {editingColumn === column.id ? (
                  <input
                    type="text"
                    defaultValue={column.title}
                    onBlur={(e) => handleColumnTitleEdit(column.id, e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleColumnTitleEdit(column.id, e.currentTarget.value);
                      }
                    }}
                    className="font-semibold text-gray-900 bg-transparent border-none outline-none focus:bg-white focus:border focus:border-blue-500 rounded px-2 py-1"
                    autoFocus
                  />
                ) : (
                  <h3 
                    className="font-semibold text-gray-900 cursor-pointer hover:bg-white hover:bg-opacity-50 px-2 py-1 rounded"
                    onClick={() => setEditingColumn(column.id)}
                  >
                    {column.title}
                  </h3>
                )}
                <span className="bg-white text-gray-600 text-xs px-2 py-1 rounded-full">
                  {getProjectsByStatus(column.id).length}
                </span>
              </div>
              <button
                onClick={() => onAddProject(column.id)}
                className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Column Content */}
          <div className="bg-gray-50 rounded-b-lg p-4 min-h-[600px] space-y-3">
            {getProjectsByStatus(column.id).map((project) => (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-move group"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-2 flex-1">
                    <button
                      onClick={() => handleProjectComplete(project.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                        project.status === 'Done'
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-gray-300 hover:border-green-600'
                      }`}
                    >
                      {project.status === 'Done' && <Check className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => onProjectClick(project)}
                      className="text-left flex-1 hover:bg-gray-100 p-1 rounded transition-colors group-hover:bg-gray-50"
                    >
                      <input
                        type="text"
                        defaultValue={project.title}
                        onBlur={(e) => onProjectUpdate(project.id, { title: e.target.value })}
                        onFocus={(e) => e.target.parentElement.classList.add('bg-gray-100')}
                        onBlur={(e) => e.target.parentElement.classList.remove('bg-gray-100')}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                        className="font-medium text-gray-900 text-sm leading-tight bg-transparent border-none outline-none w-full hover:bg-gray-50 focus:bg-white focus:border focus:border-blue-500 rounded px-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </button>
                    {hoveredProject === project.id && (
                      <div className="relative">
                        <button
                          onClick={() => setProjectMenuId(projectMenuId === project.id ? null : project.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {projectMenuId === project.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                            <button
                              onClick={() => {
                                console.log('Archive project:', project.id);
                                onProjectUpdate(project.id, { status: 'Done' });
                                setProjectMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Archive
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Due Date */}
                {project.dueDate && (
                  <div className="mb-2">
                    <button
                      onClick={(e) => {
                        handleDateClick(project.id, e);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer flex items-center space-x-1 relative"
                    >
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showDatePicker.show && showDatePicker.projectId === project.id && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-2">
                        <input
                          type="date"
                          defaultValue={new Date(project.dueDate).toISOString().split('T')[0]}
                          onChange={(e) => handleDateSelect(project.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          autoFocus
                        />
                        <button
                          onClick={() => setShowDatePicker({ projectId: 0, show: false })}
                          className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Assignee */}
                {project.assignee && (
                  <div className="mb-2">
                    <div className="relative">
                      <button
                        onClick={() => setEditingProject({ id: project.id, field: 'assignee' })}
                        className="flex flex-wrap gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                      >
                        {project.assignee.split(',').filter(a => a.trim()).map((person, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {getAssigneeInitials(person.trim())}
                              </span>
                            </div>
                          </div>
                        ))}
                      </button>
                      
                      {editingProject?.id === project.id && editingProject?.field === 'assignee' && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px] max-h-48 overflow-y-auto">
                          {['John Mitchell', 'Sarah Chen', 'Mike Rodriguez', 'Lisa Wang', 'David Thompson'].map((person) => {
                            const currentAssignees = project.assignee ? project.assignee.split(',').map(a => a.trim()) : [];
                            const isSelected = currentAssignees.includes(person);
                            return (
                              <label key={person} className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    const updatedAssignees = isSelected
                                      ? currentAssignees.filter(a => a !== person)
                                      : [...currentAssignees, person];
                                    onProjectUpdate(project.id, { assignee: updatedAssignees.join(', ') });
                                  }}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-900">{person}</span>
                              </label>
                            );
                          })}
                          <div className="border-t border-gray-100 p-2">
                            <button
                              onClick={() => setEditingProject(null)}
                              className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Checklist */}
                {project.checklist && project.checklist.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <button
                      onClick={() => toggleChecklist(project.id)}
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors w-full mb-3"
                    >
                      <div className="flex items-center space-x-2">
                        {expandedChecklists.includes(project.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                          Checklist ({project.checklist.filter(item => item.completed).length}/{project.checklist.length})
                        </span>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(project.checklist.filter(item => item.completed).length / project.checklist.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </button>

                    {expandedChecklists.includes(project.id) && (
                      <div className="space-y-2">
                        {project.checklist.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 group">
                            <button
                              onClick={() => toggleChecklistItem(project.id, item.id)}
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                                item.completed
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-gray-300 hover:border-blue-600'
                              }`}
                            >
                              {item.completed && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <span className={`text-sm flex-1 ${
                              item.completed ? 'line-through text-gray-500' : 'text-gray-700'
                            }`}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Priority Badge - Bottom Right */}
                <div className="flex items-end justify-end mt-2">
                  <div className="flex items-center space-x-2">
                    {/* Notification Badge */}
                    {(project.comments > 0 || project.attachments > 0) && (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {project.comments + project.attachments}
                        </span>
                      </div>
                    )}
                    
                    {/* Priority Badge */}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      project.priority === 'high' ? 'bg-red-100 text-red-800' :
                      project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.priority === 'high' ? 'Hi' : project.priority === 'medium' ? 'Med' : 'Lo'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Project Button */}
            <button
              onClick={() => onAddProject(column.id)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
            >
              + Add Project
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;