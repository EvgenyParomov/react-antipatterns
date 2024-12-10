import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectTaskTotal } from '../store/selectors/tracksSelectors';
import { selectVisibleDays, selectSelectedMonth, selectSelectedYear } from '../store/selectors/calendarSelectors';
import { TableCell } from './TableCell';
import styles from './TableRow.module.css';

interface TableRowProps {
  task: string;
  currentDayRef: React.RefObject<HTMLTableCellElement>;
}

export const TableRow: React.FC<TableRowProps> = ({
  task,
  currentDayRef,
}) => {
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);
  const visibleDays = useAppSelector(selectVisibleDays);
  const taskTotal = useAppSelector((state) => 
    selectTaskTotal(state, task, selectedMonth, selectedYear)
  );

  return (
    <tr className={styles.row}>
      <td className={styles.taskCell}>{task}</td>
      {visibleDays.map((day) => (
        <TableCell
          key={day}
          day={day}
          task={task}
          isCurrentDay={day === new Date().getDate()}
          currentDayRef={currentDayRef}
      
        />
      ))}
      <td className={styles.totalCell}>{taskTotal}h</td>
    </tr>
  );
};
