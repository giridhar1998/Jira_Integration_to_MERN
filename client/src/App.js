import React from 'react'
import { Routes, Route } from "react-router-dom";
import JiraComponent from './components/jiraComponent.js'; 
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' Component={JiraComponent} exact />
          </Routes>
        </Container>
      </main>
    </>
  )
}


export default App;
