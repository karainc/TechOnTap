import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Container, Col } from "react-bootstrap"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("techOnTap_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <div className="login-page">
        <div className="centered-container">
        <Container>
            <Row>
            <Col xs={10} sm={6} lg={4} md={6} className="login-container mx-auto">
                <form onSubmit={handleRegister}>
                    <h2 className="mb-3 font-weight-normal register-title">Create Your Tech On Tap Account</h2>
                    <fieldset>
                        <label htmlFor="fullName" className="sansSerif"> Full Name </label>
                        <input onChange={updateUser}
                            type="text" id="fullName" className="form-control"
                            placeholder="Enter your name" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email" className="sansSerif"> Email address </label>
                        <input onChange={updateUser}
                            type="email" id="email" className="form-control"
                            placeholder="Email address" required />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="sign-in-button"> Register </button>
                    </fieldset>
                </form>
        </Col>
        </Row>
        </Container>
        </div>
        </div>
    )
}