import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Moviepage from './pages/Moviepage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Toaster} from "react-hot-toast";
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import AIrecommendations from './pages/AIrecommendations';

const App = () => {

  const {fetchUser, fetchingUser} = useAuthStore();

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (fetchingUser){
    return <p> Loading </p>
  }

  return (
    <div>
      <Toaster/>
      <Navbar />
      {/* <Homepage/> */}
      <Routes>
        <Route path = {"/"} element = {<Homepage/>}/>
        <Route path = {"/movie/:id"} element = {<Moviepage/>}/>
        <Route path = {"/Signin"} element={<SignIn/>}/>
        <Route path = {"/Signup"} element={<SignUp/>}/>
        <Route path = {"/ai-recommendation"} element={<AIrecommendations/>}/>
      </Routes>
    </div>
  );
};

export default App
