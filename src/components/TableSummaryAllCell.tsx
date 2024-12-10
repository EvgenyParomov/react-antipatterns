import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectMonthTotal } from '../store/selectors/tracksSelectors';
import { selectSelectedMonth, selectSelectedYear } from '../store/selectors/calendarSelectors';
import styles from './TableSummaryCell.module.css';
import classNames from 'classnames';

interface TableSummaryAllCellProps {
}

export const TableSummaryAllCell: React.FC<TableSummaryAllCellProps> = () => {
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);
  const monthTotal = useAppSelector((state) => 
    selectMonthTotal(state, selectedMonth, selectedYear)
  );
  
  return <td className={classNames(styles.cell, styles.sticky)}>{monthTotal}h</td>;
};
