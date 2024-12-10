import styles from './App.module.css';
import { useTracks } from './hooks/useTracks';
import { useCalendar } from './hooks/useCalendar';
import { useTrackForm } from './hooks/useTrackForm';
import { Header } from './components/Header';
import { Table } from './components/Table';
import { TrackModal } from './components/TrackModal';

const App = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    hideWeekends,
    setHideWeekends,
    tableContainerRef,
    currentDayRef,
    getVisibleDays,
    getWeekday,
    months,
  } = useCalendar();

  const {
    getUniqueTasks,
    getDayTotal,
    getDayTracks,
    getMonthTotal,
    getTaskTotal,
    handleDeleteTrack,
    submitTrack
  } = useTracks(selectedMonth, selectedYear);

  const {
    isModalOpen,
    setIsModalOpen,
    selectedTrack,
    setSelectedTrack,
    resetForm,
    formData,
    handleInputChange,
    handleCellClick,
    handleUpdateTrack,
  } = useTrackForm(selectedMonth, selectedYear);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitTrack(formData, selectedTrack);
    resetForm();
  };

  return (
    <div className={styles.container}>
      <Header
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        hideWeekends={hideWeekends}
        setHideWeekends={setHideWeekends}
        setIsModalOpen={setIsModalOpen}
        months={months}
      />

      <Table
        tableContainerRef={tableContainerRef}
        currentDayRef={currentDayRef}
        getVisibleDays={getVisibleDays}
        getWeekday={getWeekday}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        getUniqueTasks={getUniqueTasks}
        getDayTracks={getDayTracks}
        handleCellClick={handleCellClick}
        handleUpdateTrack={handleUpdateTrack}
        handleDeleteTrack={handleDeleteTrack}
        getTaskTotal={getTaskTotal}
        getDayTotal={getDayTotal}
        getMonthTotal={getMonthTotal}
      />

      <TrackModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};

export default App;
