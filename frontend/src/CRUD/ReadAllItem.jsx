import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Container, Table, Button } from "react-bootstrap"
const ReadAllItem = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const allitems = async () => {
      await axios.get("http://localhost:5000/readAllItem/")
        .then(res => setItems(res.data))
        .catch(err => console.log("Items not read " + err))
    };
    allitems()
  }, [])
  return (
    <Container>
      <h1>Read All Items</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Description Item</th>
            <th>Photo Item</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.itemName}</td>
                <td>{item.description}</td>
                <td><img src={"http://localhost:5000/images/"+item.photo} className='img-fluid'/></td>
                <td><Button variant="primary" href={`/readOne/${item._id}`}>Read</Button></td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </Container>
  )
}

export default ReadAllItem
