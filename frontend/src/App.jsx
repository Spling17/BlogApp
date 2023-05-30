import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
// import Profile from "./pages/profile/Profile"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import userStore from "./store/useUserStore"
import { Navigate } from "react-router-dom"

function App() {
  const {id} = userStore(state => state.user)
  return (
    <Router>
      <Routes>
        <Route path="/" element={id ? <Home /> : <Navigate replace to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile/:username" element={<Profile />} /> */}
      </Routes>
    </Router>
  );}

export default App
