import React, { useState, useEffect } from "react";
import { PagedSearh } from "../../API/plant";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useApplicationStoreContext } from "../../Hook/UserHook";

export default function PlantTable() {
  const { lastDataModificationTimestamp } = useApplicationStoreContext();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [plant, setPlant] = useState();

  useEffect(() => {
    PagedSearh(pageIndex, pageSize).then((response) =>
      setPlant(response.data.data)
    );
  }, [lastDataModificationTimestamp]);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Plant</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Plant List</h5>
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
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Plant Code</th>
                      <th scope="col">Batch Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plant &&
                      plant.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">
                              {" "}
                              <a
                                href={`view/${item.uuid}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`view/${item.uuid}`);
                                }}
                              >
                                {item.name}
                              </a>
                            </th>
                            <td>{item.location}</td>
                            <td>{item.plantCode}</td>
                            <td>{item.batchCode}</td>
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
