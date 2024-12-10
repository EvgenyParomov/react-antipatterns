import { useEffect, useRef } from 'react';

interface UseTableScrollResult {
  tableContainerRef: React.RefObject<HTMLDivElement>;
  currentDayRef: React.RefObject<HTMLTableCellElement>;
}

export const useTableScroll = (
  selectedMonth: number,
  selectedYear: number
): UseTableScrollResult => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const currentDayRef = useRef<HTMLTableCellElement>(null);

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

      container.scrollLeft = cellLeft - (containerWidth - cellWidth) / 2;
    }
  }, [selectedMonth, selectedYear]);

  return {
    tableContainerRef,
    currentDayRef,
  };
};
