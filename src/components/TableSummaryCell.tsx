import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectDayTotal } from '../store/selectors/tracksSelectors';
import { selectSelectedMonth, selectSelectedYear } from '../store/selectors/calendarSelectors';
import styles from './TableSummaryCell.module.css';
import classNames from 'classnames';

interface TableSummaryCellProps {
  day: number;
  isSticky?: boolean;
}

export const TableSummaryCell: React.FC<TableSummaryCellProps> = ({ day, isSticky }) => {
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);
  const total = useAppSelector((state) => 
    selectDayTotal(state, day, selectedMonth, selectedYear)
  );
  
  return (
    <td className={classNames(styles.cell, {
      [styles.sticky]: isSticky
    })}>
      {total}h
    </td>
  );
};
