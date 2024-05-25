import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyArJN0gFa7zXvdUQUSm853kPZdJypuTlY4',
  authDomain: 'lunarejewelry-5799d.firebaseapp.com',
  projectId: 'lunarejewelry-5799d',
  storageBucket: 'lunarejewelry-5799d.appspot.com',
  messagingSenderId: '496114418602',
  appId: '1:496114418602:web:04348a6e38eb4117e961d3',
  measurementId: 'G-LR1M6LVKTP'
}

export const appFirebase = initializeApp(firebaseConfig)
export const auth = getAuth(appFirebase)
