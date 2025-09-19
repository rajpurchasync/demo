import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import ProjectModal from './ProjectModal';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  assignee: string;
  startDate: string;
  startDate: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  checklist: ChecklistItem[];
  label?: string;
}

interface ProjectsHubProps {
  onViewChange: (view: string) => void;
}

const ProjectsHub: React.FC<ProjectsHubProps> = ({ onViewChange }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProjectStatus, setNewProjectStatus] = useState<string>('To Do');

  // Listen for the custom event from Quick Actions
  React.useEffect(() => {
    const handleOpenModal = () => {
      console.log('ProjectsHub: Event received from Quick Actions - Opening Project Modal');
      setSelectedProject(null);
      setShowProjectModal(true);
    };
    
    window.addEventListener('openProjectModal', handleOpenModal);
    return () => window.removeEventListener('openProjectModal', handleOpenModal);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleProjectUpdate = (projectId: number, updates: Partial<Project>) => {
    if ('deleted' in updates && updates.deleted) {
      // Handle project deletion
      setProjects(prev => prev.filter(project => project.id !== projectId));
    } else {
      // This is an update to existing project
      setProjects(prev => prev.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      ));
    }
  };

  const handleAddProject = (status: string) => {
    setNewProjectStatus(status);
    setSelectedProject(null);
    setShowProjectModal(true);
  };

  const handleSaveProject = (projectData: any) => {
    if (projectData.id) {
      // Edit existing project
      setProjects(prev => prev.map(project => 
        project.id === projectData.id 
          ? { ...project, ...projectData }
          : project
      ));
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now(),
        title: projectData.title,
        description: projectData.description,
        assignee: projectData.assignee,
        startDate: projectData.startDate,
        startDate: projectData.startDate,
        dueDate: projectData.dueDate,
        priority: projectData.priority,
        status: newProjectStatus,
        checklist: [],
        label: projectData.label,
        comments: 0,
        attachments: 0
      };
      setProjects(prev => [...prev, newProject]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-600 mt-1">Organize and track your procurement projects</p>
        </div>

        <button 
          onClick={() => handleAddProject('To Do')}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden p-4 md:p-6">
        <KanbanBoard
          projects={projects}
          onProjectClick={handleProjectClick}
          onProjectUpdate={handleProjectUpdate}
          onAddProject={handleAddProject}
        />
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setSelectedProject(null);
        }}
        onSave={handleSaveProject}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsHub;