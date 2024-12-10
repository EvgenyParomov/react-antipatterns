import styles from './TrackModal.module.css';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

interface TrackModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track | null) => void;
  formData: {
    name: string;
    task: string;
    hours: number;
    date: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

export const TrackModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTrack,
  setSelectedTrack,
  formData,
  handleInputChange,
  handleSubmit,
  resetForm
}: TrackModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={() => {
      setIsModalOpen(false);
      setSelectedTrack(null);
      resetForm();
    }}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>{selectedTrack ? 'Edit Track' : 'Add Track'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="task">Task:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={formData.task}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hours">Hours:</label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleInputChange}
              min="0"
              step="0.5"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              {selectedTrack ? 'Update' : 'Add'} Track
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setIsModalOpen(false);
                setSelectedTrack(null);
                resetForm();
              }}
              style={{ backgroundColor: '#6c757d' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
