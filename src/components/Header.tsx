import styles from './Header.module.css';
import {
  selectSelectedMonth,
  selectSelectedYear,
  selectHideWeekends,
  selectMonths,
} from '../store/selectors/calendarSelectors';
import {
  setSelectedMonth,
  setSelectedYear,
  setHideWeekends,
} from '../store/calendarSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setIsModalOpen, setSelectedCell } from '../store/trackFormSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);
  const hideWeekends = useAppSelector(selectHideWeekends);
  const months = selectMonths();

  const handleCreateTrack = () => {
    dispatch(setSelectedCell(null));
    dispatch(setIsModalOpen(true));
  };

  return (
    <div className={styles.header}>
      <div className={styles.controls}>
        <select
          value={selectedMonth}
          onChange={(e) => dispatch(setSelectedMonth(Number(e.target.value)))}
          className={styles.select}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => dispatch(setSelectedYear(Number(e.target.value)))}
          className={styles.select}
        >
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={hideWeekends}
            onChange={(e) => dispatch(setHideWeekends(e.target.checked))}
            className={styles.checkbox}
          />
          <span className={styles.checkboxLabel}>Hide weekends</span>
        </label>
      </div>
      <button
        onClick={handleCreateTrack}
        className={styles.button}
      >
        Create Track
      </button>
    </div>
  );
};
