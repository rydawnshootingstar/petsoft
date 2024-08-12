import { Pet } from '@/lib/types';
import { atom } from 'jotai';

export const activePet = atom<Pet | unknown>({ id: '', name: '', ownerName: '', imageUrl: '', age: null, notes: '' });