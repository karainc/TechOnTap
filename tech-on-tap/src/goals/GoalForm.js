import { useState } from "react";
import { useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, CloseButton } from "react-bootstrap";


 export const GoalForm = ({ handleSaveGoal, toggleGoalForm }) => {
    const [description, setDescription]  = useState("")
    const formRef = useRef()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        handleSaveGoal({ description })

        if (formRef.current) {
            formRef.current.reset()
        }
    }

    return (
        <Form ref={formRef} onSubmit={handleSubmit} className="goal-form">
            <div className="goal-form-close-button"><CloseButton type="button" onClick={toggleGoalForm}></CloseButton></div>
            <Form.Group className="goal-form-group">
                    <Form.Label className="goal-form-label">Goal:</Form.Label>
                    <Form.Control
                        type="textarea"
                        required
                        onChange={event => setDescription(event.target.value)}
                        placeholder="What's your goal?"
                        style={{ height: '80px' }}
                    />
            
                </Form.Group>   
            <Button 
                variant="primary" 
                type="submit"
                bsPrefix="save-goal-button">
                Save Goal
            </Button>
        </Form>
      )
 }
