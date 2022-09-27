import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import database from '../db.json'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Fetch the data
  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedbacks
  const fetchFeedback = async () => {
    setFeedback(database.feedback)
    setIsLoading(false)
  }

  // Add a new feedback
  const addFeedback = async (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // Delete the feedback that matches the given id and return the rest
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update a feedback item
  const updateFeedback = async (id, updItem) => {
    // Update the matched feedback
    setFeedback(feedback.map((item) => (item.id === id ? updItem : item)))

    // After we successfully updated the feedback we change the mode to its default meaning the editing will be false
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Set item to be updated or change the mode to the update mode
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
