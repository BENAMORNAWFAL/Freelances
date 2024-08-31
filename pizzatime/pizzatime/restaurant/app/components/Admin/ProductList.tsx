"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import CategoriesList from "./CategoriesList";
import Addresto from "@/app/Page/product/addResto/addresto";
import UpdateRestaurant from "@/app/Page/product/updateResto/UpdateResto";

interface Product {
  id: number;
  resto: [];
  card: [];
  shopid: number;
  Company: string;
  town: string;
  shoptitle: string;
}

interface ProductListProps {
  product: Product[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
  const [UpdateResto, setUpdateResto] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Update, setUpdate] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [showcatList, setshowcatList] = useState(false);
  const handlesubmit = (resto: any) => {
    console.log({ resto });
    localStorage.setItem(
      "card",
      JSON.stringify({ categories: resto.card.categories })
    );
    localStorage.setItem(
      "categories",
      JSON.stringify({ categories: resto.card.categories })
    );
    localStorage.setItem("idResto", JSON.stringify(resto.resto.shopid));
    setshowcatList(true);
  };

  const deleteProducts = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/backend/restaurant/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setProduct(product.filter((product) => product.id !== id));
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/backend/restaurant",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch Products");
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchProducts();
  }, [Update, UpdateResto]);

  const handleClick = () => {
    setShowModal(true); // Ouvrir le modal lorsqu'on clique sur le bouton
  };
  const handleClickUpdate = () => {
    setShowModalUpdate(true); // Ouvrir le modal lorsqu'on clique sur le bouton
  };
  return (
    <div {...props}>
      {!showcatList ? (
        <div>
          <h2> Liste des Restaurants </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Shop ID</th>
                <th>Modifier</th>
                <th>Supprimer</th>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {product.map((value: any) => (
                <tr key={value.id}>
                  <td>{value.resto.Company}</td>
                  <td>{value.resto.shopid}</td>
                  <td>
                    <Button onClick={handleClickUpdate}>
                      modifier
                      <GrUpdate />
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => deleteProducts(value.id)}>
                      <MdDelete />
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => handlesubmit(value)}>
                      List des Categories
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Button onClick={handleClick}>
              <IoMdAdd /> Ajouter restaurant
            </Button>
            {showModalUpdate && (
              <UpdateRestaurant
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                setUpdateResto={setUpdateResto}
                UpdateResto={UpdateResto}
              />
            )}
            {showModal && (
              <Addresto
                showModal={showModal}
                setShowModal={setShowModal}
                setUpdate={setUpdate}
                Update={Update}
              />
            )}
          </table>
        </div>
      ) : (
        <CategoriesList product={product} setshowcatList={setshowcatList} />
      )}
    </div>
  );
};

export default ProductList;
