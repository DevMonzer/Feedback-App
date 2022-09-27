import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FeedbackList from './components/FeedbackList'

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
