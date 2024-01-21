import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDI6KvboWcn_1mE4PSzsVZD0xhu4fqJu-Q',
  authDomain: 'tech-net-b0b34.firebaseapp.com',
  projectId: 'tech-net-b0b34',
  storageBucket: 'tech-net-b0b34.appspot.com',
  messagingSenderId: '615526799712',
  appId: '1:615526799712:web:282abe76a53958791c2605',
  measurementId: 'G-JG933D540M',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
