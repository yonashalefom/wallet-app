import { format, isToday, isYesterday, differenceInDays } from 'date-fns';

/**
 * Format transaction date for display
 * Last 7 days: Display day name ("Yesterday", "Tuesday", "Monday")
 * Older: Display date format "M/D/YY"
 */
export function formatTransactionDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const daysDiff = differenceInDays(today, date);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  // For the last 7 days (excluding today and yesterday)
  if (daysDiff >= 2 && daysDiff <= 7) {
    return format(date, 'EEEE'); // Full day name (Monday, Tuesday, etc.)
  }
  
  // For older dates, show M/D/YY format
  return format(date, 'M/d/yy');
}
