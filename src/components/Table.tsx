import styles from './Table.module.css';
import { selectUniqueTasks } from '../store/selectors/tracksSelectors';
import { useAppSelector } from '../store/hooks';
import { useTableScroll } from '../hooks/useTableScroll';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { TableSummaryRow } from './TableSummaryRow';
import { selectSelectedMonth, selectSelectedYear } from '../store/selectors/calendarSelectors';

export const Table = () => {
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);
  const uniqueTasks = useAppSelector((state) => selectUniqueTasks(state, selectedMonth, selectedYear));
  const { tableContainerRef, currentDayRef } = useTableScroll(selectedMonth, selectedYear);

  return (
    <div className={styles.tableContainer} ref={tableContainerRef}>
      <table className={styles.table}>
        <TableHead />
        <tbody>
          {uniqueTasks.map((task) => (
            <TableRow
              key={task}
              task={task}
              currentDayRef={currentDayRef}
            />
          ))}
          <TableSummaryRow />
        </tbody>
      </table>
    </div>
  );
};
