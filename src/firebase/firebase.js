import * as firebase from "firebase";
import moment from "moment";

var config = {
    apiKey: "AIzaSyDyowYRK-jlaJLaVIlyRMN6eLceX5IhL9c",
    authDomain: "lookbook-a87e3.firebaseapp.com",
    databaseURL: "https://lookbook-a87e3.firebaseio.com",
    projectId: "lookbook-a87e3",
    storageBucket: "lookbook-a87e3.appspot.com",
    messagingSenderId: "297679498578"
  };

  
  firebase.initializeApp(config);

  const db =   firebase.database();
  
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {firebase, db as default, googleAuthProvider};


  const expenses = [
    {
        id: '1',
        description: 'gum',
        note: '',
        amount: 195,
        createdAt: 0
    },
    {
        id: '2',
        description: 'rent',
        note: '',
        amount: 109500,
        createdAt: moment(0).subtract(4,"days").valueOf()
    },    
    {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(4,"days").valueOf()
    }    
];



const boohoo = ["Peter","piper","picked"];
const obj = {
    first: 1,
    second: {a: 'lala', b: 5},
    array: [1,2,3]
};
firebase.database()
    .ref("test array")
    .set(obj)
    .then(
        ()=>console.log('set() succeeded')
    )
