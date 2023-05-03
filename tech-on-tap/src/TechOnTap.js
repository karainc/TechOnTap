import './TechOnTap.css'
import NavBar from './nav/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./Views/ApplicationViews"
import { Login } from './auth/Login'
import { Register } from "./auth/Register"
import { Authorized } from './Views/Authorized'



const TechOnTap= () => {
  return <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
          <Authorized>
            <>
              <NavBar />
              <div className="content-container">
                    <div className="content-container">
                <ApplicationViews />  
              </div>
                </div>
          </>
          </Authorized>
        } />
      </Routes>
  </Router>
}

export default TechOnTap