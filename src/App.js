import './App.css';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from './firebase.config';
import { useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        setUser({
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        })
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      })
  };
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setUser({
          isSignIn: false,
          name: '',
          email: '',
          photo: ''
        })
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      })
  };

  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (user.email && user.password) {
      console.log('submitting')
    }
    event.preventDefault();
  }

  const handleBlur = (event) => {
    console.log(event.target.name, event.target.value);
    let isFieldCheck = true;
    if (event.target.name === 'email') {
        isFieldCheck = /\S+@\S+\.\S+/.test(event.target.value);
    };
    if (event.target.name === 'password') {
       isFieldCheck = /(?=.*[a-zA-Z])(?=.{8,})/.test(event.target.value);
      // must contain Capital and small letter and length should be greater than 8  
    };
    if (isFieldCheck) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  return (
    <>
    <div className="signIn-signOut">
      
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out </button> :
          <button onClick={handleClick}>SignIn with Google </button>
      }

      {
        user.isSignIn && ( 
          <>
          <h2>Welcome, {user.name}</h2>
            <h2>Your Email : {user.email}</h2>
            <h2 className='photo-text'> <img src={user.photo} alt="" /></h2>
          </>
        )
      }
      </div> <br /><br />

      <div className='form-section'>
        <h4>Name: {user.name}</h4>
        <h4>Email: {user.email}</h4>
        <h4> Password : {user.password}</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" onBlur={handleBlur} placeholder='Your Name' />
          <br />
          <input type="text" onBlur={handleBlur} name="email" placeholder='Your email address' required /><br />
          <p>sample : sample@gmail.com</p>
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder='Your Password' required /><br />
          <p>must contain capital letter, small letter, number and length should be greater than 6</p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
