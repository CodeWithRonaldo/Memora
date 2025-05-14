
import './App.css'
import { Outlet } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
