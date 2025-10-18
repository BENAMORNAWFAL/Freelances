"use client";
import React, { SyntheticEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { v4 } from 'uuid';
import { addCategories } from "./Add";
type AddCategorieType ={
  showModal :boolean ,
  setShowModal :Function ,
  setUpdate :Function  ,
  Update :boolean
}

export default function AddCategorie({showModal ,setShowModal ,setUpdate  , Update} :AddCategorieType) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowModal(false);
    const shopDataString = localStorage.getItem("shop");
    const shopData = shopDataString ? JSON.parse(shopDataString) : {};
    const idShop :any= localStorage.getItem("idResto");
    let IdCard=0
    let IndexCard=0
    for (let i = 0; i < shopData.length; i++) {
      const shop = shopData[i];
      if (shop.resto.shopid == idShop) {
        IdCard= shop.id
        IndexCard=i
      }}
    let id=v4()
    let NewCategories =addCategories(id, title  , image  , IndexCard )
    await fetch(`http://localhost:8000/backend/restaurant/${IdCard}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       card: {
            [id]: {...NewCategories}
             }
      }),
    });
    setUpdate(!Update)
  };
  const handleCloseModal = () => setShowModal(false);

  
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Ajouter catégorie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form className="form_main" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            id="image"
            className="inputField"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL de l'image"
            required
          />
        </div>
        <div className="inputContainer">
          <label>Titre</label>
          <input
            id="Title"
            className="inputField"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            required
          />
        </div>
        <Button type="submit">Ajouter</Button>
      </form>
    </Modal.Body>
  </Modal>
  );
}