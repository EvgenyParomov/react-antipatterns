import styles from './Table.module.css';

interface TableHeadProps {
  getVisibleDays: () => number[];
  getWeekday: (day: number) => string;
  currentDayRef: React.RefObject<HTMLTableCellElement>;
  selectedMonth: number;
  selectedYear: number;
}

export const TableHead = ({
  getVisibleDays,
  getWeekday,
  currentDayRef,
  selectedMonth,
  selectedYear
}: TableHeadProps) => {
  return (
    <thead>
      <tr>
        <th>Task</th>
        {getVisibleDays().map(day => {
          const isCurrentDay =
            new Date().getDate() === day &&
            new Date().getMonth() === selectedMonth &&
            new Date().getFullYear() === selectedYear;
          return (
            <th
              key={day}
              ref={isCurrentDay ? currentDayRef : null}
              className={isCurrentDay ? styles.currentDay : undefined}
            >
              <div className={styles.dayHeader}>
                <span>{day}</span>
                <span className={styles.weekday}>{getWeekday(day)}</span>
              </div>
            </th>
          );
        })}
        <th>Total</th>
      </tr>
    </thead>
  );
};
