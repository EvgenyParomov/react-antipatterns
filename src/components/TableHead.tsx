import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectVisibleDays } from '../store/selectors/calendarSelectors';
import { TableHeadCell } from './TableHeadCell';
import styles from './TableHead.module.css';

export const TableHead: React.FC = () => {
  const visibleDays = useAppSelector(selectVisibleDays);

  return (
    <thead className={styles.header}>
      <tr>
        <th className={styles.headerCell}>Task</th>
        {visibleDays.map((day) => (
          <TableHeadCell key={day} day={day} />
        ))}
        <th className={styles.headerCell}>Total</th>
      </tr>
    </thead>
  );
};
