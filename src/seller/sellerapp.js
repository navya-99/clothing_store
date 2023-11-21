import { HashRouter, Routes, Route } from "react-router-dom";
import SellerHeader from "./sellerheader";
import Dashboard from "./dashboard";
import Orders from "./orders";
import ProductList from "./productlist";
import NewProduct from "./newproduct";
import Edititem from "./edititem";

const SellerModule = () => {
    return (
        <HashRouter>
            <SellerHeader />
            <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/newproduct" element={<NewProduct />} />
                <Route exact path="/productlist" element={<ProductList />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/edititem/:itemid" element={<Edititem/>} />
            </Routes>
        </HashRouter>
    )
}

export default SellerModule;