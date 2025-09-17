import React from "react";
import {
  X,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Upload,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import TaskCreate from "../../DesktopDashboard/TaskManagement/TaskCreate";

interface RightSidebarProps {
  activeView: string;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activeView, onClose }) => {
  const [overviewFilter, setOverviewFilter] = useState("today");

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);

  const quickActions = [
    {
      label: "New Task",
      icon: Plus,
      color: "blue",
      onClick: () => setShowTaskModal(true),
    },
    { label: "New RFQ", icon: Plus, color: "green" , onClick: () => setShowRFQModal(true)},
    { label: "Add Supplier", icon: Plus, color: "purple", onClick: () => setShowSupplierModal(true)},
    { label: "Upload Document", icon: Upload, color: "orange", onClick: () => setShowUploadDocumentModal(true)},
  ];

  const stats = [
    {
      label: "Tasks",
      value: overviewFilter === "today" ? "5" : "12",
      icon: CheckCircle,
      color: "blue",
    },
    {
      label: "RFQs",
      value: overviewFilter === "today" ? "3" : "8",
      icon: Clock,
      color: "green",
    },
    {
      label: "Messages",
      value: overviewFilter === "today" ? "2" : "7",
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "Approvals",
      value: overviewFilter === "today" ? "1" : "5",
      icon: AlertCircle,
      color: "orange",
    },
  ];

  const recentActivity = [
    {
      action: "RFQ created",
      item: "Office Supplies Q1",
      time: "2m ago",
      type: "created",
    },
    {
      action: "Supplier approved",
      item: "Acme Corp",
      time: "15m ago",
      type: "approved",
    },
    {
      action: "Task completed",
      item: "Review quotations",
      time: "1h ago",
      type: "completed",
    },
    {
      action: "Message received",
      item: "Contract terms",
      time: "2h ago",
      type: "message",
    },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left`}
                onClick={() => action?.onClick?.()}
              >
                <div className="flex items-center space-x-2">
                  <action.icon className={`w-4 h-4 text-${action.color}-600`} />
                  <span className="text-xs font-medium text-gray-700">
                    {action.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mini Dashboard */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Overview</h4>
            <div className="relative">
              <button
                onClick={() =>
                  setOverviewFilter(
                    overviewFilter === "today" ? "week" : "today"
                  )
                }
                className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-900"
              >
                <span className="capitalize">
                  {overviewFilter === "today" ? "Today" : "This Week"}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Recent Activity
          </h4>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "created"
                      ? "bg-blue-500"
                      : activity.type === "approved"
                      ? "bg-green-500"
                      : activity.type === "completed"
                      ? "bg-purple-500"
                      : "bg-orange-500"
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium text-gray-900">
                      {activity.action}
                    </span>
                    <span className="mx-1">·</span>
                    <span>{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">
              View more →
            </button>
          </div>
        </div>
      </div>

      {/* ERP Integration Placeholder */}
      <div className="border-t border-gray-100 p-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-xs font-semibold text-gray-700 mb-1">
            ERP Integration
          </h5>
          <p className="text-xs text-gray-500">Connect SAP, Oracle, or Ariba</p>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1">
            Configure →
          </button>
        </div>
      </div>
      {(
        <TaskCreate
          showTaskModal={showTaskModal || showRFQModal || showSupplierModal || showUploadDocumentModal}
          tasks={[]}
          setTasks={() => {}}
          setShowTaskModal={() => {
            setShowTaskModal(false);
            setShowRFQModal(false);
            setShowSupplierModal(false);
            setShowUploadDocumentModal(false);
          }}
        />
      )}

    </div>
  );
};

export default RightSidebar;
