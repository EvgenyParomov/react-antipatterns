import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (selectedCell) {
      setFormData(prev => ({
        ...prev,
        task: selectedCell.task,
        date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedCell.day).padStart(2, '0')}`
      }));
    } else {
      setFormData({
        name: '',
        task: '',
        hours: 0,
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [selectedCell, selectedMonth, selectedYear]);

  const handleCellClick = (day: number, task: string) => {
    setSelectedCell({ day, task });
    setIsModalOpen(true);
  };

  const handleUpdateTrack = (track: Track) => {
    setSelectedTrack(track);
    setFormData({
      name: track.name,
      task: track.task,
      hours: track.hours,
      date: track.date
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours' ? parseFloat(value) || 0 : value
    }));
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setSelectedTrack(null);
    setFormData({
      name: '',
      task: '',
      hours: 0,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return {
    isModalOpen,
    setIsModalOpen,
    selectedCell,
    setSelectedCell,
    selectedTrack,
    setSelectedTrack,
    formData,
    setFormData,
    handleCellClick,
    handleUpdateTrack,
    handleInputChange,
    resetForm
  };
};
