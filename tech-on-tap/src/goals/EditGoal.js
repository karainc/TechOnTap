import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap" // a modal is a pop-up window.

const EditGoal = ({ show, handleClose, handleUpdateGoal, goal }) => {
  const [description, setDescription] = useState(goal.description)


  const handleSubmit = (event) => {
    event.preventDefault()
    handleUpdateGoal({ ...goal, description })
    handleClose() 
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title
            bsPrefix="goal-modal-title">
                Edit Goal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="goal-form-group">
            <Form.Label className="goal-form-label">Goal Description:</Form.Label>
            <Form.Control
              type="text"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What's changed?"
            />
          </Form.Group>
          <Button 
            bsPrefix="update-goal-button" 
            type="submit">
            Update Goal
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditGoal