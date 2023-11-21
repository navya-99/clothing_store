import { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ProductList = () => {

    let [allproduct, updateProduct] = useState([]);

    const getProduct = () => {
        fetch("http://localhost:2345/productlist")
            .then(response => response.json())
            .then(serverres => {
                updateProduct(serverres.reverse());
            })
    }

    useEffect(() => {
        getProduct();
    }, []);

    const delItem = (id, name) =>{
        let url = "http://localhost:2345/productlist/"+id;
        let postData = {method : "DELETE"};
        fetch(url, postData)
        .then(response=>response.json())
        .then(emptyres=>{
            swal(name, "Item Deleted from Store", "success");
            getProduct();
        })
    }

    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <h2 className="text-center">Items in Store : {allproduct.length}</h2>
            </div>
            <div className="row mb-5">
                <div className="col-lg-12 mb-2">
                    <h3 className="text-success">Mens Collection</h3>
                </div>
                <div className="row mb-3">
                    {
                        allproduct.map((item, index) => {
                            if (item.icategory === "gents")
                                return (
                                    <div className="col-lg-6 border p-2" key={index}>
                                        <div className="row mb-3">
                                            <div className="col-lg-6">
                                                <img src={item.iphoto} height="320" width="100%" />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <h4 className="text-primary">Item : {item.iname}</h4>
                                                <hr />
                                                <p className="fs-5">Price : <i className="fa fa-inr"></i>{item.iprice}</p>
                                                <p className="fs-5">Quantity : {item.iqty} InStock</p>
                                                <div className="row">
                                                    <div className="col-lg-6">Available Colors:
                                                        {
                                                            item.icolor.map((color, index1) => {
                                                                return (
                                                                    <li key={index1}>{color}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="col-lg-6">Available Sizes:
                                                        {
                                                            item.isize.map((size, index2) => {
                                                                return (
                                                                    <li key={index2}>{size}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Link to={`/edititem/${item.id}`} className="btn btn-warning"><i className="fa fa-pencil"></i> Edit</Link>
                                            </div>
                                            <div className="col-lg-6 text-end">
                                                <button className="btn btn-danger" onClick={delItem.bind(this, item.id, item.iname)}><i className="fa fa-trash"></i> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-lg-12 mb-2">
                    <h3 className="text-success">Womens Collection</h3>
                </div>
                <div className="row mb-3">
                    {
                        allproduct.map((item, index) => {
                            if (item.icategory === "ladies")
                                return (
                                    <div className="col-lg-6 border p-2" key={index}>
                                        <div className="row mb-3">
                                            <div className="col-lg-6">
                                                <img src={item.iphoto} height="320" width="100%" />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <h4 className="text-primary">Item : {item.iname}</h4>
                                                <hr />
                                                <p className="fs-5">Price : <i className="fa fa-inr"></i>{item.iprice}</p>
                                                <p className="fs-5">Quantity : {item.iqty} InStock</p>
                                                <div className="row">
                                                    <div className="col-lg-6">Available Colors:
                                                        {
                                                            item.icolor.map((color, index1) => {
                                                                return (
                                                                    <li key={index1}>{color}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="col-lg-6">Available Sizes:
                                                        {
                                                            item.isize.map((size, index2) => {
                                                                return (
                                                                    <li key={index2}>{size}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Link to={`/edititem/${item.id}`} className="btn btn-warning"><i className="fa fa-pencil"></i> Edit</Link>
                                            </div>
                                            <div className="col-lg-6 text-end">
                                                <button className="btn btn-danger" onClick={delItem.bind(this, item.id)}><i className="fa fa-trash"></i> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 mb-2">
                    <h3 className="text-success">Kids Collection</h3>
                </div>
                <div className="row mb-3">
                    {
                        allproduct.map((item, index) => {
                            if (item.icategory === "kids")
                                return (
                                    <div className="col-lg-6 border p-2" key={index}>
                                        <div className="row mb-3">
                                            <div className="col-lg-6">
                                                <img src={item.iphoto} height="320" width="100%" />
                                            </div>
                                            <div className="col-lg-6 mt-3">
                                                <h4 className="text-primary">Item : {item.iname}</h4>
                                                <hr />
                                                <p className="fs-5">Price : <i className="fa fa-inr"></i>{item.iprice}</p>
                                                <p className="fs-5">Quantity : {item.iqty} InStock</p>
                                                <div className="row">
                                                    <div className="col-lg-6">Available Colors:
                                                        {
                                                            item.icolor.map((color, index1) => {
                                                                return (
                                                                    <li key={index1}>{color}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="col-lg-6">Available Sizes:
                                                        {
                                                            item.isize.map((size, index2) => {
                                                                return (
                                                                    <li key={index2}>{size}</li>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Link to={`/edititem/${item.id}`} className="btn btn-warning"><i className="fa fa-pencil"></i> Edit</Link>
                                            </div>
                                            <div className="col-lg-6 text-end">
                                                <button className="btn btn-danger" onClick={delItem.bind(this, item.id)}><i className="fa fa-trash"></i> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList;