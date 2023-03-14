import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PagedSearh } from "../../API/vendor";
import { Outlet } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useApplicationStoreContext } from "../../Hook/UserHook";

export default function ReceivingTable() {
  const { lastDataModificationTimestamp } = useApplicationStoreContext();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [receiving, setReceiving] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    PagedSearh(pageIndex, pageSize).then((response) => {
      setReceiving(response.data.data);
      setTotalCount(response.data.totalCount);
    });
  }, [pageIndex, lastDataModificationTimestamp]);

  const handlePageChange = (e) => {
    setPageOffset(e.selected);
    setPageIndex(e.selected);
  };

  useEffect(() => {
    setPageCount(Math.ceil(totalCount / pageSize));
  }, [totalCount]);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Vendor</h1>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Vendor Table</h5>
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
                      <th scope="col">Supplier</th>
                      <th scope="col">Code</th>
                      <th scope="col">Certificate</th>
                      <th scope="col">fleet</th>
                      <th scope="col">Owner</th>
                      <th scope="col">Material</th>
                      <th scope="col">Plant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiving &&
                      receiving.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>
                              <a
                                href={`/view/${item.uuid}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`view/${item.uuid}`);
                                }}
                              >
                                {item.supplierName}
                              </a>{" "}
                            </th>
                            <th>{item.vendorCode}</th>
                            <td>{item.certificateType}</td>
                            <td>{item.fleet}</td>
                            <td>{item.owner}</td>
                            <td>{item.rawMaterialType}</td>
                            <td>{item.plantCode}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {totalCount !== 0 && (
                  <nav>
                    <ReactPaginate
                      activeClassName="active"
                      breakLabel={"..."}
                      breakLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      pageCount={pageCount}
                      renderOnZeroPageCount={null}
                      marginPagesDisplayed={2}
                      breakClassName="page-item"
                      className="pagination justify-content-end"
                      onPageChange={handlePageChange}
                      forcePage={pageOffset}
                      hrefBuilder={(page, pageCount, selected) => "#"}
                      hrefAllControls={true}
                    />
                  </nav>
                )}
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
