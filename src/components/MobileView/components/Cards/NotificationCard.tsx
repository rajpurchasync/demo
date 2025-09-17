import React from 'react';
import { Clock } from 'lucide-react';
import { Notification } from '../../types/purchasync';
import { cn } from '../../utils/cn';

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

export function NotificationCard({ notification, onClick }: NotificationCardProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
    
    if (diffInSeconds < 30) return 'few seconds ago';
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-2 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm',
        notification.isRead 
          ? 'border-gray-200 bg-white' 
          : 'border-purple-200 bg-purple-50'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-semibold text-sm',
            notification.isRead ? 'text-gray-900' : 'text-gray-900 font-semibold'
          )}>
            {notification.title}
          </h3>
          <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
            {notification.message}
          </p>
        </div>
        <div className="flex items-center text-xs text-gray-500 ml-2">
          <Clock className="w-3 h-3 mr-1" />
          {formatTime(notification.timestamp)}
        </div>
      </div>
    </div>
  );
}