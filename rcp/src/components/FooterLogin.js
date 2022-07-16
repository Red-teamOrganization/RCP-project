import logo from "../images/logo.png";
import "../pages/Home.css";
function FooterLogin(){
    return(  
    <footer className="footer-b0">
    <img className='footerLogo' width={'80px'} src={logo} alt="" srcset="" />
    <ul className='contactUs'>
         <h2>CONTACT US</h2>
         <div class="flex justify-between">
         <li><a href='/'><i class="fa-brands fa-facebook hover"></i></a></li>
         <li><a href='/'><i class="fa-brands fa-instagram hover"></i></a></li>
         <li><a href='/'><i class="fa-brands fa-twitter hover"></i></a></li>
         </div>
    </ul>
  </footer>
  )
}
export default FooterLogin;