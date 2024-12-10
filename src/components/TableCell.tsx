import React from 'react';
import styles from './TableCell.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectDayTracks } from '../store/selectors/tracksSelectors';
import { deleteTrack } from '../store/tracksSlice';
import { setIsModalOpen, setSelectedCell, setSelectedTrack, updateFormData } from '../store/trackFormSlice';
import { selectSelectedMonth, selectSelectedYear } from '../store/selectors/calendarSelectors';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

interface TableCellProps {
  day: number;
  task: string;
  isCurrentDay: boolean;
  currentDayRef: React.RefObject<HTMLTableCellElement>;
}

export const TableCell: React.FC<TableCellProps> = ({
  day,
  task,
  isCurrentDay,
  currentDayRef,
}) => {
  const dispatch = useAppDispatch();
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const selectedYear = useAppSelector(selectSelectedYear);
  const tracks = useAppSelector((state) => 
    selectDayTracks(state, day, task, selectedMonth, selectedYear)
  );

  const handleAddTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelectedCell({ day, task }));
    dispatch(updateFormData({
      name: '',
      task,
      hours: 0,
      date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    }));
    dispatch(setIsModalOpen(true));
  };

  const handleUpdateTrack = (e: React.MouseEvent, track: Track) => {
    e.stopPropagation();
    dispatch(setSelectedTrack(track));
    dispatch(updateFormData({
      name: track.name,
      task: track.task,
      hours: track.hours,
      date: track.date,
    }));
    dispatch(setIsModalOpen(true));
  };

  const handleDeleteTrack = (e: React.MouseEvent, trackId: string) => {
    e.stopPropagation();
    dispatch(deleteTrack(trackId));
  };

  return (
    <td
      ref={isCurrentDay ? currentDayRef : null}
      className={styles.cell}
    >
      <button
        className={styles.addButton}
        onClick={handleAddTrack}
        title="Add new track"
      >
        +
      </button>
      {tracks.map((track) => (
        <div key={track.id} className={styles.track}>
          <span
            className={styles.trackName}
            onClick={(e) => handleUpdateTrack(e, track)}
            title="Click to edit"
          >
            {track.name}
          </span>
          <span className={styles.trackHours}>
            {track.hours}h
          </span>
          <button
            className={styles.deleteButton}
            onClick={(e) => handleDeleteTrack(e, track.id)}
            title="Delete track"
          >
            ×
          </button>
        </div>
      ))}
    </td>
  );
};
