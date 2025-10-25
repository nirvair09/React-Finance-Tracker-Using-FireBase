import "./App.css";
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import SignUpSignIn from './components/SignUp-SignIn'
import DashBoard from './components/DashBoard'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpSignIn/>}  />
        <Route path='/dashboard' element={<DashBoard/>} />
      </Routes>
    </Router>
  )
}

export default App