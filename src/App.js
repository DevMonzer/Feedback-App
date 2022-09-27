import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'

import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
