import { RootState } from '../index';

export const selectIsModalOpen = (state: RootState) => state.trackForm.isModalOpen;
export const selectSelectedCell = (state: RootState) => state.trackForm.selectedCell;
export const selectSelectedTrack = (state: RootState) => state.trackForm.selectedTrack;
export const selectFormData = (state: RootState) => state.trackForm.formData;
