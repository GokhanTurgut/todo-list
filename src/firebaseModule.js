import projectModule from "./index.js"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseContainer = (() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCydJ72CM0rPgZRfrtDkL1MhcQFBBbnVPs",
        authDomain: "mytasks-4e27b.firebaseapp.com",
        projectId: "mytasks-4e27b",
        storageBucket: "mytasks-4e27b.appspot.com",
        messagingSenderId: "36200884378",
        appId: "1:36200884378:web:82a65fff4f074404789723",
        measurementId: "G-BHDQRCL3FN"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(app);
    
    let projectsArray;
    window.addEventListener('load', () => {
        projectsArray = projectModule.getProjects();
    })
    const updateProjectsArray = () => {
        projectsArray = projectModule.getProjects();
    }

    let currentUser;
    const getCurrentUser = () => {
        return currentUser;
    }
    
    const googleSignIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            currentUser = result.user;
            getDoc(doc(db, 'users', result.user.uid)).then(doc => {
                if (doc) {
                    projectModule.clearProjects();
                    projectModule.updateProjects(JSON.parse(doc.data().userProjects));
                    updateProjectsArray();
                    projectModule.projectDisplay();
                    projectModule.projectDisplayTasks(projectModule.getProjects()[projectModule.getProjects().length - 1].tasks);
                }
            })
        }).catch((err) => {
            console.error(err);
        });
    }
    
    const googleSignOut = () => {
        signOut(auth).then(() => {
            currentUser = undefined;
            projectModule.clearProjects();
            projectModule.localStorageLoad();
            projectModule.localStorageDisplay();
        }).catch((error) => {
            console.log(error);
        })
    }
    
    const authStateChecker = (() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUser = user;
                userInfoUpdater(currentUser);
                signInShow();
                getDoc(doc(db, 'users', user.uid)).then(doc => {
                    if (doc) {
                        projectModule.clearProjects();
                        projectModule.updateProjects(JSON.parse(doc.data().userProjects));
                        updateProjectsArray();
                        projectModule.projectDisplay();
                        projectModule.projectDisplayTasks(projectModule.getProjects()[projectModule.getProjects().length - 1].tasks);
                    }
                })
                projectModule.localStorageDisabled();
            }
            else {
                currentUser = undefined;
                userInfoUpdater(currentUser);
                signOutShow();
                projectModule.localStorageLoad();
                projectModule.localStorageDisplay();
                projectModule.localStorageActive();
            }
        })
    })()
    
    const dataBaseSet = () => {
        if (currentUser) {
            updateProjectsArray();
            setDoc(doc(db, 'users', currentUser.uid), {userProjects: JSON.stringify(projectsArray)});
        }
    }
    
    const signInGoogleBtn = document.getElementById('userSignIn');
    signInGoogleBtn.addEventListener('click', () => {
        googleSignIn();
    })
    const signOutBtn = document.getElementById('userSignOut');
    signOutBtn.addEventListener('click', () => {
        googleSignOut();
    })
    
    const signInShow = () => {
        signInGoogleBtn.classList.add('displayNone');
        signOutBtn.classList.remove('displayNone');
    }
    
    const signOutShow = () => {
        signInGoogleBtn.classList.remove('displayNone');
        signOutBtn.classList.add('displayNone');
    }
    
    const userInfoUpdater = (user) => {
        const userWelcome = document.getElementById('userWelcome');
        const userImage = document.getElementById('userImage');
        if (user) {
            userWelcome.innerText = `Welcome, ${user.displayName}`;
            userWelcome.classList.remove('displayNone');
            userImage.src = user.photoURL;
            userImage.classList.remove('displayNone');
        }
        else {
            userWelcome.innerText = ``;
            userWelcome.classList.add('displayNone');
            userImage.src = '';
            userImage.classList.add('displayNone');
        }
    }

    return {
        getCurrentUser,
        dataBaseSet,
    }
})();

export default firebaseContainer