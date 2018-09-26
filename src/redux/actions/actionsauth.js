/* -----------------------------------------------
FILE: actionsauth.js

DESCRIPTION:
This file exports the action object generators 
pertaining to authtication.

(c) 2018 Joselito Pe 
-------------------------------------------------- */
import {firebase,googleAuthProvider} from "../../firebase/firebase";
import {history} from "../../routes/routes";

import {clearOutfits} from "../../redux/actions/actionsoutfits.js";
import {clearOutfitParts} from "../../redux/actions/actionsoutfitpart.js";
import {loadFootwearAction} from "./actionsfootwear";
import {loadOutfitsAction} from "./actionsoutfits";
import {loadOutfitPartsAction} from "./actionsoutfitpart";

const loadGuestTop = ()=>{
    const topList = [];

    topList.push (
        {
            id: "top_1",
            type: "top",
            imgUrls: 
                [
                    "/images/top/20180925_201907.jpg"             
                ],
            brand: 
                [
                    "not_available"             
                ],
            category: 
                [
                    "t-shirt",
                    "short_sleeves"
                ],
            fabrictype:
                [
                    "cotton"
                ],
            description: "Hunter green graphic T",     
                        
            notes: ""            
        }
    )

    return topList;
}

const loadGuestBottom = ()=>{
    const bottomList = [];

    bottomList.push (
        {
            id: "bottom_1",
            type: "bottom",
            imgUrls: 
                [
                    "/images/bottom/20180925_202052_001.jpg"             
                ],
            brand: 
                [
                    "reebok"             
                ],
            category: 
                [
                    "athletic_shorts",
                ],
            fabrictype:
                [
                    "satin"
                ],
            description: "Cherry red basketball shorts",     
                        
            notes: ""            
        }
    )

    return bottomList;
}

const loadGuestFootwear = ()=>{
    const footwear = [];

    footwear.push (
        {
            id: "footwear_1",
            type: "footwear",
            imgUrls: 
                [
                    "/images/footwear/20180711_044454.jpg"             
                ],
            brand: 
                [
                    "nike"             
                ],
            category: 
                [
                    "sneaker",
                    "low_rise"
                ],
            fabrictype:
                [
                    "nylon"
                ],
            description: "nike cross trainers",     
                        

            notes: ""            
        },

        {
            id: "footwear_2",
            type: "footwear",            
            imgUrls: 
                [
                    "/images/footwear/20180925_201354.jpg"    
                ],
            brand: 
                [
                    "nike"             
                ],
            category: 
                [
                    "sneaker",
                    "low_rise"
                ],    
            fabrictype:
                [
                    "nylon"
                ],
            description: "nike cross trainers",                    

            notes: ""                           
        }        
    )

    return footwear;
}

const loadGuestOutfits = () => {
    const outfits = [];

    outfits.push (
        {
            id: "1",
            category: 
                [
                    "casual"
                ],
            description: "casual outfit",
            imgUrls: 
                [
                    "/images/outfits/20180516_152108.jpg"               
                ], 
            footwearPartIDs:
                [
                    "footwear_1"
                ],

            title: 'formal wear',
            notes: "wore april 2005",

            footwearParts:
                [
                    "footwear_1"
                ]
        }
    )

    outfits.push (
        {
            id: "2",
            category: 
            [
                "casual"
            ],
            description: "casual outfit",
            imgUrls: 
                [
                    "/images/outfits/20180423_122730.jpg"                    
                ],
            footwearPartIDs:
                [
                    "footwear_1"
                ],

            title: 'favorite lineup',
            notes: 'business casual',

            outfitFootwear:
            [
                "footwear_2"
            ]            
            
        }
    )

    outfits.push (
        {
            id: "3",
            category: 
                [
                    "casual",
                    "summer"
                ],
            description: "basketball shorts + graphic T outfit",
            imgUrls: 
                [
                    "/images/outfits/20180925_164452.jpg"               
                ], 
            topPartIDs:
            [
                "top_1"
            ],    
            bottomPartIDs:
            [
                "bottom_1"
            ],                
            footwearPartIDs:
            [
                "footwear_2"
            ],

            title: 'formal wear',
            notes: "wore april 2005",
                       
            footwearParts:
                [
                    "footwear_1"
                ]
        }
    )    

    return outfits
}

export const login = (provider,uid) =>{
//    alert(`ACTION GENERATOR: LOGIN provider:${provider}, uid:${uid}`);
    return {
        type: 'LOGIN',
        provider,
        uid
    }
}

export const logout = ()=>{
 //  alert('ACTION GENERATOR: LOUGOUT');
    return {
        type: 'LOGOUT'
    }
}


export const startLoginAsGuest = () => {
//    alert(`ACTION GENERATOR: Start Login As Guest`);
    return (dispatch) => {
        dispatch(login('guest','guest'));   

        let outfits = loadGuestOutfits();

        // Build the outfit parts array
        let outfit_parts = [];
        let topParts = loadGuestTop();
        let bottomParts = loadGuestBottom();
        let footwear = loadGuestFootwear();

        outfit_parts = topParts.concat(bottomParts,footwear);

        //Load the outfits
        dispatch(loadOutfitsAction(outfits));

        //Load the outfit parts
        dispatch(loadOutfitPartsAction(outfit_parts));        

        history.push('/alloutfits');
    }
}

export const startLogout = (provider) => {
    alert(`AUTH Action Generator: startLogout provider:${provider}`);
    return (dispatch) => {
        switch(provider) {

            case 'guest': 
                // This means the user logged in as 'guest which
                // further means that no authentication mechanism was used.
                dispatch(logout());
                history.push('/');

                // Clear outfits from redux store
                dispatch(clearOutfits()); 

                // Clear outfit parts from redux store
                dispatch(clearOutfitParts()); 
            break;

            case 'google':
                // This means the authentication mechanism was firebase-google.
                //NB Call to 'dispatch(logout())' and redirect to login page will be done by 
                //firebase onAuthStateChanged() handler.
                firebase.auth()
                    .signOut()
                    .catch(
                        (e)=>{
                            alert(e);
                        }
                    )
            break;

        }
        

    }
}

export const startLoginViaGoogle = () => {
//    alert(`AUTH Action Generator: startLoginViaGoogle`);
    return (dispatch)=>{
        return firebase.auth()
            .signInWithPopup(googleAuthProvider)
            .then(
                ()=>{
                    alert(`startLoginViaGoogle() ok`);
                    // NB: Auth login redux action will be dispatched
                    // in firebase onAuthStateChanged() handler.
                }
            )
            .catch(
                (e)=>{
                    alert(e);
                }
            )
    }
}
