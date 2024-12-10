import { useState, useEffect, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

export const useTracks = (selectedMonth: number, selectedYear: number) => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const fetchTracks = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/tracks');
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [selectedMonth, selectedYear, fetchTracks]);

  const getUniqueTasks = useCallback(() => {
    const monthTracks = tracks.filter(track => {
      const trackDate = new Date(track.date);
      return trackDate.getMonth() === selectedMonth && trackDate.getFullYear() === selectedYear;
    });
    return [...new Set(monthTracks.map(track => track.task))];
  }, [tracks, selectedMonth, selectedYear]);

  const getDayTracks = useCallback((day: number, task: string) => {
    return tracks.filter(track => {
      const trackDate = new Date(track.date);
      return (
        trackDate.getDate() === day &&
        trackDate.getMonth() === selectedMonth &&
        trackDate.getFullYear() === selectedYear &&
        track.task === task
      );
    });
  }, [tracks, selectedMonth, selectedYear]);

  const getDayTotal = useCallback((day: number) => {
    return tracks
      .filter(track => {
        const trackDate = new Date(track.date);
        return (
          trackDate.getDate() === day &&
          trackDate.getMonth() === selectedMonth &&
          trackDate.getFullYear() === selectedYear
        );
      })
      .reduce((sum, track) => sum + track.hours, 0);
  }, [tracks, selectedMonth, selectedYear]);

  const getTaskTotal = useCallback((task: string) => {
    return tracks
      .filter(track => {
        const trackDate = new Date(track.date);
        return (
          trackDate.getMonth() === selectedMonth &&
          trackDate.getFullYear() === selectedYear &&
          track.task === task
        );
      })
      .reduce((sum, track) => sum + track.hours, 0);
  }, [tracks, selectedMonth, selectedYear]);

  const getMonthTotal = useCallback(() => {
    return tracks
      .filter(track => {
        const trackDate = new Date(track.date);
        return trackDate.getMonth() === selectedMonth && trackDate.getFullYear() === selectedYear;
      })
      .reduce((sum, track) => sum + track.hours, 0);
  }, [tracks, selectedMonth, selectedYear]);

  const handleDeleteTrack = useCallback(async (trackId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tracks/${trackId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchTracks();
        return true;
      } else {
        console.error('Failed to delete track:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error deleting track:', error);
      return false;
    }
  }, [fetchTracks]);

  const submitTrack = useCallback(async (formData: Omit<Track, 'id'>, selectedTrack: Track | null) => {
    try {
      const method = selectedTrack ? 'PUT' : 'POST';
      const url = selectedTrack 
        ? `http://localhost:3000/tracks/${selectedTrack.id}`
        : 'http://localhost:3000/tracks';

      const body = {
        ...formData,
        id: selectedTrack?.id || nanoid()
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      if (response.ok) {
        fetchTracks();
        return true;
      } else {
        console.error('Failed to save track:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error saving track:', error);
      return false;
    }
  }, [fetchTracks]);

  return {
    tracks,
    fetchTracks,
    getUniqueTasks,
    getDayTracks,
    getDayTotal,
    getTaskTotal,
    getMonthTotal,
    handleDeleteTrack,
    submitTrack
  };
};
