import type { DailyPointsData } from '../types';

/**
 * Calculate daily points based on the current day of the season
 * Seasons: Spring (Mar 1), Summer (Jun 1), Autumn (Sep 1), Winter (Dec 1)
 */
export function calculateDailyPoints(): DailyPointsData {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Define season start dates
  const seasons = [
    { name: 'Spring', start: new Date(currentYear, 2, 1) }, // March 1
    { name: 'Summer', start: new Date(currentYear, 5, 1) }, // June 1
    { name: 'Autumn', start: new Date(currentYear, 8, 1) }, // September 1
    { name: 'Winter', start: new Date(currentYear, 11, 1) } // December 1
  ];
  
  // Find current season
  let seasonDay = 1;
  
  for (let i = 0; i < seasons.length; i++) {
    const seasonStart = seasons[i].start;
    const nextSeasonStart = i === 3 
      ? new Date(currentYear + 1, 2, 1) // Next Spring
      : seasons[i + 1].start;
    
    if (now >= seasonStart && now < nextSeasonStart) {
      seasonDay = Math.floor((now.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      break;
    }
  }
  
  // Calculate points based on season day
  let points: number;
  
  if (seasonDay === 1) {
    points = 2;
  } else if (seasonDay === 2) {
    points = 3;
  } else {
    // For day N (N≥3): points[N] = points[N-2] × 100% + points[N-1] × 60%
    const pointsArray = [2, 3]; // First two days
    
    for (let day = 3; day <= seasonDay; day++) {
      const newPoints = Math.round(
        pointsArray[day - 3] * 1.0 + // 100% of day before previous
        pointsArray[day - 2] * 0.6    // 60% of previous day
      );
      pointsArray.push(newPoints);
    }
    
    points = pointsArray[seasonDay - 1];
  }
  
  // Format points for display
  const formattedPoints = points >= 1000 ? `${Math.round(points / 1000)}K` : points.toString();
  
  return {
    points,
    formattedPoints
  };
}
