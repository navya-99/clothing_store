import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SellerLogin = () => {

    let[username, pickUserName] = useState("");
    let[password, pickPassword] = useState("");

    const login = () =>{
        let url = "http://localhost:2345/account?email="+username+"&password="+password;
        fetch(url)
        .then(response=>response.json())
        .then(serverres=>{
            console.log(serverres);
            console.log(serverres.length);
            if(serverres.length === 0){
                toast.error('Invalid Credentials', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000, // Auto close after 3 seconds
                });
            }
            else{
                localStorage.setItem("sid", serverres[0].id);
                localStorage.setItem("sname", serverres[0].seller);
                window.location.href = "http://localhost:3000/#/dashboard";
                window.location.reload();
            }
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border p-4 rounded shadow bg-info-subtle">
                        <h3 className="text-center mb-3"> Seller login </h3>
                        <div className="mb-4">
                            <label> Email Id </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={obj=>pickUserName(obj.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label> Password </label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={obj=>pickPassword(obj.target.value)}
                            />
                        </div>
                        <div className="text-center mb-3">
                            <button className="btn btn-primary" onClick={login}> Login </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default SellerLogin;