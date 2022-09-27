import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback1, setFeedback1] = useState([
    {
      id: 1,
      rating: 10,
      text: 'This is feedback item 1 coming from the backend',
    },
    {
      id: 2,
      rating: 8,
      text: 'This is feedback item 2 coming from the backend',
    },
    {
      text: 'This is feedback item 3 coming from the backend server',
      rating: 10,
      id: 3,
    },
    {
      text: 'This app is somewhat good',
      rating: 9,
      id: 4,
    },
    {
      rating: 10,
      text: "I'm submitting this feedback from the api",
      id: 5,
    },
  ])
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Fetch the data from the json server once the page is loaded
  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedbacks
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Add a new feedback (we make a post request) and we setFeedback using the data that we got out of the server
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback), // we add it in the form of json
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  // Add a new feedback
  const addFeedback1 = async (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Delete a feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      // Delete the feedback that matches the given id and return the rest
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const deleteFeedback1 = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // Delete the feedback that matches the given id and return the rest
      setFeedback1(feedback.filter((item) => item.id !== id))
    }
  }

  // Update a feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem), // we update it in the form of json
    })

    const data = await response.json()

    // N need to spread the item object
    setFeedback(feedback.map((item) => (item.id === id ? data : item)))

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
