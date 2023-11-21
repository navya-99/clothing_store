import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    let [newarrivals, updateArrival] = useState([]);

    const getArrivals = () => {
        fetch("http://localhost:2345/arrival")
            .then(response => response.json())
            .then(arrivalArray => {
                updateArrival(arrivalArray);
            })
    }

    useEffect(() => {
        getArrivals();
    }, [1]);

    return (
        <section>
            <div id="banner"></div>
            <div className="container mt-4">
                <div className="row">
                    <h1 className="text-center text-primary"><marquee>New Arrivals!!</marquee></h1>
                </div>
                <div className="row mb-3">
                    {
                        newarrivals.map((arrival, index) => {
                            return (
                                <>
                                <div className="col-lg-2"></div>
                                <div className="col-lg-8 mb-4 cards" key={index}>
                                    <div className="card shadow p-1">
                                        <img src={arrival.photo} height="350" width="100%" />
                                        <div class="card-body">
                                            <h3 className="card-title text-info mb-3">{arrival.name}</h3>
                                            <p className="card-text"><i className="fa fa-inr fa-lg"></i> {arrival.price}</p>
                                            <p className="card-text">{arrival.details}</p>
                                            <Link to={arrival.category} className="more">Click here to checkout collections</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2"></div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Home;