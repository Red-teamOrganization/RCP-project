import React, { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { toast } from "react-toastify";

export default function Profile(props) {
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  function descriptionFormToggle() {
    setShowDescriptionForm((prev) => !prev);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  async function submitDescriptionChange(e) {
    try {
      e.preventDefault();
      if (description === "") {
        toast.error("you must enter a description");
        return;
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
      toast.success("your description has changed");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <div>
        {!showDescriptionForm && (
          <div>
            {!props.user.user.description ? (
              <div className="bg-red-500 rounded text-white coolFont p-2 mr-3 w-7/12">
                you haven't add description try to add small description about
                how your{" "}
                {props.user.user.userType === "charity"
                  ? "charity contribute in saving wasted food..."
                  : props.user.user.userType === "producer"
                  ? "production of food contribute in market"
                  : "sales of food contribute in market"}{" "}
              </div>
            ) : (
              <div className="bg-emerald-500 rounded text-white coolFont p-2 mr-3 w-7/12">
                {props.user.user.description}
              </div>
            )}
          </div>
        )}
        <button
          className={`${
            showDescriptionForm
              ? "exitButton"
              : "rounded-full bg-emerald-800 p-2 text-white mt-2"
          }`}
          onClick={descriptionFormToggle}
        >
          {showDescriptionForm
            ? "x"
            : props.user.user.description
            ? "Edit Description"
            : "Add Description"}
        </button>
        {showDescriptionForm && (
          <form onSubmit={submitDescriptionChange}>
            <textarea id="charityDescription"  rows="4" cols="50" onChange={(e) => {
                handleDescriptionChange(e);
              }}>
              {props.user.user.description
                ? props.user.user.description
                : "add your description"}
            </textarea>
            <button className="rounded-full bg-emerald-800 p-2 text-white block  mt-2 ">save changes</button>
          </form>
        )}
      </div>
    </div>
  );
}
