import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  startNewNote,
} from '../../../src/store/journal';

describe('Tests on Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new empty note', async () => {
    const uid = 'Test-Uid';
    getState.mockReturnValue({ auth: { uid } });
    const newNote = {
      title: '',
      body: '',
      date: expect.any(Number),
      imageUrls: [],
      id: expect.any(String),
    };

    // Tests
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote));

    // Delete new note from firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = [];
    docs.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });
    await Promise.all(deletePromises)
  });
});
