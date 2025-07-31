import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '318733215284',
  appId: '1:318733215284:web:4fe2b60c7652ab39758c61',
  measurementId: 'G-YJDF3RFY7M' 
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const loginWithFirebase = async(email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    toast.success('Logged in successfully')
    return user
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const signupWithFirebase = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    await updateProfile(user, {
      displayName: name
    })
    
    toast.success('Account created successfully')
    return user
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    toast.success('Logged out successfully')
  } catch (error) {
    console.log(error)
    toast.error('Error logging out')
  }
}

const provider = new GoogleAuthProvider();

// Configure Google provider (optional - adds additional scopes)
provider.addScope('profile');
provider.addScope('email');

// Method 1: Sign in with Google using popup
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Get additional user info
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken; // Google Access Token
    
    toast.success(`Welcome ${user.displayName}!`);
    return user;
  } catch (error) {
    console.log(error);
    
    // Handle specific error codes
    if (error.code === 'auth/popup-closed-by-user') {
      toast.error('Sign-in cancelled');
    } else if (error.code === 'auth/popup-blocked') {
      toast.error('Popup blocked. Please allow popups for this site');
    } else {
      toast.error('Failed to sign in with Google');
    }
    
    throw error;
  }
}

// Method 2: Sign in with Google using redirect (alternative for mobile)
const loginWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, provider);
    // Note: The page will redirect, so code after this won't execute
  } catch (error) {
    console.log(error);
    toast.error('Failed to initiate Google sign-in');
    throw error;
  }
}

// Handle redirect result (call this on app initialization)
const handleGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      toast.success(`Welcome back ${user.displayName}!`);
      return user;
    }
    return null;
  } catch (error) {
    console.log(error);
    toast.error('Error completing Google sign-in');
    throw error;
  }
}

// Export all functions and auth instance
export { 
  auth, 
  loginWithFirebase, 
  signupWithFirebase, 
  logout, 
  provider,
  loginWithGoogle,
  loginWithGoogleRedirect,
  handleGoogleRedirectResult
}