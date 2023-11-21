import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Orders = () => {

    let [orderlist, updateOrder] = useState([]);

    const getOrders = () => {
        fetch("http://localhost:2345/orderlist")
            .then(response => response.json())
            .then(serverres => {
                updateOrder(serverres.reverse());
            })
    }

    useEffect(() => {
        getOrders();
    }, []);

    const delItem = (id) => {
        let url = "http://localhost:2345/orderlist/" + id;
        let postData = { method: "DELETE" };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                toast.success('Item Delivered Successfully', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 2000, // Auto close after 3 seconds
                });
                getOrders();
            })
    }

    let total = 0;

    return (
        <div className="container mt-4">
            {orderlist.length > 0 ? (
                <section>
                    <div className="row mb-3">
                        <h3 className="text-center">Orders Received : {orderlist.length}</h3>
                    </div>
                    {
                        orderlist.map((order, index1) => {
                            total = 0;
                            return (
                                <div className="row mb-5 p-3 shadow-lg" key={index1}>
                                    <div className="col-lg-12">Customer Name: <i>{order.customername}</i></div>
                                    <div className="col-lg-12">Mobile No: {order.mobile}</div>
                                    <div className="col-lg-12">Email: {order.email}</div>
                                    <div className="col-lg-12">Deliver To: {order.address}</div>
                                    <div className="col-lg-12 mt-3">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Photo</th>
                                                    <th>Color</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.itemlist.map((item, index2) => {
                                                        total = total + (item.iprice * item.qty);
                                                        return (
                                                            <tr key={index2}>
                                                                <td>{item.iname}</td>
                                                                <td>
                                                                    <img src={item.iphoto} height="70" width="70" />
                                                                </td>
                                                                <td>{item.icolor}</td>
                                                                <td>{item.isize}</td>
                                                                <td><i className="fa fa-inr"></i> {item.iprice}</td>
                                                                <td>{item.qty}</td>
                                                                <td><i className="fa fa-inr"></i> {item.iprice * item.qty}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr>
                                                    <td colSpan="6" className="text-end">Total Amount</td>
                                                    <td colSpan="1"><i className="fa fa-inr fa-lg"></i> {total}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-lg-12 text-end mt-2">
                                        <button className="btn btn-info" onClick={delItem.bind(this, order.id)}>Delivered <i className="fa fa-truck"></i></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <ToastContainer />
                </section>
            ) : (
                <h4 className="text-center text-success mt-4">Nothing in Orders :(</h4>
            )}
        </div>
    )
}

export default Orders;