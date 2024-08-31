"use client";
import AddCategorie from "@/app/Page/product/addCategorie/AddCategorie";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Product {
  id: number;
  resto: [];
  card: [];
}
 
interface ProductListProps {
  product: Product[];
  setshowcatList: Function;
}

const CategoriesList: React.FC<ProductListProps> = ({ product, setshowcatList }) => {
  
  const [showModal, setShowModal] = useState(false);
  const [Update,setUpdate] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);

function getCategorie(){ 
  const cat: any = localStorage.getItem("card");
  const card = JSON.parse(cat || "{}");
  console.log("Retrieved card:", Object.keys(card.categories));
  setCategories(Object.values(card.categories) ?? []);
}
  useEffect(() => {
    getCategorie()
  }, [Update]);

  const handleClick = () => {
    setShowModal(true); // Ouvrir le modal lorsqu'on clique sur le bouton
  };

  return (
    <div>
      <h2> Liste des Categories</h2>

      <table className="table">
        <thead>
          <tr>
            <th>title</th>
            <th>image</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any, index: number) => (
            <tr key={index}>
              <td>
                <h5>{categories[index].title}</h5>
              </td>
              <td>
                <img
                  style={{ width: "10%", alignItems: "center" }}
                  src={categories[index].imageUrl.Default.urlDefault}
                  alt={categories[index].title} // Ajout d'un attribut alt pour l'accessibilité
                />
              </td>
              <Button>
                 List des items
                </Button>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleClick}>ajouter categories</Button>
      <Button onClick={() => { setshowcatList(false) }}>Retour</Button>
       {showModal && (
        <AddCategorie
         showModal={showModal}
         setShowModal={setShowModal} 
         setUpdate={setUpdate}
         Update={Update}
         />
      )}
      
    </div>
  );
};

export default CategoriesList;
