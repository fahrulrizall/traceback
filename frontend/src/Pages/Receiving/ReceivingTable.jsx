import React, { useEffect, useState } from "react";
import { PagedSearh } from "../../API/receiving";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ReceivingTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [receiving, setReceiving] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    PagedSearh(pageIndex, pageSize).then((response) =>
      setReceiving(response.data.data)
    );
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Receiving</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Receiving List</h5>
                  <div className="row align-items-center">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("add");
                      }}
                    >
                      Create New
                    </button>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Code</th>
                      <th scope="col">Pcs</th>
                      <th scope="col">Size</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiving &&
                      receiving.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>{item.receivingDate}</th>
                            <th>{item.fishCode}</th>
                            <td>{item.pcs}</td>
                            <td>{item.size}</td>
                            <td>{item.grade}</td>
                            <td>{item.weight}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
