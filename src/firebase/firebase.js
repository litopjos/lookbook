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

/*
  firebase.database().ref().set(
      {
          name: 'Lito Pe',
          age: 25,
          isSingle: false,
          location: {
              city: 'Philidelphia',
              country: 'USA'
          }
      }
  )

  
  firebase.database().ref("attributes").set(
    {
            height: 6.5,
            weight: 160

        } 
    ).then(
        ()=>{
            console.log("it worked");
        }
    ).catch(
        (e)=>{
            console.log(`Error: ${e}`);
        }
    );
*/
/*
firebase.database()
    .ref("isSingle")
    .remove()
    .then(
        ()=>{
            console.log('remove worked')
        }
    )
    .catch (
        (e) => console.log(`Error: ${e}.`)
    )
*/

/*
firebase.database()
    .ref()
    .on('value',
        (snapshot)=>{
            const val = snapshot.val();
            console.log(`Name-> ${val.name}`)
        }
    );

*/
/*

console.log("Pushing to database...");
firebase.database()
    .ref("expenses")
    .push(expenses[0])
    .then (
        ()=> console.log("push() succeeded")
    )
    .catch (
        (e)=>console.log("error: ${e}")
    );

    console.log("Pushing to database...");
    firebase.database()
        .ref("expenses")
        .push(expenses[1])
        .then (
            ()=> console.log("push() succeeded")
        )
        .catch (
            (e)=>console.log("error: ${e}")
        );    

    console.log("Pushing to database...");
    firebase.database()
        .ref("expenses")
        .push(expenses[2])
        .then (
            ()=> console.log("push() succeeded")
        )
        .catch (
            (e)=>console.log("error: ${e}")
        );           
        
*/        

/*
console.log("subscribing to the database...");
firebase.database()
    .ref("expenses")
    .on('value',
        (snapshot)=>{
            console.log(snapshot.val());
        }
    );
*/

/*

console.log("subscribing to child_added on root...");
firebase.database()
    .ref("expenses")
    .on('child_added',
        (snapshot)=>{
            console.log(snapshot.val());
        }
    )

*/
/*
console.log("subscribing to child_removed on root ...");
firebase.database()
    .ref("expenses")
    .on('child_removed',
        (snapshot)=>{
            console.log(snapshot.val());
        }
    )
*/

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
