import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectTracks = (state: RootState) => state.tracks.tracks;

export const selectUniqueTasks = createSelector(
  [selectTracks, (_: RootState, selectedMonth: number) => selectedMonth, (_: RootState, __: number, selectedYear: number) => selectedYear],
  (tracks, selectedMonth, selectedYear) => {
    const monthTracks = tracks.filter(track => {
      const trackDate = new Date(track.date);
      return trackDate.getMonth() === selectedMonth && trackDate.getFullYear() === selectedYear;
    });
    return [...new Set(monthTracks.map(track => track.task))];
  }
);

export const selectDayTracks = createSelector(
  [
    selectTracks,
    (_: RootState, day: number) => day,
    (_: RootState, _day: number, task: string) => task,
    (_: RootState, _day: number, _task: string, selectedMonth: number) => selectedMonth,
    (_: RootState, _day: number, _task: string, _selectedMonth: number, selectedYear: number) => selectedYear,
  ],
  (tracks, day, task, selectedMonth, selectedYear) => {
    return tracks.filter(track => {
      const trackDate = new Date(track.date);
      return (
        trackDate.getDate() === day &&
        trackDate.getMonth() === selectedMonth &&
        trackDate.getFullYear() === selectedYear &&
        track.task === task
      );
    });
  }
);

export const selectDayTotal = createSelector(
  [
    selectTracks,
    (_: RootState, day: number) => day,
    (_: RootState, _day: number, selectedMonth: number) => selectedMonth,
    (_: RootState, _day: number, _selectedMonth: number, selectedYear: number) => selectedYear,
  ],
  (tracks, day, selectedMonth, selectedYear) => {
    return tracks
      .filter(track => {
        const trackDate = new Date(track.date);
        return (
          trackDate.getDate() === day &&
          trackDate.getMonth() === selectedMonth &&
          trackDate.getFullYear() === selectedYear
        );
      })
      .reduce((total, track) => total + track.hours, 0);
  }
);

export const selectMonthTotal = createSelector(
  [
    selectTracks,
    (_: RootState, selectedMonth: number) => selectedMonth,
    (_: RootState, _selectedMonth: number, selectedYear: number) => selectedYear,
  ],
  (tracks, selectedMonth, selectedYear) => {
    return tracks
      .filter(track => {
        const trackDate = new Date(track.date);
        return trackDate.getMonth() === selectedMonth && trackDate.getFullYear() === selectedYear;
      })
      .reduce((total, track) => total + track.hours, 0);
  }
);

export const selectTaskTotal = createSelector(
  [
    selectTracks,
    (_: RootState, task: string) => task,
    (_: RootState, _task: string, selectedMonth: number) => selectedMonth,
    (_: RootState, _task: string, _selectedMonth: number, selectedYear: number) => selectedYear,
  ],
  (tracks, task, selectedMonth, selectedYear) => {
    return tracks
      .filter(track => {
        const trackDate = new Date(track.date);
        return (
          trackDate.getMonth() === selectedMonth &&
          trackDate.getFullYear() === selectedYear &&
          track.task === task
        );
      })
      .reduce((total, track) => total + track.hours, 0);
  }
);
