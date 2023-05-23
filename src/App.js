import './App.css';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from './firebase.config';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider , signInWithRedirect  } from "firebase/auth";



function App() {
const FbProvider = new FacebookAuthProvider();
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    
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
        // console.log(error);
        // console.log(error.message);
      })
  };
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setUser({
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false,
        })
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.message);
      })
  };

  const handleFBclick = () => { 
    FacebookAuthProvider(auth, FbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }

  const handleSubmit = (event) => {
      console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      // console.log('submitted successfully');
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
         const newUserInfo = { ...user };
            newUserInfo.success = true;
            newUserInfo.error = '';
          setUser(newUserInfo);
          updateUseName(user.name)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const newUserInfo = { ...user };
            newUserInfo.error = errorCode;
            newUserInfo.success = false;
            setUser(newUserInfo);
  });

    };
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
        const newUserInfo = { ...user };
            newUserInfo.success = true;
            newUserInfo.error = '';
          setUser(newUserInfo);
          console.log('sign is user info ', res.user);
        })
      
        .catch((error) => {
               const errorCode = error.code;
          const errorMessage = error.message;
          const newUserInfo = { ...user };
            newUserInfo.error = errorCode;
            newUserInfo.success = false;
            setUser(newUserInfo);
          
        });
    }
            event.preventDefault();
  }

  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
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
  };

  const updateUseName = name => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log('user name updated successfully',);
      })
      .catch((error) => {
        console.log(error);
      });
    
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
        <br />
        <button className='fb-button' onClick={handleFBclick}>Sign in Using Facebook</button>
      </div> <br /><br />

      <div className='form-section'>
      <h1>Our Authentication System</h1>
        <form onSubmit={handleSubmit}>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
          <label htmlFor="newUser">New User Sign up</label><br />
          {
            newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='Your Name' />
          }
          <br />
          <input type="text" onBlur={handleBlur} name="email" placeholder='Your email address' required /><br />
          <input type="password" onBlur={handleBlur} name="password" placeholder='Your Password' required /><br />
          <input type="submit" value={newUser ? 'SignUp' : 'SignIn'} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>Sign {newUser ? 'up' : 'in'} Success</p>
        }
      </div>
    </>
  );
}

export default App;
