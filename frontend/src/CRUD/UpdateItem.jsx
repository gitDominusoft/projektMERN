import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom'
const UpdateItem = () => {
   const [item, setItem] = useState({
      itemName: "",
      description: "",
      photo: "",
    });
    const {id} = useParams()
     useEffect(() => {
    const oneitem = async () => {
      await axios.get("http://localhost:5000/readOneItem/"+id)
        .then(res => setItem(res.data))
        .catch(err => console.log("Item not read " + err))
    };
    oneitem()
  }, [id])
    const [showImg, setShowImg] = useState(null)
    const handleChange = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value });
    };
      const handlePhoto = (e) => {
      setItem({ ...item, photo: e.target.files[0] });
      setShowImg(URL.createObjectURL(e.target.files[0]))
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newItem = new FormData()
      Object.entries(item).forEach(([key, value])=>{
        newItem.append(key, value)
      })
      await axios
        .patch("http://localhost:5000/updateOneItem/"+id, newItem)
        .then((res) => nav("/"))
        .catch((err) => console.log("Error " + err));
    };
  return (
    <Container>
      <h1>Update Item Form</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="itemname">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={item.itemName}
            name="itemName"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="photo">
          <Form.Label>Upload photo</Form.Label>
          <Form.Control
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={item.description}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="warning" type="submit">
          Update
        </Button>
      </Form>
      {showImg && 
       <img src={showImg} className="img-fluid"/>
      }
    </Container>
  )
}

export default UpdateItem
