import React, {useState}from 'react'
import { toast } from 'react-toastify';
import ImageUpload from "./ImageUpload";
import LoadingComponent from "../components/LoadingComponent";
import noUserImage from "../images/noUser.png"
import "./profileWave.css"

export default function ProfileWave() {

    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
 
    async function handleImageEdit(e) {
        try {
          let formData = new FormData();
          formData.append("logo", e.target.files[0]);
          let response = await fetch("https://rcp-q1g3.onrender.com/user/logoUpload", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `bearer ${user.token}`,
            },
          });
          setLoading(true);
          let json = await response.json();
          if(!json.apiStatus){
            toast.error("check your connection")
            return
          }
          user.user["image"] = json.data.image;
          localStorage.setItem("user", JSON.stringify(user));
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
    <div className='relative'>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="wave"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#047857"
          fillOpacity="1"
          d="M0,288L30,272C60,256,120,224,180,218.7C240,213,300,235,360,229.3C420,224,480,192,540,165.3C600,139,660,117,720,101.3C780,85,840,75,900,96C960,117,1020,171,1080,208C1140,245,1200,267,1260,250.7C1320,235,1380,181,1410,154.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
        
      </svg>
      <div className='imageWrapper'>
      <img
          className="absolute z-[100] profileImage"
          src={
            user.user.image
              ? "https://rcp-q1g3.onrender.com/" +
                user.user.image.replace("public", "")
              : noUserImage
          }
          alt=""
        />
        <ImageUpload handleImageEdit={handleImageEdit} />
        </div>
        
    </div>
  )
}
