import { useState } from "react";
import swal from "sweetalert";

const NewProduct = () => {

    let [itemname, pickName] = useState("");
    let [itemprice, pickPrice] = useState();
    let [itemphoto, pickPhoto] = useState("");
    let [itemcategory, pickCategory] = useState("");
    let [itemcolor, pickColor] = useState([]);
    let [itemsize, pickSize] = useState([]);
    let [itemqty, pickQty] = useState();

    const saveProduct = () => {
        let newdata = {
            "iname": itemname,
            "iprice": itemprice,
            "iphoto": itemphoto,
            "icategory": itemcategory,
            "icolor": itemcolor,
            "isize": itemsize,
            "iqty": itemqty
        };
        let url = "http://localhost:2345/productlist";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(newdata)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal(itemname, "Added Successfully!", "success");
                pickName("");
                pickPrice("");
                pickCategory("");
                pickColor([]);
                pickSize([]);
                pickQty("");
                pickPhoto("");
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
            <div className="row mb-3">
                <h2 className="text-center text-success">Add New Item</h2>
            </div>
            <div className="row mb-3">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 shadow-lg p-4">
                    <div className="mb-3">
                        <label>Name : </label>
                        <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)} value={itemname} />
                    </div>
                    <div className="mb-3">
                        <label>Price : </label>
                        <input type="number" className="form-control" onChange={obj => pickPrice(obj.target.value)} value={itemprice} />
                    </div>
                    <div className="mb-3">
                        <label>Quantity : </label>
                        <input type="number" className="form-control" onChange={obj => pickQty(obj.target.value)} value={itemqty} />
                    </div>
                    <div className="mb-3">
                        <label>Category : </label>
                        <input type="text" className="form-control" onChange={obj => pickCategory(obj.target.value.toLowerCase())} value={itemcategory} placeholder="ladies / gents / kids" />
                    </div>
                    <div className="mb-3">
                        <label>Photo : </label>
                        <input type="text" className="form-control" onChange={obj => pickPhoto(obj.target.value)} value={itemphoto} placeholder="upload 1.jpg format" />
                    </div>
                    <div className="mb-3">
                        <label>Colors : </label>
                        <input type="text" className="form-control" onChange={handleColorChange} value={itemcolor} />
                    </div>
                    <div className="mb-3">
                        <label>Sizes : </label>
                        <input type="text" className="form-control" onChange={handleSizeChange} value={itemsize} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={saveProduct}>Save</button>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default NewProduct;