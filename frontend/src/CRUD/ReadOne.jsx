import React ,{ useState, useEffect } from 'react'
import axios from "axios"
import { Container, Row, Col, Button } from "react-bootstrap"
import {useParams, useNavigate} from 'react-router-dom'
const ReadOne = () => {
    const [item, setItem] = useState([])
    const {id} = useParams()
    const nav = useNavigate()
  useEffect(() => {
    const oneitem = async () => {
      await axios.get("http://localhost:5000/readOneItem/"+id)
        .then(res => setItem(res.data))
        .catch(err => console.log("Item not read " + err))
    };
    oneitem()
  }, [id])
  const handleDelete = async(id)=>{
 await axios.get("http://localhost:5000/deleteOneItem/"+id)
        .then(res => nav('/'))
        .catch(err => console.log("Not deleted" + err))
  }
  return (
    <Container>
      <h1>Read one item</h1>
      <Row>
        <Col>
        <h2>{item.itemName}</h2>
        <p>{item.description}</p>
        <Button variant="warning" href={`/updateItem/${item._id}`}>Update</Button>
        <Button variant='danger'onClick={()=>handleDelete(item._id)}>Delete</Button>
        </Col>
        <Col>
        <img src={"http://localhost:5000/images/"+item.photo} className='img-fluid'/>
        </Col>
      </Row>
    </Container>
  )
}

export default ReadOne
