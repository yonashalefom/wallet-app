import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

/**
 * Format transaction date for display
 * Last 7 days: Display day name ("Yesterday", "Tuesday", "Monday")
 * Older: Display date format "M/D/YY"
 */
export function formatTransactionDate(dateString: string): string {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  if (isThisWeek(date)) {
    return format(date, 'EEEE'); // Full day name (Monday, Tuesday, etc.)
  }
  
  // For older dates, show M/D/YY format
  return format(date, 'M/d/yy');
}
