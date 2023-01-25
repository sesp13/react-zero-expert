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
    addNewEmptyNote: (state, { payload: note }) => {
      // payload is a new note
      state.notes.push(note);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload: note }) => {
      // payload is a new note
      state.active = note;
    },
    setNotes: (state, { payload: notes }) => {
      state.notes = notes;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, { payload: note }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id == note.id) {
          return note;
        } else {
          return note;
        }
      });
      state.messageSaved = `${note.title} updated succesfully`;
    },
    setPhotosToActiveNote: (state, { payload: photoUrls }) => {
      state.isSaving = false;

      if (state.active != null) {
        if (state.active.imageUrls) {
          state.active.imageUrls = [...state.active.imageUrls, ...photoUrls];
        } else {
          state.active.imageUrls = photoUrls;
          console.log(state.active);
        }
      }
    },
    deleteNoteById: (state, { payload: id }) => {
      state.isSaving = false;
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== id);
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
