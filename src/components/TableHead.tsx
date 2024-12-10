import { memo, useMemo } from 'react';
import styles from './Table.module.css';

interface TableHeadProps {
  getVisibleDays: () => number[];
  getWeekday: (day: number) => string;
  currentDayRef: React.RefObject<HTMLTableCellElement>;
  selectedMonth: number;
  selectedYear: number;
}

export const TableHead = memo(({
  getVisibleDays,
  getWeekday,
  currentDayRef,
  selectedMonth,
  selectedYear
}: TableHeadProps) => {
  const currentDate = useMemo(() => new Date(), []);

  const renderDayHeader = useMemo(() => (day: number) => {
    const isCurrentDay =
      currentDate.getDate() === day &&
      currentDate.getMonth() === selectedMonth &&
      currentDate.getFullYear() === selectedYear;

    return (
      <th
        key={day}
        ref={isCurrentDay ? currentDayRef : null}
        className={isCurrentDay ? styles.currentDay : undefined}
      >
        <div>{day}</div>
        <div>{getWeekday(day)}</div>
      </th>
    );
  }, [currentDate, selectedMonth, selectedYear, currentDayRef, getWeekday]);

  return (
    <thead>
      <tr>
        <th>Task</th>
        {getVisibleDays().map(renderDayHeader)}
        <th>Total</th>
      </tr>
    </thead>
  );
});
