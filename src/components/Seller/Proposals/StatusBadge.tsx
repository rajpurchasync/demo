import React from 'react';
import type { RFQStatus, ProposalStatus } from '../types';

interface StatusBadgeProps {
  status: RFQStatus | ProposalStatus;
  type?: 'rfq' | 'proposal';
}

export function StatusBadge({ status, type = 'rfq' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'New' };
      case 'accepted':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepted' };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' };
      case 'submitted':
        return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Submitted' };
      case 'draft':
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' };
      case 'recalled':
        return { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Recalled' };
      case 'recall-pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Recall Pending' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}