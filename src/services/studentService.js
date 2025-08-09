import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const studentsCollection = collection(db, 'students');

export const getStudents = async () => {
  const q = query(studentsCollection, orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addStudent = async (student) => {
  const ref = await addDoc(studentsCollection, student);
  return ref.id;
};

export const updateStudent = async (id, updates) => {
  const ref = doc(db, 'students', id);
  await updateDoc(ref, updates);
};

export const deleteStudent = async (id) => {
  const ref = doc(db, 'students', id);
  await deleteDoc(ref);
};
