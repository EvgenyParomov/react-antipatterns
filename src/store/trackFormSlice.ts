import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface TrackFormState {
  isModalOpen: boolean;
  selectedCell: SelectedCell | null;
  selectedTrack: Track | null;
  formData: {
    name: string;
    task: string;
    hours: number;
    date: string;
  };
}

const initialState: TrackFormState = {
  isModalOpen: false,
  selectedCell: null,
  selectedTrack: null,
  formData: {
    name: '',
    task: '',
    hours: 0,
    date: new Date().toISOString().split('T')[0],
  },
};

const trackFormSlice = createSlice({
  name: 'trackForm',
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setSelectedCell: (state, action: PayloadAction<SelectedCell | null>) => {
      state.selectedCell = action.payload;
      if (action.payload) {
        state.formData.task = action.payload.task;
      }
    },
    setSelectedTrack: (state, action: PayloadAction<Track | null>) => {
      state.selectedTrack = action.payload;
      if (action.payload) {
        state.formData = {
          name: action.payload.name,
          task: action.payload.task,
          hours: action.payload.hours,
          date: action.payload.date,
        };
      }
    },
    updateFormData: (state, action: PayloadAction<Partial<TrackFormState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.selectedCell = null;
      state.selectedTrack = null;
      state.formData = initialState.formData;
    },
  },
});

export const {
  setIsModalOpen,
  setSelectedCell,
  setSelectedTrack,
  updateFormData,
  resetForm,
} = trackFormSlice.actions;

export default trackFormSlice.reducer;
