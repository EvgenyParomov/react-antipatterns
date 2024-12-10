import styles from './Table.module.css';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { TableSummaryRow } from './TableSummaryRow';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

interface TableProps {
  tableContainerRef: React.RefObject<HTMLDivElement>;
  currentDayRef: React.RefObject<HTMLTableCellElement>;
  getVisibleDays: () => number[];
  getWeekday: (day: number) => string;
  selectedMonth: number;
  selectedYear: number;
  getUniqueTasks: () => string[];
  getDayTracks: (day: number, task: string) => Track[];
  handleCellClick: (day: number, task: string) => void;
  handleUpdateTrack: (track: Track) => void;
  handleDeleteTrack: (trackId: string) => void;
  getTaskTotal: (task: string) => number;
  getDayTotal: (day: number) => number;
  getMonthTotal: () => number;
}

export const Table = ({
  tableContainerRef,
  currentDayRef,
  getVisibleDays,
  getWeekday,
  selectedMonth,
  selectedYear,
  getUniqueTasks,
  getDayTracks,
  handleCellClick,
  handleUpdateTrack,
  handleDeleteTrack,
  getTaskTotal,
  getDayTotal,
  getMonthTotal
}: TableProps) => {
  return (
    <div className={styles.tableContainer} ref={tableContainerRef}>
      <table className={styles.table}>
        <TableHead
          getVisibleDays={getVisibleDays}
          getWeekday={getWeekday}
          currentDayRef={currentDayRef}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <tbody>
          {getUniqueTasks().map(task => (
            <TableRow
              key={task}
              task={task}
              getVisibleDays={getVisibleDays}
              getDayTracks={getDayTracks}
              handleCellClick={handleCellClick}
              handleUpdateTrack={handleUpdateTrack}
              handleDeleteTrack={handleDeleteTrack}
              getTaskTotal={getTaskTotal}
            />
          ))}
          <TableSummaryRow
            getVisibleDays={getVisibleDays}
            getDayTotal={getDayTotal}
            getMonthTotal={getMonthTotal}
          />
        </tbody>
      </table>
    </div>
  );
};
