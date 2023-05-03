import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './Goals.css'
import EditGoal from "./EditGoal";
import { GoalForm } from "./GoalForm";

const Goals = () => {
    const [goals, setGoals] = useState([]) //Holds all goals
    const [filteredGoals, setFilteredGoals] = useState([])
    const [showGoalForm, setShowGoalForm] = useState(false)

    //edit
    const [showEditGoalForm, setShowEditGoalForm] = useState(false)
    const [goalToEdit, setGoalToEdit] = useState(null)

    //USer object from local storage
    const localTechOnTapUser = localStorage.getItem("techOnTap_user")
    const techOnTapUserObject = JSON.parse(localTechOnTapUser)
    const userId = techOnTapUserObject.id

    //Hook to get all goals from database
    useEffect(() => {
        fetchGoals()
    }, [])

    const fetchGoals = () => {//Get all goals
        fetch(`http://localhost:8088/goals?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            const sortedGoals = data.sort((a, b) => new Date(b.date) - new Date(a.date))
            const updatedGoals = sortedGoals.map(goal => ({
                ...goal,
                tags: goal.tags ? goal.tags.map(tag => tag.name) : [],
            }))
            //State updated with new goals
            setGoals(updatedGoals)
            setFilteredGoals(updatedGoals)
        })
    }
    const handleSaveGoal = (goal) => {
        const newGoal = {
            userId: techOnTapUserObject.id,
            description: goal.description,
            dateCompleted: new Date(),
        }

        //Save goal
        fetch("http://localhost:8088/goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGoal),
        })
         .then(() => {
            //fetch updated goals
            fetchGoals()
         })
    }
    //Delete request, removes goal from database
    const handleDeleteGoal = (id) => {
        fetch(`http://localhost:8088/goals/${id}`, {
            method: "DELETE",
        }).then(() => {
            fetchGoals()
        })
    }

    //PUT request to update goal in database
    const handleUpdateGoal = (updatedGoal) => {
        const newGoal = {
            userId: techOnTapUserObject.id,
            description: updatedGoal.description,
            dateCompleted: updatedGoal.dateCompleted,
        }

        //Update goal
    fetch(`http://localhost:8088/goals/${updatedGoal.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
    })
      .then(() => {
        fetchGoals()
      })
    }

    const openEditGoalForm = (goal) => {
        setGoalToEdit(goal)
        setShowEditGoalForm(true)
    }
    
    const closeEditGoalForm = () => {
        setShowEditGoalForm(false)
    }

    const toggleShowGoalForm = () => {
        setShowGoalForm(!showGoalForm)
    }

    //show all goals after clicking 'show all goals' button
    const handleShowAllGoals = () => {
        setFilteredGoals(goals)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    return(
        <Container id="goals">
      <Row>
        <Col lg={{ span: 8, offset: 2 }} className="goal-container">
          <h1 className="main-goal-heading">Goals</h1>
          
          {filteredGoals.map((goal) => (
           <div className="inner-goal" key={goal.id}>
           <div className="d-flex justify-content-between align-items-start">
             <div>
               <h3 className="goal-description">{goal.description}</h3> 
               <span className="goal-date">{formatDate(goal.dateCompleted)}</span>
         
               <p className="goal-synopsis">{goal.synopsis}</p>
             </div>
         
             <div className="d-flex flex-column align-items-end Delete">
               

               <Button
                  bsPrefix="edit-button"
                  variant="warning"
                  onClick={() => openEditGoalForm(goal)}
                >
                  Edit
                </Button>

               <Button
                 bsPrefix="delete-button"
                 variant="danger"
                 onClick={() => handleDeleteGoal(goal.id)}
               >
                 Delete
               </Button>

             </div>
           </div>
         </div>
          ))}

          <div className="goal-form-show-all-buttons">
          <Button variant="primary" onClick={toggleShowGoalForm} bsPrefix="add-new-goal-button">
            + Add new goal
          </Button>
          <span className="divider">|</span>
          <Button
            variant="info"
            onClick={handleShowAllGoals}
            bsPrefix="add-new-goal-button"
          >
            Show All Goals
          </Button>
          
          {showGoalForm && (
            <GoalForm handleSaveGoal={handleSaveGoal}
            toggleShowGoalForm={toggleShowGoalForm}
            />
          )}

          {showEditGoalForm && (
            <EditGoal
              show={showEditGoalForm}
              handleClose={closeEditGoalForm}
              handleUpdateGoal={handleUpdateGoal}
              goal={goalToEdit}
            />
          )}
          </div>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Goals
    