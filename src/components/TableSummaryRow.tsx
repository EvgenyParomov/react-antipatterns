import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectVisibleDays } from '../store/selectors/calendarSelectors';
import { TableSummaryCell } from './TableSummaryCell';
import { TableSummaryAllCell } from './TableSummaryAllCell';
import styles from './TableSummary.module.css';

export const TableSummaryRow: React.FC = () => {
  const visibleDays = useAppSelector(selectVisibleDays);

  return (
    <tr className={styles.summaryRow}>
      <td className={styles.summaryCell}>Total</td>
      {visibleDays.map((day) => (
        <TableSummaryCell
          key={day}
          day={day}
        />
      ))}
      <TableSummaryAllCell />
    </tr>
  );
};
