import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext)

  // If we don't have feedbacks to display
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedbacks Yet</p>
  }

  // Show a loading spinner befoer the feedbacks get loaded from the json server
  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList

// framer-motion is used here to make some fade motion on feedbacks
