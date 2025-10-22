import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import type { CardData } from '../types';
import { format } from 'date-fns';
import transactionsData from '../data/transactions.json';

export const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cardData = transactionsData as CardData;
  
  const transaction = cardData.transactions.find(t => t.id === id);
  
  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Transaction Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'M/d/yy, H:mm');
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Status bar spacing */}
      <div className="h-8"></div>
      
      {/* Back button */}
      <div className="px-4 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
        </button>
      </div>
      
      {/* Transaction Summary */}
      <div className="px-4 text-center mb-8">
        <div className="text-5xl font-bold text-gray-900 mb-2">
          {formatAmount(transaction.amount, transaction.type)}
        </div>
        <div className="text-lg text-gray-500 mb-1">
          {transaction.name}
        </div>
        <div className="text-sm text-gray-400">
          {formatDate(transaction.date)}
        </div>
      </div>
      
      {/* Transaction Details Card */}
      <div className="px-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="mb-4">
            <div className="font-semibold text-gray-900 mb-1">
              Status: {transaction.status}
            </div>
            <div className="text-gray-500">
              {transaction.paymentMethod}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-black">Total</span>
              <span className="font-bold text-black">
                {formatAmount(transaction.amount, transaction.type)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacing for mobile */}
      <div className="h-8"></div>
      
      {/* Home indicator */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};
