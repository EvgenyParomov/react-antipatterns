import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Track {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
}

interface TracksState {
  tracks: Track[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  status: 'idle',
  error: null,
};

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async () => {
  const response = await fetch('http://localhost:3000/tracks');
  return response.json();
});

export const addTrack = createAsyncThunk('tracks/addTrack', async (track: Omit<Track, 'id'>) => {
  const response = await fetch('http://localhost:3000/tracks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(track),
  });
  return response.json();
});

export const updateTrack = createAsyncThunk('tracks/updateTrack', async (track: Track) => {
  const response = await fetch(`http://localhost:3000/tracks/${track.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(track),
  });
  return response.json();
});

export const deleteTrack = createAsyncThunk('tracks/deleteTrack', async (id: string) => {
  await fetch(`http://localhost:3000/tracks/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<Track[]>) => {
        state.status = 'succeeded';
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addTrack.fulfilled, (state, action: PayloadAction<Track>) => {
        state.tracks.push(action.payload);
      })
      .addCase(updateTrack.fulfilled, (state, action: PayloadAction<Track>) => {
        const index = state.tracks.findIndex(track => track.id === action.payload.id);
        if (index !== -1) {
          state.tracks[index] = action.payload;
        }
      })
      .addCase(deleteTrack.fulfilled, (state, action: PayloadAction<string>) => {
        state.tracks = state.tracks.filter(track => track.id !== action.payload);
      });
  },
});

export default tracksSlice.reducer;
