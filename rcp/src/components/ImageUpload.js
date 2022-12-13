import React ,{useRef} from 'react'
import styled from 'styled-components';

const Button = styled.button`
  position:absolute;
  z-index:100;
  right:10%;
  top:34%;
  width: 149.5px;
  height: 73px;
  border-bottom-left-radius: 510px;
  border-bottom-right-radius: 510px;
  background: rgba(236, 160, 61, .5);
  color:white;
  font-weight:bold;

`;


export default function ImageUpload(props) {
    const hiddenFileInput = useRef(null);
    
    const handleClick = event => {
      hiddenFileInput.current.click();
    };
  
    return (
      <>
        <Button onClick={handleClick} className="imageUpload" >
          Upload image
        </Button>
        <input type="file"
               ref={hiddenFileInput}
               onChange={(e)=>{props.handleImageEdit(e)}}
               style={{display:'none'}} 
        /> 
      </>
    );
}
