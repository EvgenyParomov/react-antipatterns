import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectSelectedMonth = (state: RootState) => state.calendar.selectedMonth;
export const selectSelectedYear = (state: RootState) => state.calendar.selectedYear;
export const selectHideWeekends = (state: RootState) => state.calendar.hideWeekends;

export const selectDaysInMonth = createSelector(
  [selectSelectedMonth, selectSelectedYear],
  (selectedMonth, selectedYear) => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }
);

export const selectIsWeekend = createSelector(
  [
    (_: RootState, day: number) => day,
    selectSelectedMonth,
    selectSelectedYear,
  ],
  (day, selectedMonth, selectedYear) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return date.getDay() === 0 || date.getDay() === 6;
  }
);

export const selectVisibleDays = createSelector(
  [selectDaysInMonth, selectHideWeekends, selectSelectedMonth, selectSelectedYear],
  (daysInMonth, hideWeekends, selectedMonth, selectedYear) => {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    if (!hideWeekends) return days;
    
    return days.filter(day => {
      const date = new Date(selectedYear, selectedMonth, day);
      return date.getDay() !== 0 && date.getDay() !== 6;
    });
  }
);

export const selectWeekday = createSelector(
  [
    (_: RootState, day: number) => day,
    selectSelectedMonth,
    selectSelectedYear,
  ],
  (day, selectedMonth, selectedYear) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
);

export const selectMonths = () => [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
