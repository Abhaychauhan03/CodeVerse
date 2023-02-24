import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyByxR1Y0MzrLQsL6f_4T8AtyRh9nVwLAg0",
  authDomain: "codeverse-bdab0.firebaseapp.com",
  databaseURL:
    "https://codeverse-bdab0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "codeverse-bdab0",
  storageBucket: "codeverse-bdab0.appspot.com",
  messagingSenderId: "61824349407",
  appId: "1:61824349407:web:ce232bb3b9cf505943e56a",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
