import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
  selectedMonth: number;
  selectedYear: number;
  hideWeekends: boolean;
}

const initialState: CalendarState = {
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  hideWeekends: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedMonth: (state, action: PayloadAction<number>) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    setHideWeekends: (state, action: PayloadAction<boolean>) => {
      state.hideWeekends = action.payload;
    },
  },
});

export const { setSelectedMonth, setSelectedYear, setHideWeekends } = calendarSlice.actions;
export default calendarSlice.reducer;
