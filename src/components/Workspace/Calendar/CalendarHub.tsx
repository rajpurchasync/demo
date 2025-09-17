import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Users, Grid, List } from 'lucide-react';

const CalendarHub = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const events = [
    {
      id: 1,
      title: 'Supplier Evaluation Meeting',
      type: 'meeting',
      time: '09:00 AM',
      duration: '1h',
      attendees: ['John D.', 'Sarah M.'],
      color: 'blue'
    },
    {
      id: 2,
      title: 'Contract Review Deadline',
      type: 'deadline',
      time: '05:00 PM',
      duration: null,
      attendees: [],
      color: 'red'
    },
    {
      id: 3,
      title: 'RFQ Presentation',
      type: 'presentation',
      time: '02:30 PM',
      duration: '45m',
      attendees: ['Mike R.', 'Lisa K.', 'Team A'],
      color: 'green'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week
              </button>
            </div>
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Calendar */}
        <div className="flex-1 p-6">
          {viewMode === 'month' ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-200">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {days.map((day, index) => {
                  const isToday = day === today && 
                    currentDate.getMonth() === currentMonth && 
                    currentDate.getFullYear() === currentYear;
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border-b border-r border-gray-100 ${
                        day ? 'hover:bg-gray-50 cursor-pointer' : ''
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center' : 'text-gray-900'
                          }`}>
                            {day}
                          </div>
                          {/* Sample events for day 15 */}
                          {day === 15 && (
                            <div className="space-y-1">
                              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate">
                                Task: Supplier Meeting
                              </div>
                              <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded truncate">
                                Task: Contract Review Due
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Week view header */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">Time</div>
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Week view grid */}
              <div className="grid grid-cols-8">
                {Array.from({ length: 24 }, (_, hour) => (
                  <React.Fragment key={hour}>
                    <div className="p-2 border-b border-r border-gray-100 text-xs text-gray-500 bg-gray-50">
                      {hour.toString().padStart(2, '0')}:00
                    </div>
                    {Array.from({ length: 7 }, (_, day) => (
                      <div key={day} className="min-h-[60px] p-1 border-b border-r border-gray-100 hover:bg-gray-50 cursor-pointer">
                        {/* Sample event for Tuesday 9 AM */}
                        {hour === 9 && day === 2 && (
                          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Task: Supplier Meeting
                          </div>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Today's Events Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Events</h3>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                    <div className={`w-3 h-3 rounded-full bg-${event.color}-500`}></div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                      {event.duration && <span>({event.duration})</span>}
                    </div>
                  </div>
                  {event.attendees.length > 0 && (
                    <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHub;