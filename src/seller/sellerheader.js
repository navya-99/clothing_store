import { Link } from "react-router-dom";

const SellerHeader = () => {

    const logout = () =>{
        localStorage.clear();
        window.location.href = "http://localhost:3000/#/";
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-warning-subtle sticky-top p-4 fs-5">
            <div className="container-fluid">
                <Link className="navbar-brand fs-3" to="/dashboard">InStore <b>@Padiyar_Cloth_Store</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-success" to="/dashboard"><i className="fa fa-home"></i> Dashboard</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-success" to="/productlist"><i className="fa fa-list"></i> Items</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-success" to="/newproduct"><i className="fa fa-plus"></i> Add New</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-success" to="/orders"><i className="fa fa-cart-arrow-down"></i> Orders</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <button className="btn btn-danger" onClick={logout}>Logout <i className="fa fa-sign-out"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default SellerHeader;

