import Users from "./Users";
import Charities from "./Charities"

function Main() {
  let userData = JSON.parse(localStorage.getItem('user'))
   
  return <div>{userData.user.userType === "charity"  ?  <Charities />  : <Users/>}</div>;
}

export default Main;
