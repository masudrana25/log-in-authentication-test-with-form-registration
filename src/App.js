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

  const handleSubmit = () => {
    console.log('submitted');
  }

  const handleBlur = (event) => {
    console.log(event.target.name, event.target.value);
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
      </div>

      <div >
        <form onSubmit={handleSubmit}>
          <input type="text" onBlur={handleBlur} name="email" placeholder='Your email address'  required/>
          <input type="password" onBlur={handleBlur} name="password" id="" placeholder='Your Password' required />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
