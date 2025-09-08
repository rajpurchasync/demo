import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  FileText,
  ChevronRight,
  Clock,
  CheckCircle,
  Plus,
  Quote,
  ChevronDown,
  Paperclip,
  X,
  Package,
} from "lucide-react";
import { RFQ, RFQCategory, RFQStatus, SortOrder } from "../types/rfq";
import { purchaseTypes } from "../../lib/mockData";

interface RFQListingScreenProps {
  rfqs: RFQ[];
  onRFQSelect: (rfq: RFQ) => void;
}

const ContractListingScreen: React.FC<RFQListingScreenProps> = ({
  rfqs,
  onRFQSelect,
}) => {
  const [activeCategory, setActiveCategory] = useState<RFQCategory>("Products");
  const [statusFilter, setStatusFilter] = useState<string>("product");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedRFQs = useMemo(() => {
    let filtered = rfqs.filter((rfq) => {
      const matchesCategory = rfq.category === activeCategory;
      const matchesStatus =
        statusFilter === "all" || rfq.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfq.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [rfqs, activeCategory, statusFilter, searchQuery, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: RFQStatus) => {
    if (status === "Ongoing") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          Ongoing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Completed
      </span>
    );
  };

  const ongoingCount = filteredAndSortedRFQs.filter(
    (rfq) => rfq.status === "Ongoing"
  ).length;
  const completedCount = filteredAndSortedRFQs.filter(
    (rfq) => rfq.status === "Completed"
  ).length;
  const [showTaskModal, setShowTaskModal] = useState(false);
  const DatePicker = ({
    value,
    onSelect,
    className = "",
  }: {
    value: string;
    onSelect: (value: string) => void;
    className?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      return `${month} ${day}`;
    };

    const isDateDisabled = (day: number) => {
      const date = new Date(currentYear, currentMonth, day);
      return date < today;
    };

    const handleDateSelect = (day: number) => {
      const selectedDate = new Date(currentYear, currentMonth, day);
      if (!isDateDisabled(day)) {
        onSelect(formatDate(selectedDate));
        setIsOpen(false);
      }
    };

    const navigateMonth = (direction: "prev" | "next") => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
        }
        return newDate;
      });
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${className}`}
        >
          {value}
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 min-w-[280px]">
              {/* Month/Year Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-medium">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="p-2 text-gray-500 font-medium">
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const isDisabled = isDateDisabled(day);
                  const isToday =
                    today.getDate() === day &&
                    today.getMonth() === currentMonth &&
                    today.getFullYear() === currentYear;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`p-2 rounded hover:bg-blue-50 transition-colors ${
                        isDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-900 hover:text-blue-600"
                      } ${
                        isToday ? "bg-blue-100 text-blue-600 font-medium" : ""
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "No priority":
        return "bg-gray-50 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };
  const TaskCreationModal = () => {
    const [taskData, setTaskData] = useState({
      title: "",
      description: "",
      assignee: "Raj Dhakal",
      dueDate: "Due date",
      priority: "No priority",
      status: "Open",
      type: "Setup",
    });
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    if (!showTaskModal) return null;

    const handleSubmit = () => {
      if (taskData.title.trim()) {
        const newTask: Task = {
          id: Date.now().toString(),
          title: taskData.title,
          description: taskData.description,
          assignee: taskData.assignee.charAt(0),
          dueDate: taskData.dueDate,
          priority: taskData.priority as
            | "High"
            | "Medium"
            | "Low"
            | "No priority",
          status: taskData.status as "Open" | "Completed",
          type: taskData.type,
          createdBy: "Current User",
          assignedTo: taskData.assignee,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setTasks((prev) => [...prev, newTask]);
        setTaskData({
          title: "",
          description: "",
          assignee: "Raj Dhakal",
          dueDate: "Due date",
          priority: "No priority",
          status: "Open",
          type: "Setup",
        });
        setShowTaskModal(false);
      }
    };

    const priorityOptions = ["High", "Medium", "Low", "No priority"];
    const assigneeOptions = [
      "Raj Dhakal",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Wilson",
    ];
    const typeOptions = [
      "Setup",
      "Sales",
      "Training",
      "Testing",
      "Review",
      "Data",
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Contract title"
              className="text-base sm:text-lg font-medium text-gray-900 bg-transparent border-none outline-none flex-1"
            />
            <button
              onClick={() => setShowTaskModal(false)}
              className="min-w-[44px] min-h-[44px] w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 sm:p-4">
            <textarea
              value={taskData.description}
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Add Contract description..."
              className="w-full h-12 sm:h-16 text-xs sm:text-sm text-gray-600 bg-transparent border-none outline-none resize-none mb-3 sm:mb-4"
            />

            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {/* Priority */}
              <div className="relative">
                <button
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm border ${getPriorityColor(
                    taskData.priority
                  )} min-h-[36px]`}
                >
                  <div className="w-3 h-3 bg-current rounded opacity-60"></div>
                  {taskData.priority}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showPriorityDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowPriorityDropdown(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]">
                      {priorityOptions.map((priority) => (
                        <button
                          key={priority}
                          onClick={() => {
                            setTaskData((prev) => ({ ...prev, priority }));
                            setShowPriorityDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Assignee */}
              <div className="relative">
                <button
                  onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 min-h-[36px]"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                    {taskData.assignee.charAt(0)}
                  </div>
                  {taskData.assignee}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showAssigneeDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowAssigneeDropdown(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[140px]">
                      {assigneeOptions.map((assignee) => (
                        <button
                          key={assignee}
                          onClick={() => {
                            setTaskData((prev) => ({ ...prev, assignee }));
                            setShowAssigneeDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                            {assignee.charAt(0)}
                          </div>
                          {assignee}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Due Date */}
              <div className="relative">
                <DatePicker
                  value={taskData.dueDate}
                  onSelect={(value) =>
                    setTaskData((prev) => ({ ...prev, dueDate: value }))
                  }
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm text-teal-600 min-h-[36px]"
                />
              </div>

              {/* Type */}
              {/* <button className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-100 rounded-lg text-xs sm:text-sm text-blue-700 min-h-[36px]">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                {taskData.type}
              </button> */}

              {/* Add Attachment */}

              <div className="w-full mt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span className="text-[14px]">Upload Template</span>
                  </div>
                </label>

                {/* Show Add Item button if no items with names exist */}

                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                  <Paperclip className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  {/* <p className="text-gray-500 mb-4">No items added yet</p> */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      type="button"
                      //  onClick={() => setShowItemModal(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="text-[14px]">Add Document</span>
                    </button>
                    <button
                      type="button"
                      //  onClick={() => setShowItemModal(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-transparent hover:from-purple-600 hover:to-purple-700 text-black border border-gray-300 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-[14px]">Use Template</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end p-3 sm:p-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors min-h-[36px] sm:min-h-[44px]"
            >
              Create Contract Task
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <TaskCreationModal />
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="">
          <div className="flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Contract Management
                </h1>
              </div>
            </div>

            {/* <a href="rfq-creation"> */}
            <button
              // onClick={() => setShowTaskModal(true)}
              onClick={() => {
                setShowTaskModal(true);
              }}
              className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm min-h-[16px]"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Contract</span>
              {/* <span className="sm:hidden">Add</span> */}
            </button>
            {/* </a> */}
          </div>
          {/* Category Toggle Tabs */}
          {/* <div className="flex bg-gray-100 rounded-lg p-1 mb-4 lg:max-w-xs">
            <button
              onClick={() => setActiveCategory("Products")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeCategory === "Products"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              style={{ minHeight: "44px" }}
            >
              Products
            </button>
            <button
              onClick={() => setActiveCategory("Services")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeCategory === "Services"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              style={{ minHeight: "44px" }}
            >
              Services
            </button>
          </div> */}

          {/* Search Bar */}
          {/* <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by RFQ title or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: "44px" }}
            />
          </div> */}

          {/* Filter Controls */}
          {/* Always Visible Filters */}
          <div className="flex items-center gap-3 px-3 sm:px-4 lg:px-6 py-1  border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setStatusFilter("product")}
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === "product"
                  ? " "
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              } text-xs sm:text-sm min-h-[36px]`}
            >
              Product
              {statusFilter === "product" && (
                <hr className="border-black mt-1 border-[1.2px]" />
              )}
            </button>
            <button
              onClick={() => setStatusFilter("service")}
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === "service"
                  ? " "
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              } text-xs sm:text-sm min-h-[36px]`}
            >
              Service
              {statusFilter === "service" && (
                <hr className="border-black mt-1 border-[1.2px]" />
              )}
            </button>

            <div className="relative w-80 ml-auto ">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search anything..."
                // value={}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:border-primary-300  transition-all duration-200 text-sm shadow-soft"
              />
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[16px]"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="">
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {filteredAndSortedRFQs.map((rfq) => (
              <div
                key={rfq.id}
                onClick={() => onRFQSelect(rfq)}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer active:scale-95"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-blue-600 text-sm mb-1">
                      {rfq.rfqNumber}
                    </div>
                    <h3 className="font-medium text-gray-900 text-base leading-tight mb-2">
                      {rfq.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(rfq.createdDate)}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between">
                  {getStatusBadge(rfq.status)}
                  <div className="text-xs text-gray-500">
                    {rfq.vendors.length} vendor
                    {rfq.vendors.length !== 1 ? "s" : ""} invited
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                {filteredAndSortedRFQs.length == 0 ? (
                  <></>
                ) : (
                  <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedRFQs.map((rfq) => (
                      <tr
                        key={rfq.id}
                        onClick={() => onRFQSelect(rfq)}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-3">
                          <div className="font-medium text-gray-500 text-sm">
                            {rfq.rfqNumber}
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="font-medium  text-sm">
                            {rfq.title}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-gray-500 text-sm">
                          {formatDate(rfq.createdDate)}
                        </td>
                        <td className="px-6 py-3">
                          {getStatusBadge(rfq.status)}
                        </td>
                        <td className="px-6 py-3 text-gray-500 text-sm">
                          {rfq.vendors.length} invited
                        </td>
                        <td className="px-6 py-3 text-right text-sm">
                          <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            View
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {filteredAndSortedRFQs.length == 0 && (
                <div className="flex justify-center items-center ">
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Contract Found
                    </h3>
                    <p className="text-gray-600">
                      {searchQuery
                        ? "Try adjusting your search terms or filters."
                        : ""}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ContractListingScreen;
