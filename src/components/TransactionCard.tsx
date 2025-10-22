import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types';
import { IconBadge } from './IconBadge';
import { formatTransactionDate } from '../utils/dateUtils';

interface TransactionCardProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ 
  transaction, 
  onClick 
}) => {
  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  const formatDescription = () => {
    let description = transaction.description;
    
    if (transaction.pending) {
      description = `Pending - ${description}`;
    }
    
    if (transaction.authorizedUser) {
      description += ` - ${transaction.authorizedUser}`;
    }
    
    return description;
  };

  return (
    <div 
      className="flex items-center p-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(transaction)}
    >
      <IconBadge 
        iconName={transaction.iconName} 
        iconColor={transaction.iconColor}
        className="mr-4"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {transaction.name}
          </h3>
          <div className="flex items-center">
            <div className="text-right mr-2">
              <div className="font-semibold text-gray-900">
                {formatAmount(transaction.amount, transaction.type)}
              </div>
            </div>
            <FontAwesomeIcon 
              icon={faChevronRight} 
              className="text-gray-400" 
            />
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-500 truncate mb-1">
              {formatDescription()}
            </div>
            <div className="text-xs text-gray-400">
              {formatTransactionDate(transaction.date)}
            </div>
          </div>
          {transaction.cashbackPercentage && (
            <div className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
              {transaction.cashbackPercentage}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
