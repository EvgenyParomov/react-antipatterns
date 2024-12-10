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

export const TableRow = ({
  task,
  getVisibleDays,
  getDayTracks,
  handleCellClick,
  handleUpdateTrack,
  handleDeleteTrack,
  getTaskTotal
}: TableRowProps) => {
  return (
    <tr>
      <td>{task}</td>
      {getVisibleDays().map(day => (
        <td
          key={`${day}-${task}`}
          className={styles.cell}
          onClick={() => handleCellClick(day, task)}
        >
          {(() => {
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
                    <div className={styles.trackActions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleUpdateTrack(track)}
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteTrack(track.id)}
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </td>
      ))}
      <td>{getTaskTotal(task)}</td>
    </tr>
  );
};
