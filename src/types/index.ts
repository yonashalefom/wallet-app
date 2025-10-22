export interface Transaction {
  id: string;
  type: 'Payment' | 'Credit';
  amount: number;
  name: string;
  description: string;
  date: string; // ISO date string
  pending?: boolean;
  authorizedUser?: string;
  iconColor: string;
  iconName: string;
  cashbackPercentage?: number;
  paymentMethod?: string;
  status: 'Approved' | 'Pending';
}

export interface CardData {
  balance: number;
  limit: number;
  transactions: Transaction[];
}

export interface DailyPointsData {
  points: number;
  formattedPoints: string;
}
