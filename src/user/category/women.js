import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

const Womens = () => {

    let [newitems, updateItem] = useState([]);
    let [keyword, updateKeyword] = useState("");

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

    const getItems = () => {
        fetch("http://localhost:2345/productlist")
            .then(response => response.json())
            .then(itemArray => {
                updateItem(itemArray.reverse());
            })
    }

    useEffect(() => {
        getItems();
    }, []);

    const addtoCart = async (iteminfo) => {
        iteminfo["qty"] = 1;
        iteminfo.icolor = selectedColor
        iteminfo.isize = selectedSize
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

    const wishlist = async (iteminfo) => {
        iteminfo["qty"] = 1;
        let url = "http://localhost:2345/wishlist";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(iteminfo)
        };
        await fetch(url, postData)
            .then(response => response.json())
            .then(serverres => {
                swal(iteminfo.iname, "Added in your wishlist!", "success");
            })
            .catch(err => {
                swal(iteminfo.iname, "Already Exist in your wishlist!", "error");
            })
        window.location.href = "#/wishlist";
    }

    const PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const filteredItems = newitems.filter(
        (item) => item.iname.toLowerCase().includes(keyword.toLowerCase()) && item.icategory === "ladies"
    );

    const pageCount = Math.ceil(filteredItems.length / PER_PAGE);

    const paginatedItems = filteredItems.slice(offset, offset + PER_PAGE);

    return (
        <section>
            <div className="container mt-3">
                <div className="row mb-4">
                    <h1 className="text-center text-danger-emphasis">Women's collection</h1>
                </div>
                <div className="row mb-5">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Search Items here..."
                            onChange={obj => updateKeyword(obj.target.value)} />
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row">
                    {
                        paginatedItems.map((item, index) => {
                            return (
                                <div className="col-lg-4 mb-3" key={index}>
                                    <div className="shadow p-4">
                                        <h4 className="text-center text-danger">{item.iname}</h4>
                                        <img src={item.iphoto} height="280" width="100%" />
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
                                                            id={`size-${index}`}
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
                                                            id={`color-${index}`}
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
                                                        <i className="fa fa-heart fa-lg text-danger" title="Add item to Wishlist" onClick={wishlist.bind(this, item)}></i>
                                                    </div>
                                                </div>
                                            </section>
                                        ) : (
                                            <h3 className="text-center text-danger mt-5 mb-5">Currently Unavailable</h3>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </section>
    )
}

export default Womens;