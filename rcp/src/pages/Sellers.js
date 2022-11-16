import React, { useState, useEffect } from "react";
import AddDonation from "../components/AddDonation";
import AddProduct from "../components/AddProduct";
import EditDonation from "../components/EditDonation";
import EditProduct from "../components/EditProduct";
import LoadingComponent from "../components/LoadingComponent";
import Profile from "../components/Profile";
import UserDonations from "../components/UserDonations";
import UserProducts from "../components/UserProducts";
import { toast } from 'react-toastify';
import SellerMarketInsights from "../components/SellerMarketInsights";
import "./seller.css";

function Sellers() {
const seller = JSON.parse(localStorage.getItem("user"));

const [sellerDonations, setSellerDonations] = useState([]);
const [sellerProducts,setSellerProducts] = useState([]);

const [loading, setLoading] = useState(true);

const [donationFlag, setDonationFlag] = useState(false);
const [productsFlag , setProductsFlag]=useState(false)
const [addDonationFlag ,setAddDonationFlag] = useState(false)
const [addProductFlag ,setAddProductFlag] = useState(false)
const [editDonationFormFlag, setEditDonationFormFlag] = useState("");
const [editProductFormFlag, setEditProductFormFlag] = useState("");

const [charities, setCharities] = useState([]);

const [addSellerDonation, setAddSellerDonation] = useState({
    charityName: "",
    productName: "",
    quantity: 0,
    category: "",
  });
const [editedSellerDonation, setEditedSellerDonation] = useState({
    productName: "",
    quantity: 0,
    category: "",
  });
const [addSellerProduct, setAddSellerProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfSold:2000,
  });

const [editedSellerProduct, setEditedSellerProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfSold:2000,
  });

const [addDonationError, setAddDonationError] = useState(null);

const [addSellerError,setAddSellerError] = useState(null);
const [deleteProductError , setDeleteProductError] = useState(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        let response = await fetch(
          "http://localhost:3000/sellerDonations/myDonations",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `bearer ${seller.token}`,
            },
          }
        );
        let json = await response.json();
        setSellerDonations(json.data);

        if (sellerDonations.length > 0) {
          setDonationFlag(true);
        }
        if(sellerDonations.length === 0){
          setDonationFlag(false)
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
   
    const fetchCharities = async () => {
      try {
        const response = await fetch("http://localhost:3000/allCharities");
        let json = await response.json();
        setCharities(
          json.data.filter((c) => c.location === seller.user.location)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchDonations();
    fetchCharities();
    
  }, [sellerDonations]);

  useEffect(()=>{
    async function fetchProducerProducts() {
      try {
        let response = await fetch(
          "http://localhost:3000/soldProducts/mysoldProducts",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `bearer ${seller.token}`,
            },
          }
        );
        let json = await response.json();
        setSellerProducts(json.data);
        if (sellerProducts.length > 0) {
          setProductsFlag(true);
        }
        if(sellerProducts.length === 0){
          setProductsFlag(false)
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducerProducts();
  },[sellerProducts])


 

  function toggleEditDonationFormFlag(id) {
    setEditDonationFormFlag(id);
  }
  function toggleEditProductFormFlag(id) {
    setEditProductFormFlag(id);
  }
 

  function handleAddDonationChange(e) {
    setAddSellerDonation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleAddProductChange(e) {
    setAddSellerProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleEditProductChange(e) {
    setEditedSellerProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  
  function handleEditDonationChange(e) {
    setEditedSellerDonation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleAddProducerProductSubmit(e) {
    try {
      e.preventDefault();
      if (
        addSellerProduct.yearOfSold < 2000 ||
        addSellerProduct.quantity === 0 ||
        addSellerProduct.productName === "" ||
        addSellerProduct.category === ""
      ) {
        setAddSellerProduct({ ...addSellerProduct });
        setAddSellerError("all fields are required");
        return;
      }
      let response = await fetch(
        "http://localhost:3000/soldProducts/addSoldProduct",
        {
          method: "POSt",
          body: JSON.stringify(addSellerProduct),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setAddSellerError(json.message);
        return;
      }
      setAddSellerProduct({
        yearOfSold: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddSellerError(null)
      setAddProductFlag(false)
      toast.success("product has been added successfully")
    } catch (err) {
      setAddSellerError(err.message);
      setLoading(false);
    }
  }
  async function handleEditProducerProductSubmit(e,id) {
    try {
      e.preventDefault();
      if (
        editedSellerProduct.yearOfSold < 2000 ||
        editedSellerProduct.quantity === 0 ||
        editedSellerProduct.productName === "" ||
        editedSellerProduct.category === ""
      ) {
        setEditedSellerProduct({ ...editedSellerProduct });
        toast.error("all fields are required")
        return;
      }
      let response = await fetch(
        `http://localhost:3000/soldProducts/editSoldProduct/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedSellerProduct),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        toast.error(json.message)
        return;
      }
      setEditedSellerProduct({
        yearOfSold: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      toast.success("your product has been edited successfully")
      setEditProductFormFlag("")
    } catch (err) {
      toast.error(err)
      setLoading(false);
    }
  }
  async function handleAddProducerDonationSubmit(e) {
    try {
      e.preventDefault();
      if (
        addSellerDonation.charityName === "" ||
        addSellerDonation.quantity === 0 ||
        addSellerDonation.productName === "" ||
        addSellerDonation.category === ""
      ) {
        setAddSellerDonation({ ...addSellerDonation });
        setAddDonationError("all fields are required");
        return;
      }
      let response = await fetch(
        "http://localhost:3000/sellerDonations/addSellerDonation",
        {
          method: "POSt",
          body: JSON.stringify(addSellerDonation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setAddDonationError("your donation hasn't been added try again later");
        return;
      }
      setAddSellerDonation({
        charityName: "",
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddDonationError(null)
      setAddDonationFlag(false)
      toast.success(`your ${json.data.productName} has sent to ${json.data.charityName} successfully`,{
        icon: "🚀"
      })
    } catch (err) {
      setAddDonationError(err.message);
      setLoading(false);
    }
  }
  async function deleteProducerDonation(id) {
    try {
      let response = await fetch(
        `http://localhost:3000/sellerDonations/deleteDonation/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      let json = await response.json();
      if (!json.apiStatus) {
        toast.error(json.message)
        return;
      }
      toast.info("your donation has been removed")
    } catch (err) {
      toast.error(err)
    }
  }
  async function editProducerDonationSubmit(e,id) {
    try {
      e.preventDefault();
      if (
        
        editedSellerDonation.quantity === 0 ||
        editedSellerDonation.productName === "" ||
        editedSellerDonation.category === ""
      ) {
        setEditedSellerDonation({ ...editedSellerDonation });
        toast.error("all fields are required")
        return;
      }
      let response = await fetch(
        `http://localhost:3000/sellerDonations/editDonation/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedSellerDonation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        toast.error(json.message)
        setEditedSellerDonation({
          productName: "",
          quantity: 0,
          category: "",
        });
        return;
      }
      setEditDonationFormFlag("")
      setEditedSellerDonation({
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
    } catch (err) {
     console.log(err)
     setLoading(false)
    }
  }

  async function deleteProducerProduct(id) {
    try {
      let response = await fetch(
        `http://localhost:3000/soldProducts/deleteSoldProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      let json = await response.json();
      if (!json.apiStatus) {
        setDeleteProductError(json.message);
        return;
      }
    } catch (err) {
      setDeleteProductError(err.message);
    }
  }
  
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <main className="sellerPage">
        <section className="sellerProfile">
        <Profile
         user={seller}
         />
        </section>
        <section>
          <h1>your donations</h1>
          {!donationFlag ? (
            <>
              <div>you have no donations</div>
            </>
          ) : (
            sellerDonations.map((donation) => {
              return (
                <div key={donation._id}>
                  <UserDonations 
                  charityName={donation.charityName}
                  quantity={donation.quantity}
                  productName={donation.productName}
                  toggleEditDonationFormFlag={toggleEditDonationFormFlag}
                  donationId={donation._id}
                  deleteDonation = {deleteProducerDonation}
                  />
                  {donation._id === editDonationFormFlag ? (
                    <EditDonation 
                     handleEditDonationChange={handleEditDonationChange}
                     editedDonation={editedSellerDonation}
                     setEditDonationFormFlag={setEditDonationFormFlag}
                     editDonationSubmit={editProducerDonationSubmit}
                     donationId={donation._id}
                     />
                  ) : (
                    <></>
                  )}
                
                </div>
              );
            })
          )}
          <button onClick={()=>setAddDonationFlag(prev=>!prev)}>{addDonationFlag? "X":"add donation"}</button>
         { addDonationFlag && <AddDonation 
          handleAddDonationSubmit={handleAddProducerDonationSubmit} 
          addDonation={addSellerDonation}
          handleAddDonationChange={handleAddDonationChange}
          charities={charities}
          addDonationError={addDonationError}
          />}
        </section>
        <section>
          <h1>your added products</h1>
          {!productsFlag ? (
            <>
              <div>you have no added products</div>
            </>
          ) : (
            sellerProducts.map((product) => {
              return (
                <div key={product._id}>
                  <UserProducts 
                  quantity={product.quantity}
                  productName={product.productName}
                  year={product.yearOfSold}
                  category={product.category}
                  toggleEditProductFormFlag={toggleEditProductFormFlag}
                  productId={product._id}
                  deleteError={deleteProductError}
                  deleteProduct = {deleteProducerProduct}
                  />
                  {product._id === editProductFormFlag ? (
                    <EditProduct
                    handleEditSubmit={handleEditProducerProductSubmit}
                    editedProduct={editedSellerProduct}
                    setEditFormFlag={setEditProductFormFlag}
                    handleEditProductChange={handleEditProductChange}
                    productId={product._id}
                    userType={seller.user.userType}
                     />
                  ) : (
                    <></>
                  )}
                
                </div>
              );
            })
          )}
          <button onClick={()=>{setAddProductFlag((prev)=>!prev)}}>{addProductFlag? "X":"add product"}</button>
       {  addProductFlag && <AddProduct 
          handleAddProductSubmit={handleAddProducerProductSubmit} 
          addProduct={addSellerProduct}
          handleAddProductChange={handleAddProductChange}
          error={addSellerError}
          userType={seller.user.userType}
          />}
        </section>
        <section>
          <SellerMarketInsights />
        </section>
      </main>
    </>
  );
}

export default Sellers;

