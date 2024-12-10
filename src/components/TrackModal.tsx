import styles from './TrackModal.module.css';
import { setIsModalOpen, updateFormData, resetForm } from '../store/trackFormSlice';
import { selectFormData, selectSelectedTrack, selectIsModalOpen } from '../store/selectors/trackFormSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTrack, updateTrack } from '../store/tracksSlice';

interface TrackModalProps {
}

export const TrackModal = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectFormData);
  const selectedTrack = useAppSelector(selectSelectedTrack);
  const isOpen = useAppSelector(selectIsModalOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: name === 'hours' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTrack) {
      dispatch(updateTrack({ ...formData, id: selectedTrack.id }));
    } else {
      dispatch(addTrack(formData));
    }
    dispatch(resetForm());
    dispatch(setIsModalOpen(false));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => dispatch(setIsModalOpen(false))}
        >
          ×
        </button>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className={styles.submitButton}>
            {selectedTrack ? 'Update' : 'Add'} Track
          </button>
        </form>
      </div>
    </div>
  );
};
