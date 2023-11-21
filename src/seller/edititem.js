import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import swal from "sweetalert";

const Edititem = () => {

    let { itemid } = useParams();

    let [itemname, pickName] = useState("");
    let [itemprice, pickPrice] = useState();
    let [itemphoto, pickPhoto] = useState("");
    let [itemcategory, pickCategory] = useState("");
    let [itemcolor, pickColor] = useState([]);
    let [itemsize, pickSize] = useState([]);
    let [itemqty, pickQty] = useState();

    const getItems = () => {
        let url = "http://localhost:2345/productlist/" + itemid;
        fetch(url)
            .then(response => response.json())
            .then(iteminfo => {
                pickName(iteminfo.iname);
                pickPrice(iteminfo.iprice);
                pickQty(iteminfo.iqty);
                pickPhoto(iteminfo.iphoto);
                pickCategory(iteminfo.icategory);
                pickColor(iteminfo.icolor);
                pickSize(iteminfo.isize);
            })
    }

    useEffect(() => {
        getItems();
    }, []);

    const updateDetail = () =>{
        let newdata = {
            "iname": itemname,
            "iprice": itemprice,
            "iphoto": itemphoto,
            "icategory": itemcategory,
            "icolor": itemcolor,
            "isize": itemsize,
            "iqty": itemqty
        };
        let url = "http://localhost:2345/productlist/"+itemid;
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "PATCH",
            body: JSON.stringify(newdata)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal(itemname, "Updated Successfully!", "success");
                window.location.href = "#/productlist";
            })
    }

    const handleColorChange = (event) => {
        const colors = event.target.value.split(',').map(color => color.trim());
        pickColor(colors);
    };

    const handleSizeChange = (event) => {
        const sizes = event.target.value.split(',').map(size => size.trim());
        pickSize(sizes);
    };

    return (
        <div className="container mt-4">
            <div className="row mb-2">
                <div className="col-lg-12">
                    <h3 className="text-success text-center">Edit Item here <i className="fa fa-arrow-down text-dark"></i></h3>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-8 p-3">
                    <div className="row mb-3">
                        <div className="col-lg-6">
                            <img src={itemphoto} height="100%" width="100%" />
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label>Name : </label>
                                <input type="text" className="form-control" value={itemname} onChange={obj=>pickName(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Price : </label>
                                <input type="number" className="form-control" value={itemprice} onChange={obj=>pickPrice(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Quantity : </label>
                                <input type="number" className="form-control" value={itemqty} onChange={obj=>pickQty(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Category : </label>
                                <input type="text" className="form-control" value={itemcategory} onChange={obj=>pickCategory(obj.target.value.toLowerCase())} />
                            </div>
                            <div className="mb-3">
                                <label>Photo : </label>
                                <input type="text" className="form-control" value={itemphoto} onChange={obj=>pickPhoto(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Colors : </label>
                                <input type="text" className="form-control" value={itemcolor} onChange={handleColorChange} />
                            </div>
                            <div className="mb-3">
                                <label>Sizes : </label>
                                <input type="text" className="form-control" value={itemsize} onChange={handleSizeChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <Link className="btn btn-danger" to="/productlist">Cancel</Link>
                        </div>
                        <div className="col-lg-6 text-end">
                            <button className="btn btn-primary" onClick={updateDetail}>Update</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
    )

}

export default Edititem;