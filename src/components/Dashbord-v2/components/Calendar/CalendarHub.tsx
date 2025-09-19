import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Users, Grid, List } from 'lucide-react';
import EventModal from './EventModal';

const CalendarHub = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState<any[]>([]);


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

  const handleCreateEvent = (eventData: any) => {
    console.log('CalendarHub: Received event data:', eventData);
    // Add to events list
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      description: eventData.description,
      type: 'event',
      time: eventData.time,
      timezone: eventData.timezone,
      duration: '1h',
      attendees: [...eventData.team, ...eventData.emails],
      color: 'blue',
      date: eventData.date,
      venue: eventData.venue,
      eventType: eventData.type
    };
    console.log('CalendarHub: Adding new event:', newEvent);
    setEvents(prev => [...prev, newEvent]);

    // Dispatch event to add to task list
    console.log('CalendarHub: Dispatching task event');
    const taskEvent = new CustomEvent('addEventTask', {
      detail: {
        title: eventData.title,
        description: eventData.description,
        taskType: 'Event',
        dueDate: new Date(eventData.date).toLocaleDateString(),
        priority: 'low',
        assignee: eventData.team.length > 0 ? eventData.team.join(', ') : 'Self'
      }
    });
    console.log('CalendarHub: Task event detail:', taskEvent.detail);
    window.dispatchEvent(taskEvent);
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
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-600 mt-1">
            {viewMode === 'month' 
              ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()} - Track deadlines, meetings, and important procurement events`
              : `Week of ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()} - Track deadlines, meetings, and important procurement events`
            }
          </p>
        </div>

        <button 
          onClick={() => setShowEventModal(true)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Month/Week Selection and Navigation */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Week
          </button>
        </div>

        <div className="flex items-center space-x-4">
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

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Calendar */}
        <div className="flex-1 p-4 md:p-6">
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
                      onClick={() => day && setShowEventModal(true)}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center' : 'text-gray-900'
                          }`}>
                            {day}
                          </div>
                          {/* Sample events for day 15 */}
                          
                          {/* Dynamic events for any day */}
                          {events.filter(event => {
                            if (!event.date) return false;
                            const eventDate = new Date(event.date);
                            const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                            return eventDate.toDateString() === cellDate.toDateString();
                          }).map(event => (
                            <div key={event.id} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded truncate mt-1">
                              {event.title}
                            </div>
                          ))}
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
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Today's Events Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white">
          <div className="p-4 md:p-6">
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

      <EventModal 
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleCreateEvent}
      />
    </div>
  );
};

export default CalendarHub;