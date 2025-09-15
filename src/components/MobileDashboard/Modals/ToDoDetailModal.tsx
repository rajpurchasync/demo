import React from "react";
import {
  X,
  Calendar,
  User,
  Tag,
  MessageSquare,
  CheckCircle,
  Edit3,
  AlertCircle,
  Send,
} from "lucide-react";
import { ToDo } from "../types/purchasync";
import { cn } from "../utils/cn";
import { useState } from "react";

interface ToDoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: ToDo | null;
}

export function ToDoDetailModal({
  isOpen,
  onClose,
  todo,
}: ToDoDetailModalProps) {
  if (!isOpen || !todo) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editData, setEditData] = useState({
    title: todo.title,
    priority: todo.priority,
    dueDate: todo.dueDate,
    description: todo.description || "",
    assignee: "Sarah Johnson",
  });

  const [comments, setComments] = useState([
    {
      id: "1",
      user: "Sarah Johnson",
      timestamp: "2 hours ago",
      content:
        "I've started working on this task. Will need to coordinate with the suppliers by tomorrow.",
    },
    {
      id: "2",
      user: "Ahmed Hassan",
      timestamp: "1 day ago",
      content: "Please prioritize this as we have a deadline approaching.",
    },
  ]);

  const getStatusColor = () => {
    switch (todo.status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "ongoing":
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
      default:
        return "text-green-600";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const mockActivityLog = [
    {
      id: "1",
      action: "Task created",
      user: "Sarah Johnson",
      timestamp: "2024-01-25 09:30",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      id: "2",
      action: "Status changed to ongoing",
      user: "Ahmed Hassan",
      timestamp: "2024-01-25 10:15",
      icon: Edit3,
      color: "text-green-600",
    },
    {
      id: "3",
      action: "Comment added",
      user: "Sarah Johnson",
      timestamp: "2024-01-25 14:20",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      id: "4",
      action: "Due date updated",
      user: "Omar Abdullah",
      timestamp: "2024-01-26 08:45",
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  const handleSave = () => {
    console.log("Saving todo updates:", editData);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        user: "Sarah Johnson",
        timestamp: "Just now",
        content: newComment,
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-2">
      <div className="bg-white w-full max-w-4xl h-full sm:max-h-[90vh] sm:h-auto rounded-t-lg sm:rounded-lg overflow-hidden">
        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 p-3 overflow-y-auto min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full text-sm font-semibold text-gray-900 mb-1 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                  />
                ) : (
                  <h1 className="text-sm font-semibold text-gray-900 mb-1">
                    {todo.title}
                  </h1>
                )}
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="capitalize">{todo.type}</span>
                  <span>•</span>
                  <span>Created Jan 25, 2024</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                  getStatusColor()
                )}
              >
                {todo.status}
              </span>
              {isEditing ? (
                <select
                  value={editData.priority}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      priority: e.target.value as any,
                    }))
                  }
                  className="px-2 py-0.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              ) : (
                <div className="flex items-center text-xs">
                  <AlertCircle
                    className={cn("w-3 h-3 mr-1", getPriorityColor())}
                  />
                  <span
                    className={cn("font-medium capitalize", getPriorityColor())}
                  >
                    {todo.priority} priority
                  </span>
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Due Date
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.dueDate}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent mt-0.5"
                    />
                  ) : (
                    <div className="flex items-center text-xs text-gray-900 mt-0.5">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(todo.dueDate)}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Assignee
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.assignee}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          assignee: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent mt-0.5"
                    >
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Ahmed Hassan">Ahmed Hassan</option>
                      <option value="Fatima Al-Zahra">Fatima Al-Zahra</option>
                      <option value="Omar Abdullah">Omar Abdullah</option>
                    </select>
                  ) : (
                    <div className="flex items-center text-xs text-gray-900 mt-0.5">
                      <User className="w-3 h-3 mr-1" />
                      {editData.assignee}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {todo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                      >
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded resize-none focus:ring-1 focus:ring-purple-500 focus:border-transparent mt-1"
                  rows={3}
                  placeholder="Add task description..."
                />
              ) : (
                <div className="text-xs text-gray-900 mt-1 p-2 bg-gray-50 rounded border">
                  {editData.description ||
                    "No description provided for this task."}
                </div>
              )}
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Comments Section */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                Comments
              </label>
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-2 bg-gray-50 rounded border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-900">
                        {comment.user}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex space-x-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded resize-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                  rows={2}
                />
                <button
                  onClick={handleAddComment}
                  className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors self-end"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Activity Log Sidebar */}
          <div className="hidden sm:block w-64 border-l border-gray-200 p-3 bg-gray-50 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Activity Log
            </h3>
            <div className="space-y-2">
              {mockActivityLog.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-2">
                    <div
                      className={cn(
                        "p-1 rounded",
                        activity.color,
                        "bg-opacity-10"
                      )}
                    >
                      <Icon className={cn("w-3 h-3", activity.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-900 font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
