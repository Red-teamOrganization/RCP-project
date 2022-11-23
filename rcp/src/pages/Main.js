import Producers from "./Producers";
import Sellers from "./Sellers";
import Charities from "./Charities"

function Main() {
  let userData = JSON.parse(localStorage.getItem('user'))
   
  return <div>{userData.user.userType === "producer" ?  <Producers />  : userData.user.userType === "seller" ? <Sellers /> : <Charities  />}</div>;
}

export default Main;
