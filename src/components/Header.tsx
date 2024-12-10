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

export const Header = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  hideWeekends,
  setHideWeekends,
  setIsModalOpen,
  months
}: HeaderProps) => {
  return (
    <div className={styles.header}>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        Add Track
      </button>
      <select
        className={styles.select}
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>{month}</option>
        ))}
      </select>
      <select
        className={styles.select}
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      >
        {Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="hideWeekends"
          className={styles.checkbox}
          checked={hideWeekends}
          onChange={(e) => setHideWeekends(e.target.checked)}
        />
        <label htmlFor="hideWeekends" className={styles.checkboxLabel}>
          Hide Weekends
        </label>
      </div>
    </div>
  );
};
