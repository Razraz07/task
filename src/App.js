import React from 'react'
import HomeScreen from './HomeScreen'
import PostDetail from './PostDetail'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/postDetail" element={<PostDetail/>}/>
    </Routes>
  )
  }
export default App;
