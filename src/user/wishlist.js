import { useState, useEffect } from "react";
import swal from "sweetalert";

const Wishlist = () => {
    let [wishlistitem, updateWishlist] = useState([]);
    
    const [selectedColor, setSelectedColor] = useState([]);
    const handleColorSelect = (index, color) => {
        const colors = [...selectedColor];
        colors[index] = color;
        setSelectedColor(colors);
    };

    const [selectedSize, setSelectedSize] = useState([]);
    const handleSizeSelect = (index, size) => {
        const sizes = [...selectedSize];
        sizes[index] = size;
        setSelectedSize(sizes);
    };

    const getWishlist = () => {
        fetch("http://localhost:2345/wishlist")
            .then(response => response.json())
            .then(wishlistArray => {
                updateWishlist(wishlistArray.reverse());
            })
    }

    useEffect(() => {
        getWishlist();
    }, [1]);

    const addtoCart = async (iteminfo) => {
        iteminfo["qty"] = 1;
        iteminfo.icolor = selectedColor;
        iteminfo.isize = selectedSize;
        let url = "http://localhost:2345/cartlist";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(iteminfo)
        };
        await fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal(iteminfo.iname, "Added in your cart!", "success");
            })
            .catch(err => {
                swal(iteminfo.iname, "Already Exist in your cart!", "error");
            })
            window.location.href = "#/cart";
    }

    const delItem = async (id, name) => {
        let url = "http://localhost:2345/wishlist/" + id;
        let postData = { method: "DELETE" };
        await fetch(url, postData)
            .then(response => response.json())
            .then(emptyres => {
                swal(name, "Removed from your wishlist", "success");
                getWishlist(); //reload
            })
            .catch(err => {
                swal("Error", "While deleting from cart", "error");
            })
    }

    return (
        <div className="container mt-3">
            {wishlistitem.length > 0 ? (
                <section>
                    <div className="row mb-4">
                        <h4 className="text-center">Items in Wishlist : {wishlistitem.length}</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="row">
                                {
                                    wishlistitem.map((item, index) => {
                                        return (
                                            <div className="col-lg-6 mb-3" key={index}>
                                                <div className="shadow p-4">
                                                    <h4 className="text-center text-dark-emphasis">{item.iname}</h4>
                                                    <img src={item.iphoto} height="250" width="100%" />
                                                    <div className="row mt-2">
                                                        <div className="col-lg-6"><i className="fa fa-inr fa-lg"></i> {item.iprice}</div>
                                                        <div className="col-lg-6 text-end">
                                                            {item.iqty > 0 ? `Quantity : ${item.iqty}` : 'No Item'}
                                                        </div>
                                                    </div>
                                                    {item.iqty > 0 ? (
                                                        <section>
                                                            <div className="row mt-2">
                                                                <div className="col-lg-6">
                                                                    <div className="dropdown">
                                                                        <a className="btn btn-light btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Available Sizes
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            {
                                                                                item.isize.map((sizes, index2) => {
                                                                                    return (
                                                                                        <li key={index2} className="ms-2 color add" onClick={() => handleSizeSelect(index, sizes)}>{sizes}</li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <input
                                                                        id={`size-${index}`} // Unique ID for size input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={selectedSize[index] || ''}
                                                                        placeholder="Size"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-lg-6">
                                                                    <div className="dropdown">
                                                                        <a className="btn btn-light btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Available Colors
                                                                        </a>
                                                                        <ul className="dropdown-menu">
                                                                            {
                                                                                item.icolor.map((colors, index3) => {
                                                                                    return (
                                                                                        <li key={index3} className="ms-2 color add" onClick={() => handleColorSelect(index, colors)}> {colors}</li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <input
                                                                        id={`color-${index}`} // Unique ID for color input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={selectedColor[index] || ''}
                                                                        placeholder="Color"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row add mt-2 mb-2">
                                                                <div className="col-lg-6">
                                                                    <i className="fa fa-shopping-cart fa-lg" title="Add item to Cart" onClick={addtoCart.bind(this, item)}></i>
                                                                </div>
                                                                <div className="col-lg-6 text-end">
                                                                    <i className="fa fa-trash fa-lg text-danger" title="Remove from Wishlist" onClick={delItem.bind(this, item.id, item.iname)}></i>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    ) : (
                                                        <section>
                                                            <h3 className="text-center text-danger mt-4 mb-5">Currently Unavailable</h3>
                                                            <div className="row add text-center">
                                                                <i className="fa fa-trash fa-lg text-danger" title="Remove from Wishlist" onClick={delItem.bind(this, item.id, item.iname)}></i>
                                                            </div>
                                                        </section>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                </section>
            ) : (
                <h4 className="text-center text-primary mt-4">No items in your Wishlist!</h4>
            )}
        </div>
    )
}

export default Wishlist;