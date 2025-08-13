import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Send, Eye, Quote } from 'lucide-react';
import { BuyerItemsList } from './BuyerItemsList';
import { ItemQuoteModal } from './ItemQuoteModal';
import { ProposalSummary } from './ProposalSummary';
import { SubmitConfirmModal } from './SubmitConfirmModal';
import { QuotationPreviewModal } from './QuotationPreviewModal';
import type { RFQ, ProposalItem, RFQItem } from '../types';

interface ProposalCreationProps {
  rfq: RFQ;
  onBack: () => void;
  onSubmit: () => void;
}

export function ProposalCreation({ rfq, onBack, onSubmit }: ProposalCreationProps) {
  const [items, setItems] = useState<ProposalItem[]>([]);
  const [currency, setCurrency] = useState('USD');
  const [paymentTerms, setPaymentTerms] = useState(rfq.paymentTerms);
  const [shipmentMethod, setShipmentMethod] = useState('Direct Delivery');
  const [includeShipment, setIncludeShipment] = useState(false);
  const [shipmentCharge, setShipmentCharge] = useState(0);
  const [quotationValidityDate, setQuotationValidityDate] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('Payment terms as agreed. Delivery within specified timeframe. All prices are subject to change without notice.');
  const [additionalBenefits, setAdditionalBenefits] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showItemQuoteModal, setShowItemQuoteModal] = useState(false);
  const [currentQuotingItem, setCurrentQuotingItem] = useState<{ rfqItem: RFQItem; proposalItem: ProposalItem } | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Initialize items from RFQ
  useEffect(() => {
    const initialItems: ProposalItem[] = rfq.items.map((rfqItem, index) => ({
      id: `prop-item-${index}`,
      rfqItemId: rfqItem.id,
      productName: rfqItem.productName,
      brand: '',
      origin: '',
      packaging: '',
      quantity: rfqItem.quantity,
      unitPrice: 0,
      discountType: 'percentage',
      discountValue: 0,
      vatPercentage: 10,
      totalBeforeDiscount: 0,
      totalAfterDiscount: 0,
      totalIncludingVAT: 0,
      sku: `SKU-${index + 1}`
    }));
    setItems(initialItems);
    
    // Set default quotation validity date (30 days from now)
    const validityDate = new Date();
    validityDate.setDate(validityDate.getDate() + 30);
    setQuotationValidityDate(validityDate.toISOString().split('T')[0]);
  }, [rfq]);

  const handleQuoteItem = (rfqItem: RFQItem) => {
    const proposalItem = items.find(item => item.rfqItemId === rfqItem.id);
    if (proposalItem) {
      setCurrentQuotingItem({ rfqItem, proposalItem });
      setCurrentItemIndex(rfq.items.findIndex(item => item.id === rfqItem.id));
      setShowItemQuoteModal(true);
    }
  };

  const handleSaveItemQuote = (updatedItem: ProposalItem) => {
    updateItem(updatedItem.id, updatedItem);
  };

  const handleNextItem = () => {
    if (currentItemIndex < rfq.items.length - 1) {
      const nextIndex = currentItemIndex + 1;
      const nextRfqItem = rfq.items[nextIndex];
      const nextProposalItem = items.find(item => item.rfqItemId === nextRfqItem.id);
      if (nextProposalItem) {
        setCurrentQuotingItem({ rfqItem: nextRfqItem, proposalItem: nextProposalItem });
        setCurrentItemIndex(nextIndex);
      }
    }
  };

  const handlePreviousItem = () => {
    if (currentItemIndex > 0) {
      const prevIndex = currentItemIndex - 1;
      const prevRfqItem = rfq.items[prevIndex];
      const prevProposalItem = items.find(item => item.rfqItemId === prevRfqItem.id);
      if (prevProposalItem) {
        setCurrentQuotingItem({ rfqItem: prevRfqItem, proposalItem: prevProposalItem });
        setCurrentItemIndex(prevIndex);
      }
    }
  };

  const handleFinishQuoting = () => {
    setShowItemQuoteModal(false);
    setCurrentQuotingItem(null);
  };

  const updateItem = (itemId: string, updates: Partial<ProposalItem>) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };
        
        // Recalculate totals
        const totalBeforeDiscount = updatedItem.quantity * updatedItem.unitPrice;
        const discountAmount = updatedItem.discountType === 'percentage' 
          ? (totalBeforeDiscount * updatedItem.discountValue / 100)
          : updatedItem.discountValue;
        const totalAfterDiscount = totalBeforeDiscount - discountAmount;
        const vatAmount = totalAfterDiscount * (updatedItem.vatPercentage / 100);
        const totalIncludingVAT = totalAfterDiscount + vatAmount;

        return {
          ...updatedItem,
          totalBeforeDiscount,
          totalAfterDiscount,
          totalIncludingVAT
        };
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.totalBeforeDiscount, 0);
    const totalDiscounts = items.reduce((sum, item) => {
      const discountAmount = item.discountType === 'percentage' 
        ? (item.totalBeforeDiscount * item.discountValue / 100)
        : item.discountValue;
      return sum + discountAmount;
    }, 0);
    const totalVAT = items.reduce((sum, item) => sum + (item.totalIncludingVAT - item.totalAfterDiscount), 0);
    const finalTotal = items.reduce((sum, item) => sum + item.totalIncludingVAT, 0) + (includeShipment ? shipmentCharge : 0);

    return { subtotal, totalDiscounts, totalVAT, finalTotal };
  };

  const handleSaveDraft = () => {
    // Simulate saving as draft
    alert('Proposal saved as draft successfully!');
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleSubmit = () => {
    // Check if at least one item is quoted for partial proposals
    const quotedItems = items.filter(item => item.unitPrice > 0);
    if (quotedItems.length === 0) {
      alert('Please quote at least one item before submitting the proposal.');
      return;
    }
    setShowSubmitModal(true);
  };

  const handleSubmitConfirm = () => {
    setShowSubmitModal(false);
    onSubmit();
  };

  const totals = calculateTotals();
  
  const proposalData = {
    id: `PROP-${Date.now()}`,
    rfqId: rfq.id,
    status: 'draft' as const,
    currency,
    paymentTerms,
    shipmentMethod,
    shipmentCharge,
    includeShipment,
    items,
    subtotal: totals.subtotal,
    totalDiscounts: totals.totalDiscounts,
    totalVAT: totals.totalVAT,
    finalTotal: totals.finalTotal,
    createdDate: new Date().toISOString().split('T')[0],
    quotationValidityDate,
    termsAndConditions,
    additionalBenefits,
    quotationNumber: `QUO-${Date.now()}`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to RFQ Details
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Proposal</h1>
                <h2 className="text-xl text-gray-600 mb-4">{rfq.id} - {rfq.title}</h2>
                <p className="text-sm text-gray-500">{rfq.customer?.businessType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Items List with Quote Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Items & Pricing</h3>
              <div className="text-sm text-gray-600">
                {items.filter(item => item.unitPrice > 0).length} of {items.length} items quoted
              </div>
            </div>
          </div>
          
          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[80px]">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[200px]">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[120px]">Country of Origin</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">Brand</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[120px]">Packaging</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[100px]">Quantity</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[120px]">Unit Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[120px]">Discount</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[80px]">VAT %</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 min-w-[120px]">Total Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[80px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item, index) => {
                  const rfqItem = rfq.items.find(r => r.id === item.rfqItemId);
                  const isQuoted = item.unitPrice > 0;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.sku || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                        <div className="text-xs text-gray-500">{rfqItem?.quantity.toLocaleString()} {rfqItem?.uom}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.origin || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.brand || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.packaging || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">
                        {item.unitPrice > 0 ? `$${item.unitPrice.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">
                        {item.discountValue > 0 ? (
                          item.discountType === 'percentage' 
                            ? `${item.discountValue}%`
                            : `$${item.discountValue.toFixed(2)}`
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.vatPercentage}%</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        {item.totalIncludingVAT > 0 ? `$${item.totalIncludingVAT.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleQuoteItem(rfqItem!)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            isQuoted
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isQuoted ? 'Edit' : 'Quote'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Benefits & Offers</h3>
          <div>
            <textarea
              value={additionalBenefits}
              onChange={(e) => setAdditionalBenefits(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter any additional benefits, trade deals, rebates, or special offers..."
            />
          </div>
        </div>

        {/* Proposal Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <ProposalSummary
            currency={currency}
            onCurrencyChange={setCurrency}
            paymentTerms={paymentTerms}
            onPaymentTermsChange={setPaymentTerms}
            shipmentMethod={shipmentMethod}
            onShipmentMethodChange={setShipmentMethod}
            includeShipment={includeShipment}
            onIncludeShipmentChange={setIncludeShipment}
            shipmentCharge={shipmentCharge}
            onShipmentChargeChange={setShipmentCharge}
            quotationValidityDate={quotationValidityDate}
            onQuotationValidityDateChange={setQuotationValidityDate}
            totals={totals}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
          <div>
            <textarea
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your terms and conditions..."
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Progress: {items.filter(item => item.unitPrice > 0).length} of {items.length} items quoted
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(items.filter(item => item.unitPrice > 0).length / items.length) * 100}%` 
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePreview}
                className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Eye className="w-4 h-4" />
                Preview Quotation
              </button>
              <button
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Send className="w-4 h-4" />
                Submit Proposal
              </button>
            </div>
          </div>
        </div>
      </div>

      {showItemQuoteModal && currentQuotingItem && (
        <ItemQuoteModal
          rfqItem={currentQuotingItem.rfqItem}
          proposalItem={currentQuotingItem.proposalItem}
          itemIndex={currentItemIndex}
          totalItems={rfq.items.length}
          onSave={handleSaveItemQuote}
          onNext={handleNextItem}
          onPrevious={handlePreviousItem}
          onFinish={handleFinishQuoting}
          onClose={() => setShowItemQuoteModal(false)}
        />
      )}

      {showPreviewModal && (
        <QuotationPreviewModal
          rfq={rfq}
          proposal={proposalData}
          onClose={() => setShowPreviewModal(false)}
        />
      )}

      {showSubmitModal && (
        <SubmitConfirmModal
          rfq={rfq}
          proposal={proposalData}
          totals={totals}
          currency={currency}
          onConfirm={handleSubmitConfirm}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}