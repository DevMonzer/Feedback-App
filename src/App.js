import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes></Routes>
      </div>
    </Router>
  )
}

export default App
