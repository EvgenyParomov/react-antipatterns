import { memo, useMemo, useCallback } from 'react';
import styles from './TableRow.module.css';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

interface TableRowProps {
  task: string;
  getVisibleDays: () => number[];
  getDayTracks: (day: number, task: string) => Track[];
  handleCellClick: (day: number, task: string) => void;
  handleUpdateTrack: (track: Track) => void;
  handleDeleteTrack: (trackId: string) => void;
  getTaskTotal: (task: string) => number;
}

export const TableRow = memo(({
  task,
  getVisibleDays,
  getDayTracks,
  handleCellClick,
  handleUpdateTrack,
  handleDeleteTrack,
  getTaskTotal
}: TableRowProps) => {
  const renderTrackActions = useCallback((track: Track) => (
    <div className={styles.trackActions}>
      <button 
        onClick={() => handleUpdateTrack(track)}
        className={styles.actionButton}
        title="Edit"
      >
        ✎
      </button>
      <button 
        onClick={() => handleDeleteTrack(track.id)}
        className={`${styles.actionButton} ${styles.deleteButton}`}
        title="Delete"
      >
        ×
      </button>
    </div>
  ), [handleUpdateTrack, handleDeleteTrack]);

  const renderCell = useMemo(() => (day: number) => {
    const dayTracks = getDayTracks(day, task);
    if (dayTracks.length === 0) {
      return <div className={styles.emptyCell}>-</div>;
    }
    return (
      <div className={styles.trackList}>
        {dayTracks.map(track => (
          <div key={track.id} className={styles.track}>
            <div className={styles.trackContent}>
              <span className={styles.trackName}>{track.name}</span>
              <span className={styles.trackHours}>{track.hours}h</span>
            </div>
            {renderTrackActions(track)}
          </div>
        ))}
      </div>
    );
  }, [getDayTracks, task, renderTrackActions]);

  const taskTotal = useMemo(() => getTaskTotal(task), [getTaskTotal, task]);

  return (
    <tr>
      <td>{task}</td>
      {getVisibleDays().map(day => (
        <td
          key={`${day}-${task}`}
          className={styles.cell}
          onClick={() => handleCellClick(day, task)}
        >
          {renderCell(day)}
        </td>
      ))}
      <td>{taskTotal}</td>
    </tr>
  );
});
