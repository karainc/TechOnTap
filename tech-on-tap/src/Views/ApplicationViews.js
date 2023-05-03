import { Outlet, Route, Routes, Link } from "react-router-dom"
import { Login } from "../auth/Login"
import { Navbar } from "react-bootstrap"
// import TechOnTap from './TechOnTap';
import Goals from "../goals/Goals"


export const ApplicationViews = () => {
  // Retrieving the user object from local storage
  const localTechOnTapUser = localStorage.getItem("techOnTap_user")
  const techOnTapUserObject = JSON.parse(localTechOnTapUser)

  if (techOnTapUserObject) {
    return (
      <Routes>
        <Route path="/" element={
            <>

            <Navbar />
              <h1>Tech On Tap</h1>
              <div>Where tech</div>
                ...is always on tap
                <Goals />
              <Outlet />
            </>
          }
        />
       
         {/* <Route exact path="goals/:goalId/edit" element={ < GoalEdit/> } />  */}
      </Routes>

    )
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}