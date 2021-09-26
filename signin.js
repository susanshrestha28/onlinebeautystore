const firebaseConfig = {
    apiKey: "AIzaSyBFib0nojUo3-S70Hvr_ahu4zSwBGEi1HA",
    authDomain: "grownepal-np.firebaseapp.com",
    databaseURL: "https://grownepal-np-default-rtdb.firebaseio.com",
    projectId: "grownepal-np",
    storageBucket: "grownepal-np.appspot.com",
    messagingSenderId: "812115960055",
    appId: "1:812115960055:web:cd4ee6af751f193941f3f2",
    measurementId: "G-JBGL9GEM5W"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();  
var showPass = 0;
var toggleSignPage = false;
function showPassword() {
    if(showPass == 0) {
        document.getElementById('password').type = 'text';
        document.getElementById('showPass').innerText = "Hide Password";
        console.log('so')
        showPass = 1;
    }else if(showPass == 1) {
        document.getElementById('password').type = 'password';
        document.getElementById('showPass').innerText = "Show Password";
        console.log('hi')
        showPass = 0;
    }  
}
async function signUp() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var userExist = false;
    if(username.length !== 0 && password.length !==0) {
        const userRef = db.collection('users').doc(username);
        const userDbRef = db.collection('users');
        await userDbRef.get().then(data => {
            for(let i = 0; i < data.docs.length; i++) {
               if(String(data.docs[i].data().username).toLocaleLowerCase() == String(username).toLocaleLowerCase()) {
                    userExist = true;
               }
            }
           //  data.docs.map(doc => {
           //  })
           })
           if(userExist == false) {
               userRef.set({username:username,password:password});
               alert('User registered successfully');
               window.location.href = 'welcomepage.html'
           }else {
               alert('User alreay exist. Try different username/email');
           }
    } else {
        alert('username/email or password shouldnot be empty');
    }
}
async function signIn() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var userExist = false;
    if(username.length !== 0 && password.length !==0) {
        const userRef = db.collection('users').doc(username);
        const userDbRef = db.collection('users');
        await userDbRef.get().then(data => {
            for(let i = 0; i < data.docs.length; i++) {
               if(String(data.docs[i].data().username).toLocaleLowerCase() == String(username).toLocaleLowerCase() && String(data.docs[i].data().password) == String(password)) {
                    userExist = true;
               }
            }
           //  data.docs.map(doc => {
           //  })
           })
           if(userExist == true) {
               alert('Login successfully');
               window.location.href = 'welcomepage.html'
           }else {
               alert('Invalid Username or Password');
           }
    } else {
        alert('username/email or password shouldnot be empty');
    }
}
function signPageShow() { 
 if(toggleSignPage == false) {
    document.getElementById('signPageShow').innerHTML = 'Already have account?';
    document.getElementById('signHeader').innerHTML = 'Sign Up';
    document.getElementById('signup').style.display = 'flex';
    document.getElementById('signin').style.display = 'none';
    toggleSignPage = true;   
 } else if(true) {
    document.getElementById('signPageShow').innerHTML = 'Create account';
    document.getElementById('signHeader').innerHTML = 'Sign In';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('signin').style.display = 'flex';
    toggleSignPage = false;   
 }          
}