import { Link } from "react-router-dom";

const UserHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-info-subtle sticky-top p-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Welcome <b>@Padiyar_Cloth_Store</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-primary" to="/"><i className="fa fa-home text-dark"></i> Home</Link>
                        </li>
                        <li className="nav-item dropdown ms-4">
                            <Link className="nav-link dropdown-toggle text-primary" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item text-primary" to="/gents"><i className="fa fa-mars"></i> Gents</Link></li>
                                <li><Link className="dropdown-item text-primary" to="/ladies"><i className="fa fa-venus"></i> Ladies</Link></li>
                                <li><Link className="dropdown-item text-primary" to="/kids"><i className="fa fa-child"></i> Kids</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-primary" to="/cart"><i className="fa fa-shopping-cart text-dark"></i> My Cart</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-primary" to="/wishlist"><i className="fa fa-heart text-danger"></i> My Wishlist</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link className="nav-link text-primary" to="/login"><i className="fa fa-sign-in text-dark"></i> Seller Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default UserHeader;