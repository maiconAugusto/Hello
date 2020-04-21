import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC3Ly0YCELrP21da8DHEACXzcuZqyoxUm0",
    authDomain: "hello-e2f78.firebaseapp.com",
    databaseURL: "https://hello-e2f78.firebaseio.com",
    projectId: "hello-e2f78",
    storageBucket: "hello-e2f78.appspot.com",
    messagingSenderId: "144968957916",
    appId: "1:144968957916:web:889bc56853379e60961919"
  };

export default  firebase.initializeApp(firebaseConfig)