import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Login.css"

export const Login = () => {
    const [email, set] = useState()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("techOnTap_user", JSON.stringify({
                        id: user.id
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <div className="login-page">
        <div className="centered-container">
        <Container>
            <Row>
                <Col xs={10} sm={6} lg={4} md={8} className="login-container mx-auto">
                <form onSubmit={handleLogin}>
                    <h1 className="login-heading">Tech On Tap</h1>
                    <h2 className="please">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail" className="sansSerif"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="sign-in-button">
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <section className="link--register">
                <Link to="/register" className="registration-link sansSerif">Not a member yet?</Link>
            </section>
                </Col>
            </Row>
            </Container>
            </div>
            </div>
    )
}