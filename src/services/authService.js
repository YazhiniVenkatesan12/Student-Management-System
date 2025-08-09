import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
