import React, { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { toast } from 'react-toastify';

export default function Profile(props) {
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editImageForm, setEditImageForm] = useState(false);
 

  function descriptionFormToggle() {
    setShowDescriptionForm((prev) => !prev);
  }
  function toggleEditImageForm() {
    setEditImageForm((prev) => !prev);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  async function submitDescriptionChange(e) {
    try {
     e.preventDefault();
      if(description===""){
        toast.error("you must enter a description")
       return
      }
      
      let response = await fetch("http://localhost:3000/user/addDescription", {
        method: "POSt",
        body: JSON.stringify({ description }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `bearer ${props.user.token}`,
        },
      });
      setLoading(true);
      let data = await response.json();
      props.user.user["description"] = data.data.description;

      localStorage.setItem("user", JSON.stringify(props.user));
      setShowDescriptionForm(false);
      setLoading(false);
      toast.success("your description has changed")
    } catch (err) {
      console.log(err);
      setLoading(false);
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
          Authorization: `bearer ${props.user.token}`,
        },
      });
      setLoading(true);
      let json = await response.json();
      if(!json.apiStatus){
        toast.error("check your connection")
        return
      }
      props.user.user["image"] = json.data.image;
      localStorage.setItem("user", JSON.stringify(props.user));
      setEditImageForm(false);
      setLoading(false);
      toast.success("your logo has been updated")
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  if(loading){
    return <LoadingComponent />
  }
  return (
    <div>
      <div>
        <h1>welcome {props.user.user.name}</h1>
        <img
          src={
            props.user.user.image
              ? "http://localhost:3000/" +
                props.user.user.image.replace("public", "")
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
            {!props.user.user.description ? (
              <div>add description</div>
            ) : (
              <div>{props.user.user.description}</div>
            )}
          </div>
        )}
        <button onClick={descriptionFormToggle}>edit Description</button>
        {showDescriptionForm && (
          <form onSubmit={submitDescriptionChange}>
            <input
              type="text"
              id="charityDescription"
              placeholder={
                props.user.user.description
                  ? props.user.user.description
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
      <div>{props.user.user.location}</div>
    </div>
  );
}
