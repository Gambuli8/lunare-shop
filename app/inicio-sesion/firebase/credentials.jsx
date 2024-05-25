import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyArJN0gFa7zXvdUQUSm853kPZdJypuTlY4',
  authDomain: 'lunarejewelry-5799d.firebaseapp.com',
  projectId: 'lunarejewelry-5799d',
  storageBucket: 'lunarejewelry-5799d.appspot.com',
  messagingSenderId: '496114418602',
  appId: '1:496114418602:web:04348a6e38eb4117e961d3',
  measurementId: 'G-LR1M6LVKTP'
}

const appFirebase = initializeApp(firebaseConfig)
export default appFirebase

// export const loginWithGoogle = () => {
//   const googleProvider = new firebase.auth.GoogleAuthProvider()
//   firebase
//     .auth()
//     .signInWithPopup(googleProvider)
//     .then(result => {
//       const user = result.user
//       console.log(user)
//     })
//     .catch(error => {
//       const errorCode = error.code
//       const errorMessage = error.message
//       const email = error.email
//       const credential = error.credential
//       console.log(errorCode, errorMessage, email, credential)
//     })
// }
