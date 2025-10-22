import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Transaction, CardData } from '../types';
import { TransactionCard } from '../components/TransactionCard';
import { calculateDailyPoints } from '../utils/calculateDailyPoints';
import { generateRandomBalance } from '../utils/balanceUtils';
import transactionsData from '../data/transactions.json';

export const TransactionsList: React.FC = () => {
  const navigate = useNavigate();
  const cardData: CardData = {
    balance: generateRandomBalance(transactionsData.limit),
    limit: transactionsData.limit,
    transactions: transactionsData.transactions as Transaction[]
  };
  const dailyPoints = calculateDailyPoints();
  
  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transaction/${transaction.id}`);
  };

  const availableAmount = cardData.limit - cardData.balance;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile container */}
      <div className="max-w-sm mx-auto bg-gray-100 min-h-screen">
        {/* Header spacing */}
        <div className="h-8"></div>
        
        {/* Card Balance, No Payment Due, and Daily Points Blocks */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {/* Left Column - Stacked Cards */}
            <div className="space-y-3">
              {/* Card Balance Block */}
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-sm font-bold text-black mb-1">Card Balance</div>
                <div className="text-2xl font-bold text-black mb-1">
                  ${cardData.balance.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  ${availableAmount.toFixed(2)} Available
                </div>
              </div>
              
              {/* Daily Points Block */}
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="text-sm font-bold text-black mb-1">Daily Points</div>
                <div className="text-sm text-gray-500">
                  {dailyPoints.formattedPoints}
                </div>
              </div>
            </div>
            
            {/* Right Column - No Payment Due Block - Full height */}
            <div className="bg-white rounded-xl p-3 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-black mb-1">No Payment Due</div>
                <div className="text-sm text-gray-500 leading-tight">
                  You've paid your September balance.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-gray-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Latest Transactions */}
        <div className="px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Transactions</h2>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {cardData.transactions.slice(0, 10).map((transaction, index) => (
              <div key={transaction.id}>
                <TransactionCard
                  transaction={transaction}
                  onClick={handleTransactionClick}
                />
                {index < cardData.transactions.slice(0, 10).length - 1 && (
                  <div className="mx-4 border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom spacing for mobile */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};
