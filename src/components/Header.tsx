import { memo, useCallback, useMemo } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  hideWeekends: boolean;
  setHideWeekends: (hide: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  months: string[];
}

export const Header = memo(({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  hideWeekends,
  setHideWeekends,
  setIsModalOpen,
  months
}: HeaderProps) => {
  const handleMonthChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  }, [setSelectedMonth]);

  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  }, [setSelectedYear]);

  const handleWeekendChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHideWeekends(e.target.checked);
  }, [setHideWeekends]);

  const handleAddTrack = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const yearOptions = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i), 
    [selectedYear]
  );

  return (
    <div className={styles.header}>
      <button className={styles.button} onClick={handleAddTrack}>
        Add Track
      </button>
      <select
        className={styles.select}
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>{month}</option>
        ))}
      </select>
      <select
        className={styles.select}
        value={selectedYear}
        onChange={handleYearChange}
      >
        {yearOptions.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="hideWeekends"
          className={styles.checkbox}
          checked={hideWeekends}
          onChange={handleWeekendChange}
        />
        <label htmlFor="hideWeekends" className={styles.checkboxLabel}>
          Hide Weekends
        </label>
      </div>
    </div>
  );
});
