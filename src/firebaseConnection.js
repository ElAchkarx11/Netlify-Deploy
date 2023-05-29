import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDRn2acq3r2SQQ_ayOeQPDho1TLZtvi7mg",
  authDomain: "atividade-1-7131a.firebaseapp.com",
  projectId: "atividade-1-7131a",
  storageBucket: "atividade-1-7131a.appspot.com",
  messagingSenderId: "745555519078",
  appId: "1:745555519078:web:847a242b2d36e95708afa7"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)










export { db, auth };