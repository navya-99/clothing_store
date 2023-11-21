import { useState, useEffect } from "react";
import swal from "sweetalert";

const Dashboard = () => {

    let [newarrival, updateArrival] = useState([]);

    let [itemid, pickId] = useState(0);
    let [itemname, pickName] = useState("");
    let [itemphoto, pickPhoto] = useState("");
    let [itemprice, pickPrice] = useState("");
    let [itemdetail, pickDetail] = useState("");

    const getArrivals = () => {
        fetch("http://localhost:2345/arrival")
            .then(response => response.json())
            .then(serverres => {
                updateArrival(serverres);
            })
    }

    useEffect(() => {
        getArrivals();
    }, []);

    const editItem = (id) => {
        let url = "http://localhost:2345/arrival/" + id;
        fetch(url)
            .then(response => response.json())
            .then(iteminfo => {
                console.log(iteminfo);
                pickId(id);
                pickName(iteminfo.name);
                pickPhoto(iteminfo.photo);
                pickPrice(iteminfo.price);
                pickDetail(iteminfo.details);
            })

    }

    const updateItem = () => {
        let newdata = { "name": itemname, "photo": itemphoto, "price": itemprice, "details": itemdetail };
        let url = "http://localhost:2345/arrival/" + itemid;
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "PATCH",
            body: JSON.stringify(newdata)
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal("Item : " + itemid, "Updated Successfully!", "success");
                getArrivals();
                pickName("");
                pickPhoto("");
                pickPrice("");
                pickDetail("");
                pickId();
            })
    }

    const clearItem = () => {
        pickName("");
        pickPhoto("");
        pickPrice("");
        pickDetail("");
        pickId();
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <h4 className="text-success"><marquee direction="right">Update New Arrivals <i className="fa fa-arrow-down text-dark fs-5"></i></marquee></h4>
            </div>
            <div className="row mt-3">
                <div className="col-lg-9">
                    <div className="row">
                        {
                            newarrival.map((arrival, index) => {
                                return (
                                    <div className="col-lg-4 " key={index}>
                                        <h3 className="text-center">{arrival.category}</h3>
                                        <img src={arrival.photo} alt="arrival" height="50%" width="100%" />
                                        <div className="row">
                                            <div className="col-lg-6"><h5 className="text-danger">{arrival.name}</h5></div>
                                            <div className="col-lg-6"><p><i className="fa fa-inr fa-lg"></i> {arrival.price}</p></div>
                                        </div>
                                        <p>{arrival.details}</p>
                                        <div className="text-center"><button className="btn btn-warning" onClick={editItem.bind(this, arrival.id)}>Edit</button></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card border">
                        <div className="card-header bg-primary text-white">Enter New Details</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Item Name</label>
                                <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)} value={itemname} />
                            </div>
                            <div class="mb-3">
                                <label>Item Photo</label>
                                <input type="text" className="form-control" placeholder="upload 1.jpg format" onChange={obj => pickPhoto(obj.target.value)} value={itemphoto} />
                            </div>
                            <div className="mb-3">
                                <label>Price Range</label>
                                <input type="text" className="form-control" placeholder="Rs.0 - 0" onChange={obj => pickPrice(obj.target.value)} value={itemprice} />
                            </div>
                            <div className="mb-1">
                                <label>Any Details</label>
                                <textarea className="form-control" rows={3} onChange={obj => pickDetail(obj.target.value)} value={itemdetail}></textarea>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-6 text-center">
                                <button className="btn btn-danger" onClick={clearItem}> Cancel </button>
                            </div>
                            <div className="col-lg-6 text-center">
                                <button className="btn btn-success" onClick={updateItem}> Update </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;