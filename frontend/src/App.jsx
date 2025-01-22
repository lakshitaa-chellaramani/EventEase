import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Routes, Route } from 'react-router-dom'
import SignUp from './auth/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Routes>
    <Route path="/signup" element={<SignUp />} />
   </Routes>
   </>
  )
}

export default App
