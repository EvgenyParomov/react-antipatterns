import { useState, useEffect, useCallback, useMemo } from 'react';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

interface SelectedCell {
  day: number;
  task: string;
}

export const useTrackForm = (selectedMonth: number, selectedYear: number) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    task: '',
    hours: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const defaultFormData = useMemo(() => ({
    name: '',
    task: '',
    hours: 0,
    date: new Date().toISOString().split('T')[0]
  }), []);

  useEffect(() => {
    if (selectedCell) {
      setFormData(prev => ({
        ...prev,
        task: selectedCell.task,
        date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedCell.day).padStart(2, '0')}`
      }));
    } else {
      setFormData(defaultFormData);
    }
  }, [selectedCell, selectedMonth, selectedYear, defaultFormData]);

  const handleCellClick = useCallback((day: number, task: string) => {
    setSelectedCell({ day, task });
    setIsModalOpen(true);
  }, []);

  const handleUpdateTrack = useCallback((track: Track) => {
    setSelectedTrack(track);
    setFormData({
      name: track.name,
      task: track.task,
      hours: track.hours,
      date: track.date
    });
    setIsModalOpen(true);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours' ? Number(value) : value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setSelectedCell(null);
    setSelectedTrack(null);
    setFormData(defaultFormData);
    setIsModalOpen(false);
  }, [defaultFormData]);

  return {
    isModalOpen,
    setIsModalOpen,
    selectedTrack,
    setSelectedTrack,
    formData,
    handleInputChange,
    handleCellClick,
    handleUpdateTrack,
    resetForm
  };
};
