import UserModule from "./user/userapp";
import SellerModule from "./seller/sellerapp";

function App() {
  let sellerid = localStorage.getItem("sid");

  if (sellerid == null)
    return (<UserModule />)
  else
    return (<SellerModule />)
}

export default App;
