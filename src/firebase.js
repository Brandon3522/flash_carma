// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs8RdSmy7ZUGtXs19U9mkIN2htHEkcFJ0",
  authDomain: "flash-carma.firebaseapp.com",
  projectId: "flash-carma",
  storageBucket: "flash-carma.appspot.com",
  messagingSenderId: "523520490614",
  appId: "1:523520490614:web:a927bf2dbe454126d03357"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)

export const auth = getAuth(app);

// Examples in my github repo: react_chakra_firebase_testing - src/home.js

// Each function is contained in a block comment: /* Funcion */

// The use effect function runs automatically when the page is loaded

  // Add study deck to database
  // Database reference: const user_studyDeck_ref = collection(database, 'users', userID, 'study-decks');
  // State: const [studyDeck_name, setStudyDeck_name] = useState('');
 /*  function add_studyDeck() {
    addDoc(user_studyDeck_ref, {
        name: studyDeck_name,
    })
        .then(() => {
            alert('Data Added');
        })
        .catch((err) => {
            alert(err.message);
        });
  }; */

  // Get study name
  // Database reference: const studyDeckName_ref = doc(database, 'users', userID, 'study-decks', studyDeck_ID)
  // State: const [display_studyDeckName, setDislpay_studyDeckName] = useState('');
  /*  useEffect(() => {
    const getStudyDeckName = async () => {
      const data =  await getDoc(studyDeckName_ref);

      const name = data.data().name;

      setDislpay_studyDeckName(name);

    }
    getStudyDeckName();
  }, []) */

  // Get user score
  // Database reference: const user_ref = doc(database, 'users', userID);
  // State: const [user_score, setUsers_score] = useState(0);
 /*  useEffect(() => {
    const getUser_score = async () => {
      const data =  await getDoc(user_ref);

      const score = data.data().score;
      console.log(score)
      setUsers_score(score)

    }
    getUser_score();
  }, []) */


  // Create a flashcard subcollection within a studydeck, and add a flashcard
  // Database reference: In function
  // State: const [flashcard_question, setFlashcard_question] = useState('');
  //        const [flashcard_answer, setFlashcard_answer] = useState('');
  /* const add_flashcard = () => {
    const ref = collection(database, 'users', userID, 'study-decks', 'bVNiowOIVvDtSMffcsCc', 'flashcards');
    addDoc(ref, {
      question: flashcard_question,
      answer: flashcard_answer,
     })
      .then(() => {
          alert('Data Added');
      })
      .catch((err) => {
          alert(err.message);
      });

  } */

  // Retrieve the flashcards under the specified user when called
  // Database reference: const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
  // State: None, console.log info
  /* const getData = () => {
    getDocs(flashcards_ref).then(response => {
      console.log(
        response.docs.map(item => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }; */

  // Get all study decks from user on page load
  // Database reference: const studyDecks_ref = collection(database,'users',userID,'study-decks')
  // State: const [studyDecks, setStudyDecks] = useState([]);
  /* useEffect(() => {
    const getStudyDecks = async () => {
      const data =  await getDocs(studyDecks_ref);

      setStudyDecks(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks();
  }, []) */

  // Retrieve study decks, limit the number of study decks retrieved to 4
  // Database reference: const studyDecks_ref = collection(database,'users',userID,'study-decks')
  // and query located in function
  // State: const [studyDecks_limit, setStudyDecks_limit] = useState([]);
  /* useEffect(() => {
    const q = query(studyDecks_ref, limit(4))
    const getStudyDecks_limit = async () => {
      const data =  await getDocs(q);

      setStudyDecks_limit(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks_limit();
  }, []) */

  // Get all flashcards from study deck on page load
  // Database reference: const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
  // State: const [flashcards, setFlashcards] = useState([]);
  /* useEffect(() => {
    const getFlashcards = async () => {
      const data = await getDocs(flashcards_ref);

      setFlashcards(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    }

    getFlashcards()
  }, []) */


  // Get all users on page load
  /* useEffect(() => {

    // Asynchronous function
    const getUsers = async () => {
      const data = await getDocs(collectionRef);
      //console.log(data);
      setUsers(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    }

    getUsers()
  }, []) */

  // Update user score
  // Database reference: const user_ref = doc(database, 'users', userID);
  // State: const [user_score, setUsers_score] = useState(0);
  /* const updateUserScore = async (value) => {
   const data =  await getDoc(user_ref);

    var score = data.data().score + value;
    console.log(score)
    setUsers_score(score) 

    await updateDoc(user_ref, {
      score: score
    })

    console.log('Score updated');
  } */

  // Delete flashcard
  // Data needed: Study deck doc ID, and flaschard doc ID
  // Database reference: const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
  // State: const [flashcardName, setFlashcardName] = useState('');
  /*const delete_flashcard = async (flashcardName) => {
    try {
      const q = query(flashcards_ref, where('question', '==', flashcardName), limit(1))
      console.log(q)

      const docs = await getDocs(q)
      var doc_id = ''
      docs.forEach((doc) => {
        console.log(doc.data())
        doc_id = doc.id
        console.log(doc_id)
      })

      const flashcard = doc(database, 'users', userID, 'study-decks', studyDeck_ID, 'flashcards', doc_id)

      await deleteDoc(flashcard);

      console.log('Flashcard deleted successfully');
        
    } catch (error) {
      alert(`Deletion unsuccessful: ${error.message}`);
    }
  }*/


  // Delete study deck
  // Data needed: Study deck ID
  // Database reference: const studyDecks_ref = collection(database,'users',userID,'study-decks')
  // State: const [delete_studyDeckName, setDelete_StudyDeckName] = useState('');
  /*const delete_studyDeck = async (delete_studyDeckName) => {
    try {
      const q = query(studyDecks_ref, where('name', '==', delete_studyDeckName), limit(1));
      console.log(q);

      const docs = await getDocs(q);
      var doc_id = ''
      docs.forEach((doc) => {
        doc_id = doc.id
      })

      const studyDeck = doc(database, 'users', userID, 'study-decks', doc_id);

      await deleteDoc(studyDeck);

      console.log('Study Deck deleted successfully');
    } catch (error) {
      alert(`Deletion unsuccessful: ${error.message}`);
    }
  }*/
