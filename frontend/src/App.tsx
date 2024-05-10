import { useContext, useEffect } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import { AppContext } from './contexts/AppContext';
import AppLayout from './layouts/AppLayout'
import Cookies from "js-cookie";


function App() {
  const { setIsLoggedIn, setUser } = useContext(AppContext);


  useEffect(() => {
    let cookieUser = Cookies.get("user");

    if(cookieUser) {
      setUser(JSON.parse(cookieUser))
      setIsLoggedIn(true)
    }
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <AppLayout />
    </>
  )
}

export default App
