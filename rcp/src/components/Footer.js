import logo from "../images/logo.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="flex">
      <img className="footerLogo" width={"80px"} src={logo} alt="" />
      <p className="text-white w-5/12 ml-2">a non profit project for helping in food crisis <span className="text-xs block mt-3">  © All rights reserved {new Date().getFullYear()}</span></p>
      </div>
      <ul className="contactUs">
        <h2 className="text-center mb-2">CONTACT US</h2>
        <div className="flex justify-around">
          <li>
            <a href="/">
              <i className="fa-brands fa-facebook hover"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fa-brands fa-instagram hover"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fa-brands fa-twitter hover"></i>
            </a>
          </li>
        </div>
      </ul>
    </footer>
  );
}
export default Footer;
