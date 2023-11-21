import { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
    let [cartitems, updateCart] = useState([]);

    const getcartItems = () => {
        fetch("http://localhost:2345/cartlist")
            .then(response => response.json())
            .then(cartArray => {
                updateCart(cartArray.reverse());
            })
    }

    useEffect(() => {
        getcartItems();
    }, []);

    const changeQty = async (item, action) => {
        if (action === "A")
            item.qty = item.qty + 1;
        if (action === "B")
            item.qty = item.qty - 1;

        if (item.qty <= 0) {
            delItem(item.id, item.iname);
        } else {
            let url = "http://localhost:2345/cartlist/" + item.id;
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "PUT",
                body: JSON.stringify(item)
            };
            await fetch(url, postData)
                .then(response => response.json())
                .then(serverres => {
                    getcartItems(); //reload the list after update
                })
                .catch(err => {
                    swal("Error", "While updating quantity", "error");
                })

            if (item.qty == item.iqty) {
                toast.error('No More items Available', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000, // Auto close after 3 seconds
                });
            }
        }
    }

    const delItem = async (id, name) => {
        let url = "http://localhost:2345/cartlist/" + id;
        let postData = { method: "DELETE" };
        await fetch(url, postData)
            .then(response => response.json())
            .then(emptyres => {
                swal(name, "Deleted from cart", "success");
                getcartItems(); //reload
            })
            .catch(err => {
                swal("Error", "While deleting from cart", "error");
            })
    }

    let total = 0;

    let [fullname, pickName] = useState("");
    let [mobileno, pickMobile] = useState("");
    let [email, pickEmail] = useState("");
    let [address, pickAddress] = useState("");

    //validation

    let [nameError, updateNameError] = useState("");
    let [mobileError, updateMobileError] = useState("");
    let [emailError, updateEmailError] = useState("");
    let [addressError, updateAddressError] = useState("");

    const saveDetail = async () => {
        let formstatus = true;
        if (fullname == "") {
            formstatus = false;
            updateNameError("Invalid Name!");
        } else {
            updateNameError("");
        }

        let mpattern = /^[0]?[6789]\d{9}$/;
        if (!mpattern.test(mobileno)) {
            formstatus = false;
            updateMobileError("Invalid Mobile Number!");
        } else {
            updateMobileError("");
        }

        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!epattern.test(email)) {
            formstatus = false;
            updateEmailError("Invalid Email Id!");
        } else {
            updateEmailError("");
        }

        if (address == "") {
            formstatus = false;
            updateAddressError("Invalid Address!");
        } else {
            updateAddressError("");
        }

        if (cartitems.length == 0) {
            formstatus = false;
        }

        if (formstatus === true) {
            let orderdata = {
                customername: fullname,
                mobile: mobileno,
                email: email,
                address: address,
                itemlist: cartitems
            };
            let url = "http://localhost:2345/orderlist";
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(orderdata)
            };
            try {
                await fetch(url, postData)
                    .then(response => response.json())
                    .then(serresponse => {
                        toast.success('Order Placed Successfully!!', {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose: 3000, // Auto close after 3 seconds
                        });
                        pickName("");
                        pickMobile("");
                        pickEmail("");
                        pickAddress("");
                    })
                await updateQty(orderdata.itemlist);
                await updateWishlist(orderdata.itemlist);
            } catch (error) {
                // Handle any error that might occur
                console.error(error);
            }
        }
        else {
            toast.warning('Please Check if you have not added items to cart or have not entered your details to place order', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000, // Auto close after 3 seconds
            });
        }
    }

    const delQtyItem = async (id) => {
        let url = "http://localhost:2345/cartlist/" + id;
        let postData = { method: "DELETE" };
        await fetch(url, postData)
            .then(response => response.json())
            .then(emptyres => {
                getcartItems(); //reload
            })
    }

    const updateQty = (iteminfo) => {
        iteminfo.map(async (item, index) => {
            let newdata = { "iqty": (item.iqty - item.qty) };
            let url = "http://localhost:2345/productlist/" + item.id;
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "PATCH",
                body: JSON.stringify(newdata)
            };
            await fetch(url, postData)
                .then(response => response.json())
                .then(serverres => {
                    delQtyItem(item.id);
                })
        })
    }

    const updateWishlist = (iteminfo) => {
        iteminfo.map(async (item, index) => {
            let newdata = { "iqty": (item.iqty - item.qty) };
            let url = "http://localhost:2345/wishlist/" + item.id;
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "PATCH",
                body: JSON.stringify(newdata)
            };
            await fetch(url, postData)
                .then(response => response.json())
                .then(serverres => {
                    console.log(serverres);
                })
        })
    }

    return (
        <div className="container mt-3">
            <div className="row mt-4 mb-4">
                <div className="col-lg-4 pt-5">
                    <div className="card border-0 shadow">
                        <div className="card-header bg-success text-white">Enter Your Details</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Full Name</label>
                                <input type="text" className="form-control"
                                    onChange={obj => pickName(obj.target.value)} value={fullname} />
                                <small className="text-danger">{nameError}</small>
                            </div>
                            <div className="mb-3">
                                <label>Mobile Number</label>
                                <input type="number" className="form-control"
                                    onChange={obj => pickMobile(obj.target.value)} value={mobileno} />
                                <small className="text-danger">{mobileError}</small>
                            </div>
                            <div className="mb-3">
                                <label>Email Id</label>
                                <input type="email" className="form-control"
                                    onChange={obj => pickEmail(obj.target.value)} value={email} />
                                <small className="text-danger">{emailError}</small>
                            </div>
                            <div className="mb-3">
                                <label>Delivery Address</label>
                                <textarea className="form-control"
                                    onChange={obj => pickAddress(obj.target.value)} value={address}></textarea>
                                <small className="text-danger">{addressError}</small>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-primary" onClick={saveDetail}> Place Order </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    {cartitems.length > 0 ? (
                        <section>
                            <h4 className="text-center">
                                Items in Cart : {cartitems.length}
                            </h4>
                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Photo</th>
                                        <th>Color & Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th className="text-center">Delete</th>
                                        <th className="text-center">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartitems.map((item, index) => {
                                            total = total + (item.iprice * item.qty);
                                            return (
                                                <tr key={index}>
                                                    <td>{item.iname}</td>
                                                    <td><img src={item.iphoto} height="100" width="100" /></td>
                                                    <td>
                                                        {item.icolor} <br /> {item.isize}
                                                    </td>
                                                    <td><i className="fa fa-inr"></i> {item.iprice}</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <button className="btn btn-primary btn-sm" onClick={changeQty.bind(this, item, "A")} disabled={item.qty == item.iqty}>
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                            <input type="text" value={item.qty} size="2" readOnly />
                                                            <button className="btn btn-warning btn-sm" onClick={changeQty.bind(this, item, "B")}>
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td><i className="fa fa-inr"></i> {item.qty * item.iprice}</td>
                                                    <td className="text-center">
                                                        <i className="fa fa-trash add text-danger fa-2x" onClick={delItem.bind(this, item.id, item.iname)}></i>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link to={`/edititem/${item.id}`} ><i className="fa fa-pencil add text-danger"></i></Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan="5" className="text-end">
                                            Total Amount
                                        </td>
                                        <td colSpan="3"><i className="fa fa-inr fa-lg"></i> {total} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    ) : (
                        <section>
                            <h4 className="text-center text-primary mt-4">No items in your cart!</h4>
                        </section>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Cart;