import React from 'react';
import { 
  Megaphone, 
  Users, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Target,
  Percent,
  Package,
  Tag
} from 'lucide-react';

interface MarketingProps {
  subSection?: string;
}

const Marketing: React.FC<MarketingProps> = ({ subSection = 'promotions' }) => {
  const promotions = [
    {
      id: 1,
      promotionType: 'Percentage Discount',
      productName: 'Premium Bed Linens',
      campaignName: 'Summer Linen Sale',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      status: 'active',
      discount: '25%'
    },
    {
      id: 2,
      promotionType: 'Volume Discount',
      productName: 'All Products',
      campaignName: 'Bulk Order Special',
      startDate: '2024-05-15',
      endDate: '2024-07-15',
      status: 'active',
      discount: '15%'
    },
    {
      id: 3,
      promotionType: 'First Time Buyer',
      productName: 'Coffee Beans',
      campaignName: 'New Customer Welcome',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      status: 'expired',
      discount: '20%'
    }
  ];

  const affiliates = [
    {
      id: 1,
      name: 'Hotel Supply Network',
      email: 'partners@hotelsupply.com',
      commissionRate: '8%',
      totalSales: '$45,600',
      commission: '$3,648',
      status: 'active',
      joinDate: '2024-01-15',
      referrals: 23
    },
    {
      id: 2,
      name: 'Restaurant Partners LLC',
      email: 'affiliate@restpartners.com',
      commissionRate: '10%',
      totalSales: '$32,100',
      commission: '$3,210',
      status: 'active',
      joinDate: '2024-02-08',
      referrals: 18
    },
    {
      id: 3,
      name: 'Hospitality Solutions',
      email: 'team@hospsolutions.com',
      commissionRate: '6%',
      totalSales: '$28,900',
      commission: '$1,734',
      status: 'pending',
      joinDate: '2024-03-12',
      referrals: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPageTitle = () => {
    switch (subSection) {
      case 'promotions':
        return 'Promotions & Deals';
      case 'affiliates':
        return 'Affiliate Marketing';
      default:
        return 'Marketing';
    }
  };

  const getPageDescription = () => {
    switch (subSection) {
      case 'promotions':
        return 'Create and manage promotional campaigns';
      case 'affiliates':
        return 'Manage your affiliate partnerships';
      default:
        return 'Manage your marketing activities';
    }
  };

  const renderPromotions = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-4">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{promotion.campaignName}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {promotion.promotionType}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        <Package className="w-3 h-3 inline mr-1" />
                        {promotion.productName}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                    {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Percent className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Discount</p>
                      <p className="text-sm font-semibold text-gray-900">{promotion.discount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm font-semibold text-gray-900">{promotion.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="text-sm font-semibold text-gray-900">{promotion.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-4">
                <button className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAffiliates = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {affiliates.map((affiliate) => (
          <div key={affiliate.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{affiliate.name}</h4>
                <p className="text-sm text-gray-600">{affiliate.email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Commission Rate</p>
                <p className="text-sm font-semibold text-purple-600">{affiliate.commissionRate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Sales</p>
                <p className="text-sm font-semibold text-gray-900">{affiliate.totalSales}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Commission Earned</p>
                <p className="text-sm font-semibold text-green-600">{affiliate.commission}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Referrals</p>
                <p className="text-sm font-semibold text-gray-900">{affiliate.referrals}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors">
                View
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {affiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                      <div className="text-sm text-gray-500">{affiliate.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-purple-600">{affiliate.commissionRate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{affiliate.totalSales}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">{affiliate.commission}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{affiliate.referrals}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                      {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">View</button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Affiliate Stats */}
      {subSection === 'affiliates' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Affiliates</p>
                <p className="text-2xl font-bold text-gray-900">{affiliates.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Commission Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${affiliates.reduce((sum, affiliate) => sum + parseFloat(affiliate.commission.replace('$', '').replace(',', '')), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Referrals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {affiliates.reduce((sum, affiliate) => sum + affiliate.referrals, 0)}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const getAddButtonText = () => {
    switch (subSection) {
      case 'promotions':
        return 'Create Promotion';
      case 'affiliates':
        return 'Add Affiliate';
      default:
        return 'Add Item';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-600 mt-1">{getPageDescription()}</p>
          <div className="mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full inline-block">
            Premium Feature
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">Marketing ROI: +24%</span>
          </div>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{getAddButtonText()}</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {subSection === 'promotions' && renderPromotions()}
      {subSection === 'affiliates' && renderAffiliates()}
    </div>
  );
};

export default Marketing;