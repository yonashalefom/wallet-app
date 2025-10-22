/**
 * Generate a random card balance between 0 and the card limit
 */
export function generateRandomBalance(limit: number): number {
  // Generate random balance between 0 and limit
  const randomBalance = Math.random() * limit;
  // Round to 2 decimal places
  return Math.round(randomBalance * 100) / 100;
}
