import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const Edititem = () => {
    let { itemid } = useParams();

    let [edititem, updateItem] = useState([]);

    const [selectedColor, setSelectedColor] = useState("");
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    }

    const [selectedSize, setSelectedSize] = useState("");
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    }

    const getItems = () => {
        let url = "http://localhost:2345/productlist/" + itemid;
        fetch(url)
            .then(response => response.json())
            .then(itemArray => {
                updateItem(itemArray);
            })
    }

    useEffect(() => {
        getItems();
    }, [1]);

    const updateDetail = (iteminfo) => {
        let url = "http://localhost:2345/cartlist/" + itemid;
        iteminfo.icolor = document.getElementById("color").value;
        iteminfo.isize = document.getElementById("size").value;
        let newdetail = {"icolor": iteminfo.icolor, "isize": iteminfo.isize};
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "PATCH",
            body: JSON.stringify(newdetail)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal(serverres.iname, "Updated Successfully!!", "success");
                window.location.href = "#/cart";
            })
    }

    return (
        <div className="container mt-4">
            <div className="row mb-2">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 shadow-lg p-3">
                    <h4 className="text-center">{edititem.iname}</h4>
                    <img src={edititem.iphoto} height="280" width="100%" />
                    <div className="row mt-2">
                        <div className="col-lg-6"><i className="fa fa-inr fa-lg"></i> {edititem.iprice}</div>
                        <div className="col-lg-6 text-end">Quantity : {edititem.iqty}</div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-6">
                            <div className="dropdown">
                                <a className="btn btn-light btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Available Sizes
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        edititem.isize?.map((sizes, index2) => {
                                            return (
                                                <li key={index2} className="ms-2 color add" onClick={() => handleSizeSelect(sizes)}>{sizes}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <input
                                id="size"
                                type="text"
                                className="form-control"
                                value={selectedSize || ''}
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
                                        edititem.icolor?.map((colors, index3) => {
                                            return (
                                                <li key={index3} className="ms-2 color add" onClick={() => handleColorSelect(colors)}> {colors}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <input
                                id="color"
                                type="text"
                                className="form-control"
                                value={selectedColor || ''}
                                placeholder="Color"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" onClick={updateDetail.bind(this, edititem)}>Update</button>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Edititem;