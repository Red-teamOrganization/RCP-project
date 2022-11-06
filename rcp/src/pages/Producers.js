import React, { useState, useEffect } from "react";
import AddDonation from "../components/AddDonation";
import AddProduct from "../components/AddProduct";
import EditDonation from "../components/EditDonation";
import EditProduct from "../components/EditProduct";
import LoadingComponent from "../components/LoadingComponent";
import UserDonations from "../components/UserDonations";
import UserProducts from "../components/UserProducts";
// import "./producer.css";
function Producers() {
const producer = JSON.parse(localStorage.getItem("user"));
const [showDescriptionForm, setShowDescriptionForm] = useState(false);
const [description, setDescription] = useState("");
const [producerDonations, setProducerDonations] = useState([]);
const [producerProducts,setProducerProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [editImageForm, setEditImageForm] = useState(false);
const [donationFlag, setDonationFlag] = useState(false);
const [productsFlag , setProductsFlag]=useState(false)
const [charities, setCharities] = useState([]);
const [editDonationFormFlag, setEditDonationFormFlag] = useState("");
const [editProductFormFlag, setEditProductFormFlag] = useState("");
const [addDonationFlag ,setAddDonationFlag] = useState(false)
const [addProductFlag ,setAddProductFlag] = useState(false)
const [addProducerDonation, setAddProducerDonation] = useState({
    charityName: "",
    productName: "",
    quantity: 0,
    category: "",
  });
const [editedProducerDonation, setEditedProducerDonation] = useState({
    productName: "",
    quantity: 0,
    category: "",
  });
const [addProducerProduct, setAddProducerProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfProduction:2000,
  });
const [addDonationError, setAddDonationError] = useState(null);
const [deleteDonationError, setDeleteDonationError] = useState(null);
const [editDonationError ,setEditDonationError] = useState(null);
const [addProducerError,setAddProducerError] = useState(null);
const [deleteProductError , setDeleteProductError] = useState(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        let response = await fetch(
          "http://localhost:3000/producerDonations/myDonations",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `bearer ${producer.token}`,
            },
          }
        );
        let json = await response.json();
        setProducerDonations(json.data);

        if (producerDonations.length > 0) {
          setDonationFlag(true);
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
          json.data.filter((c) => c.location === producer.user.location)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchDonations();
    fetchCharities();
    
  }, [producerDonations]);

  useEffect(()=>{
    async function fetchProducerProducts() {
      try {
        let response = await fetch(
          "http://localhost:3000/producedProducts/myproducedProducts",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `bearer ${producer.token}`,
            },
          }
        );
        let json = await response.json();
        setProducerProducts(json.data);
        if (producerProducts.length > 0) {
          setProductsFlag(true);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducerProducts();
  },[producerProducts])

  if (loading) {
    return <LoadingComponent />;
  }

  function descriptionFormToggle() {
    setShowDescriptionForm((prev) => !prev);
  }
  function toggleEditImageForm() {
    setEditImageForm((prev) => !prev);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function toggleEditDonationFormFlag(id) {
    setEditDonationFormFlag(id);
  }
  function toggleEditProductFormFlag(id) {
    setEditProductFormFlag(id);
  }
 

  async function submitDescriptionChange(e) {
    try {
      e.preventDefault();
      let response = await fetch("http://localhost:3000/user/addDescription", {
        method: "POSt",
        body: JSON.stringify({ description }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `bearer ${producer.token}`,
        },
      });
      setLoading(true);
      let data = await response.json();
      producer.user["description"] = data.data.description;

      localStorage.setItem("user", JSON.stringify(producer));
      setShowDescriptionForm(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleImageEdit(e) {
    try {
      let formData = new FormData();
      formData.append("logo", e.target.files[0]);
      let response = await fetch("http://localhost:3000/user/logoUpload", {
        method: "POSt",
        body: formData,
        headers: {
          Authorization: `bearer ${producer.token}`,
        },
      });

      let json = await response.json();

      producer.user["image"] = json.data.image;
      localStorage.setItem("user", JSON.stringify(producer));
      setEditImageForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddDonationChange(e) {
    setAddProducerDonation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleAddProductChange(e) {
    setAddProducerProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  
  function handleEditDonationChange(e) {
    setEditedProducerDonation((prev) => {
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
        addProducerProduct.yearOfProduction < 2000 ||
        addProducerProduct.quantity === 0 ||
        addProducerProduct.productName === "" ||
        addProducerProduct.category === ""
      ) {
        setAddProducerProduct({ ...addProducerProduct });
        setAddProducerError("all fields are required");
        return;
      }
      let response = await fetch(
        "http://localhost:3000/producedProducts/addProducedProduct",
        {
          method: "POSt",
          body: JSON.stringify(addProducerProduct),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${producer.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setAddProducerError(json.message);
        return;
      }
      setAddProducerProduct({
        yearOfProduction: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddProducerError(null)
      setAddProductFlag(false)
    } catch (err) {
      setAddProducerError(err.message);
      setLoading(false);
    }
  }
  async function handleAddProducerDonationSubmit(e) {
    try {
      e.preventDefault();
      if (
        addProducerDonation.charityName === "" ||
        addProducerDonation.quantity === 0 ||
        addProducerDonation.productName === "" ||
        addProducerDonation.category === ""
      ) {
        setAddProducerDonation({ ...addProducerDonation });
        setAddDonationError("all fields are required");
        return;
      }
      let response = await fetch(
        "http://localhost:3000/producerDonations/addProducerDonation",
        {
          method: "POSt",
          body: JSON.stringify(addProducerDonation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${producer.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setAddDonationError("your donation hasn't been added try again later");
        return;
      }
      setAddProducerDonation({
        charityName: "",
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddDonationError(null)
    } catch (err) {
      setAddDonationError(err.message);
      setLoading(false);
    }
  }
  async function deleteProducerDonation(id) {
    try {
      let response = await fetch(
        `http://localhost:3000/producerDonations/deleteDonation/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${producer.token}`,
          },
        }
      );
      let json = await response.json();
      if (!json.apiStatus) {
        setDeleteDonationError(json.message);
        return;
      }
    } catch (err) {
      setDeleteDonationError(err.message);
    }
  }
  async function editProducerDonationSubmit(e,id) {
    try {
      e.preventDefault();
      if (
        
        editedProducerDonation.quantity === 0 ||
        editedProducerDonation.productName === "" ||
        editedProducerDonation.category === ""
      ) {
        setEditedProducerDonation({ ...editedProducerDonation });
        setEditDonationError("all fields are required");
        return;
      }
      let response = await fetch(
        `http://localhost:3000/producerDonations/editDonation/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedProducerDonation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${producer.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setEditDonationError(json.message);
        setEditedProducerDonation({
          productName: "",
          quantity: 0,
          category: "",
        });
        return;
      }
      setEditDonationFormFlag("")
      setEditedProducerDonation({
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
        `http://localhost:3000/producedProducts/deleteProducedProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${producer.token}`,
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
  return (
    <>
      <main className="charityPage">
        <section className="charityProfile">
          <div>
            <h1>welcome {producer.user.name}</h1>
            <img
              src={
                producer.user.image
                  ? "http://localhost:3000/" +
                    producer.user.image.replace("public", "")
                  : ""
              }
              alt=""
            />
            <button onClick={toggleEditImageForm}>edit Image</button>
            {editImageForm && (
              <input
                type="file"
                onChange={(e) => {
                  handleImageEdit(e);
                }}
              />
            )}
          </div>
          <div>
            {!showDescriptionForm && (
              <div>
                {!producer.user.description ? (
                  <div>add description</div>
                ) : (
                  <div>{producer.user.description}</div>
                )}
              </div>
            )}
            <button onClick={descriptionFormToggle}>edit Description</button>
            {showDescriptionForm && (
              <form action="post" onSubmit={submitDescriptionChange}>
                <input
                  type="text"
                  id="charityDescription"
                  placeholder={
                    producer.user.description
                      ? producer.user.description
                      : "add your description"
                  }
                  onChange={(e) => {
                    handleDescriptionChange(e);
                  }}
                />
                <button>save changes</button>
              </form>
            )}
          </div>
          <div>{producer.user.location}</div>
        </section>
        <section>
          <h1>your donations</h1>
          {!donationFlag ? (
            <>
              <div>you have no donations</div>
            </>
          ) : (
            producerDonations.map((donation) => {
              return (
                <div key={donation._id}>
                  <UserDonations 
                  charityName={donation.charityName}
                  quantity={donation.quantity}
                  productName={donation.productName}
                  toggleEditDonationFormFlag={toggleEditDonationFormFlag}
                  donationId={donation._id}
                  deleteDonationError={deleteDonationError}
                  deleteDonation = {deleteProducerDonation}
                  />
                  {donation._id === editDonationFormFlag ? (
                    <EditDonation 
                    editDonationError={editDonationError}
                     handleEditDonationChange={handleEditDonationChange}
                     editedDonation={editedProducerDonation}
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
          addDonation={addProducerDonation}
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
            producerProducts.map((product) => {
              return (
                <div key={product._id}>
                  <UserProducts 
                  quantity={product.quantity}
                  productName={product.productName}
                  year={product.yearOfProduction}
                  category={product.category}
                  toggleEditProductFormFlag={toggleEditProductFormFlag}
                  productId={product._id}
                  deleteError={deleteProductError}
                  deleteProduct = {deleteProducerProduct}
                  />
                  {product._id === editProductFormFlag ? (
                    <EditProduct
                    // editDonationError={editDonationError}
                    //  handleEditDonationChange={handleEditDonationChange}
                    //  editedDonation={editedProducerDonation}
                    //  setEditDonationFormFlag={setEditDonationFormFlag}
                    //  editDonationSubmit={editProducerDonationSubmit}
                    //  donationId={donation._id}
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
          addProduct={addProducerProduct}
          handleAddProductChange={handleAddProductChange}
          error={addProducerError}
          userType={producer.user.userType}
          />}
        </section>
      </main>
    </>
  );
}

export default Producers;
