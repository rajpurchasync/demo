import React from 'react';
import { SupplierQuotationCard } from '../Cards/SupplierQuotationCard';
import { SupplierSampleCard } from '../Cards/SupplierSampleCard';
import { SupplierQuotation, SupplierSample } from '../../types/purchasync';

interface SupplierTransactionsSectionProps {
  quotations: SupplierQuotation[];
  samples: SupplierSample[];
}

export function SupplierTransactionsSection({ quotations, samples }: SupplierTransactionsSectionProps) {
  // Combine and sort all transactions by date
  const allTransactions = [
    ...quotations.map(q => ({ ...q, type: 'quotation' as const, date: q.submittedDate })),
    ...samples.map(s => ({ ...s, type: 'sample' as const, date: s.requestDate }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Transaction History</h3>
        <span className="text-xs text-gray-500">{allTransactions.length} transactions</span>
      </div>
      
      <div className="space-y-3">
        {allTransactions.map((transaction) => (
          <div key={`${transaction.type}-${transaction.id}`}>
            {transaction.type === 'quotation' ? (
              <SupplierQuotationCard
                quotation={transaction as SupplierQuotation}
                onClick={() => console.log('View quotation:', transaction.id)}
              />
            ) : (
              <SupplierSampleCard
                sample={transaction as SupplierSample}
                onClick={() => console.log('View sample:', transaction.id)}
              />
            )}
          </div>
        ))}
      </div>
      
      {allTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="w-12 h-12 mx-auto mb-3 opacity-30">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="20" y="30" width="60" height="40" rx="5" />
              <path d="M30 45h40M30 55h30" />
            </svg>
          </div>
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs mt-1">RFQs and sample requests will appear here.</p>
        </div>
      )}
    </div>
  );
}