import {HashRouter, Routes, Route} from "react-router-dom";
import UserHeader from "./userheader";
import Home from "./home";
import Mens from "./category/men";
import Womens from "./category/women";
import Kids from "./category/kids";
import Cart from "./cart";
import Wishlist from "./wishlist";
import Edititem from "./edititem";
import SellerLogin from "./sellerlogin";

const UserModule = () =>{
    return(
        <HashRouter>
            <UserHeader/>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/cart" element={<Cart/>} />
                <Route exact path="/wishlist" element={<Wishlist/>} />
                <Route exact path="/gents" element={<Mens/>} />
                <Route exact path="/ladies" element={<Womens/>} />
                <Route exact path="/kids" element={<Kids/>} />
                <Route exact path="/login" element={<SellerLogin/>} />
                <Route exact path="/edititem/:itemid" element={<Edititem/>} /> 
            </Routes>
        </HashRouter>
    )
}

export default UserModule;