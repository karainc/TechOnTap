import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'

import "./NavBar.css"

const NavBar = () => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("techOnTap_user")

    return (
        <Navbar expand="lg" bg="navbar-background" variant="dark" fixed="top">
            <Navbar.Brand href="#home" bsPrefix="navbar-brand-custom">TechOnTap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#goals" bsPrefix="nav-link-custom">My Goals</Nav.Link>
                    <Nav.Link href="#careers" bsPrefix="nav-link-custom">Explore More</Nav.Link>
                    
                    {isLoggedIn &&
                            <Nav.Link bsPrefix="nav-link-custom" to="/" onClick={() => {
                                localStorage.removeItem("techOnTap_user")
                                navigate("/", { replace: true })
                            }}>Logout</Nav.Link>
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar