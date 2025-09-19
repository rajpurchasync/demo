import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Mail, Video, Building, User } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
  supplier?: any;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, supplier }) => {
  const [formData, setFormData] = useState({
    title: supplier ? `Meeting with ${supplier.name}` : '',
    description: '',
    date: '',
    time: '',
    timezone: 'UTC-8 (PST)',
    type: 'offline',
    venue: '',
    emails: '',
    team: []
  });
  const [emailList, setEmailList] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const teamMembers = [
    'Raj Dhakal',
    'John Mitchell', 
    'Sarah Chen',
    'Mike Rodriguez',
    'Lisa Wang'
  ];

  const timezones = [
    'UTC-12 (Baker Island)',
    'UTC-11 (American Samoa)',
    'UTC-10 (Hawaii)',
    'UTC-9 (Alaska)',
    'UTC-8 (PST)',
    'UTC-7 (MST)',
    'UTC-6 (CST)',
    'UTC-5 (EST)',
    'UTC-4 (Atlantic)',
    'UTC-3 (Argentina)',
    'UTC-2 (Mid-Atlantic)',
    'UTC-1 (Azores)',
    'UTC+0 (GMT/London)',
    'UTC+1 (CET/Paris)',
    'UTC+2 (EET/Cairo)',
    'UTC+3 (Moscow)',
    'UTC+4 (Dubai)',
    'UTC+5 (Pakistan)',
    'UTC+5:30 (India)',
    'UTC+6 (Bangladesh)',
    'UTC+7 (Thailand)',
    'UTC+8 (China/Singapore)',
    'UTC+9 (Japan/Korea)',
    'UTC+10 (Australia East)',
    'UTC+11 (Solomon Islands)',
    'UTC+12 (New Zealand)'
  ];

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = ['00', '30'];

  if (!isOpen) return null;

  const handleSubmit = () => {
    const timeString = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    if (formData.title && formData.date) {
      console.log('EventModal: Creating event with data:', formData);
      const eventData = {
        ...formData,
        time: timeString,
        emails: emailList,
        id: Date.now()
      };
      console.log('EventModal: Final event data:', eventData);
      onSave(eventData);
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 2000);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        timezone: 'UTC-8 (PST)',
        type: 'offline',
        venue: '',
        emails: '',
        team: []
      });
      setEmailList([]);
      setEmailInput('');
      setSelectedHour('09');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
    }
  };

  const addEmail = () => {
    if (emailInput.trim() && !emailList.includes(emailInput.trim())) {
      setEmailList([...emailList, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter(email => email !== emailToRemove));
  };

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
  };

  const toggleTeamMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.includes(member)
        ? prev.team.filter(m => m !== member)
        : [...prev.team, member]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-60">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Event created successfully!</span>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description/Agenda</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter event description and agenda"
              rows={4}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                >
                  {selectedHour}:{selectedMinute} {selectedPeriod}
                </button>
                {showTimeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <div className="p-3">
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Hour</label>
                          <select
                            value={selectedHour}
                            onChange={(e) => setSelectedHour(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            {hours.map(hour => (
                              <option key={hour} value={hour}>{hour}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Min</label>
                          <select
                            value={selectedMinute}
                            onChange={(e) => setSelectedMinute(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            {minutes.map(minute => (
                              <option key={minute} value={minute}>{minute}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Period</label>
                          <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowTimeDropdown(false)}
                        className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Set Time
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'offline' })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.type === 'offline'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Offline</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'online' })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.type === 'online'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Online</span>
              </button>
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === 'online' ? 'Meeting Link' : 'Venue'}
            </label>
            <div className="relative">
              {formData.type === 'online' ? (
                <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              ) : (
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              )}
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={formData.type === 'online' ? 'Enter meeting link (Zoom, Teams, etc.)' : 'Enter venue address'}
              />
            </div>
          </div>

          {/* Email Invites */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Invites</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {emailList.map((email, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {email}
                  <button
                    onClick={() => removeEmail(email)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyPress={handleEmailKeyPress}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <button
                onClick={addEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Team Members */}
          {!supplier && (
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invite Team Members</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {teamMembers.map((member) => (
                <label key={member} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={formData.team.includes(member)}
                    onChange={() => toggleTeamMember(member)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{member}</span>
                  </div>
                </label>
              ))}
            </div>
            </div>
          )}

          {/* Supplier Contacts */}
          {supplier && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invite Supplier Contacts</label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">Main Contact</span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;