import { useState, useRef, useEffect } from 'react';

export const useCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hideWeekends, setHideWeekends] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const currentDayRef = useRef<HTMLTableCellElement>(null);

  const getDaysInMonth = () => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  };

  const isWeekend = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const getVisibleDays = () => {
    const days = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);
    return hideWeekends ? days.filter(day => !isWeekend(day)) : days;
  };

  const getWeekday = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  useEffect(() => {
    const today = new Date();
    if (
      today.getMonth() === selectedMonth && 
      today.getFullYear() === selectedYear &&
      currentDayRef.current &&
      tableContainerRef.current
    ) {
      const container = tableContainerRef.current;
      const cell = currentDayRef.current;
      const containerWidth = container.offsetWidth;
      const cellLeft = cell.offsetLeft;
      const cellWidth = cell.offsetWidth;

      container.scrollLeft = cellLeft - (containerWidth / 2) + (cellWidth / 2);
    }
  }, [selectedMonth, selectedYear, hideWeekends]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    hideWeekends,
    setHideWeekends,
    tableContainerRef,
    currentDayRef,
    getDaysInMonth,
    isWeekend,
    getVisibleDays,
    getWeekday,
    months
  };
};
