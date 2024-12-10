import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectWeekday } from '../store/selectors/calendarSelectors';
import styles from './TableHead.module.css';

interface TableHeadCellProps {
  day: number;
}

export const TableHeadCell: React.FC<TableHeadCellProps> = ({ day }) => {
  const weekday = useAppSelector((state) => selectWeekday(state, day));
  const isCurrentDay = day === new Date().getDate();

  return (
    <th className={`${styles.headerCell} ${isCurrentDay ? styles.currentDay : ''}`}>
      {weekday}
      <br />
      {day}
    </th>
  );
};
