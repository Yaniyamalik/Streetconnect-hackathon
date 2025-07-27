import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

import StatsCard from '../Common/StatsCard';
import Orders from './Orders';
import Warehouse from './Warehouse';
import SHeader from '../common/SHeader';
import SupplierProductForm from './SupplierProductForm';

const SDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const statsData = [
    {
      title: t('totalOrders'),
      value: '247',
      icon: 'orders',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      title: t('Revenue'),
      value: '₹45,230',
      icon: 'revenue',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: t('Products in Warehouse'),
      value: '20',
      icon: 'products',
      gradient: 'from-pink-400 to-red-500'
    },
    {
      title: t('Customers'),
      value: '276',
      icon: 'customers',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SHeader/>
       
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Orders />
          <SupplierProductForm/>
        </div>
      </main>
    </div>
  );
};

export default SDashboard;