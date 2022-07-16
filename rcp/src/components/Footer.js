import "../pages/Home.css";
import logo from "../images/logo.png";
function Footer(){
    return(  
    <footer className="footer">
    <img className='footerLogo' width={'80px'} src={logo} alt="" />
    <ul className='contactUs'>
         <h2>CONTACT US</h2>
         <div className="flex justify-between">
         <li><a href='/'><i className="fa-brands fa-facebook hover"></i></a></li>
         <li><a href='/'><i className="fa-brands fa-instagram hover"></i></a></li>
         <li><a href='/'><i className="fa-brands fa-twitter hover"></i></a></li>
         </div>
    </ul>
  </footer>
  )
}
export default Footer;