import React from 'react';
import { Calendar, Edit3, X, RefreshCw, Check } from 'lucide-react';
import { BookingData } from '../../types/booking';
import { Button } from '../UI/Button';

interface PostBookingProps {
  bookingId: string;
  data: BookingData;
  onStartNew: () => void;
}

export function PostBooking({ bookingId, data, onStartNew }: PostBookingProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hour] = timeStr.split(':');
    return parseInt(hour) > 12 ? `${parseInt(hour) - 12}:00 PM` : `${hour}:00 AM`;
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#145434] rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your cleaning service has been successfully booked.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Booking ID: #{bookingId}
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Booking Details</h2>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service</span>
            <span className="font-medium">
              {data.bookingType === 'home' ? 'Home' : 'Office'} Cleaning
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time</span>
            <span className="font-medium">
              {formatDate(data.date)} at {formatTime(data.time)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{data.bookingHours} hour{data.bookingHours !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Property</span>
            <span className="font-medium">{data.apartmentType?.toUpperCase()}</span>
          </div>
          
          {data.repeatService && (
            <div className="flex justify-between">
              <span className="text-gray-600">Frequency</span>
              <span className="font-medium capitalize">{data.frequency}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Contact</span>
            <span className="font-medium">{data.contact.phone}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Paid</span>
              <span className="font-bold text-lg text-[#145434]">
                AED {(data.apartmentType ? 
                  (data.apartmentType === 'studio' ? 80 : 
                   data.apartmentType === '1br' ? 120 :
                   data.apartmentType === '2br' ? 160 : 250) * data.bookingHours +
                  (data.addOns?.ironing ? 15 * data.bookingHours : 0) : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          fullWidth 
          size="lg"
          variant="primary"
          onClick={() => {
            // Add to calendar logic would go here
            alert('Calendar event created!');
          }}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Add to Calendar
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="secondary" 
            fullWidth
            onClick={() => {
              // Modify booking logic
              alert('Modify booking feature coming soon!');
            }}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Modify Booking
          </Button>
          
          <Button 
            variant="ghost" 
            fullWidth
            onClick={() => {
              // Cancel booking logic
              if (confirm('Are you sure you want to cancel this booking?')) {
                alert('Booking cancelled');
              }
            }}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Booking
          </Button>
        </div>
      </div>

      {/* Recurring Service Nudge */}
      {!data.repeatService && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <RefreshCw className="w-5 h-5 text-[#145434] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[#145434] mb-1">Save Time & Money</h3>
              <p className="text-sm text-gray-600 mb-3">
                Make this a recurring service and get 10% off your next booking!
              </p>
              <Button size="sm" variant="primary">
                Make It Recurring
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Start New Booking */}
      <div className="pt-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          fullWidth 
          onClick={onStartNew}
          className="text-[#145434]"
        >
          Book Another Service
        </Button>
      </div>
    </div>
  );
}