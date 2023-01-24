import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      // payload is a new note
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      // payload is a new note
      state.active = payload;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      // Todo show message
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id == payload.id) {
          return payload;
        } else {
          return note;
        }
        // Todo show message
      });
    },
    deleteNoteById: (state, action) => {},
  },
});

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
