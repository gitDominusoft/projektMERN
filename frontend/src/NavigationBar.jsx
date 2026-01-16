import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
const NavigationBar = () => {
  return (
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">CRUD MERN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="/contact/">Contact</Nav.Link>
            <Nav.Link href="/createItem/">Create</Nav.Link>
            <Nav.Link href="/">Read All</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
