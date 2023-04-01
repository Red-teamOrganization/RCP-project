export default function getHostName() 
{
    if(window.location.hostname === "localhost"){
        return "http://localhost:3000/"
    }else{
        return "https://rcp-q1g3.onrender.com/"
    }
}