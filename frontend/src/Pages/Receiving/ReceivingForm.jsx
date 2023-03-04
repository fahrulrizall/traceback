import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { GetVendorCode } from "../../API/vendor";
import { CreateNewReceiving } from "../../API/receiving";
import { useNavigate } from "react-router-dom";

export default function ReceivingForm() {
  const navigate = useNavigate();

  const initialData = {
    receivingDate: "",
    pcs: "",
    size: "",
    grade: "",
    weight: "",
    vendorCode: "",
    vendorUuid: "",
  };

  const initialAction = {
    create: "create",
    view: "view",
  };

  const [data, setData] = useState(initialData);
  const [selectedVendor, setSelectedVendor] = useState();
  const [isShowVendor, setIsShowVendor] = useState(false);
  const [action, setAction] = useState(initialAction.create);

  useEffect(() => {
    if (data.vendorCode.length === 3) {
      GetVendorCode(data.vendorCode).then((response) => {
        setSelectedVendor(response.data.data);
        setIsShowVendor(true);
      });
    } else {
      setSelectedVendor();
    }
  }, [data.vendorCode]);

  const handleSubmit = () => {
    CreateNewReceiving(data).then(() => console.log("berhasil"));
  };

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Receiving</h5>

          <form>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Date
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setData({ ...data, receivingDate: e.target.value });
                  }}
                  value={data.receivingDate}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="pcs" className="col-sm-2 col-form-label">
                Pcs
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setData({ ...data, pcs: e.target.value });
                  }}
                  value={data.pcs}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="size" className="col-sm-2 col-form-label">
                Size
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Select Grade"
                  onChange={(e) => setData({ ...data, size: e.target.value })}
                  value={data.size}
                >
                  <option value={null}>Select Grade</option>
                  <option value={"10"}>10 Kg Down</option>
                  <option value={"20"}>10 - 20 Kg </option>
                  <option value={"30"}>20 - 30 kg</option>
                  <option value={"40"}>30 - 40 Kg</option>
                  <option value={"00"}>40 Kg Up</option>
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="grade" className="col-sm-2 col-form-label">
                Grade
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Select Plant"
                  onChange={(e) => setData({ ...data, grade: e.target.value })}
                  value={data.grade}
                >
                  <option value={null}>Select Grade</option>
                  <option value={"AB"}>AB</option>
                  <option value={"ABC"}>ABC</option>
                  <option value={"C"}>C</option>
                  <option value={"LOCAL"}>LOCAL</option>
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                Weight (Kg)
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setData({ ...data, weight: e.target.value })}
                  value={data.weight}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                Vendor
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  list="vendors"
                  onChange={(e) => {
                    setData({ ...data, vendorCode: e.target.value });
                  }}
                  value={data.vendorCode}
                />
                {isShowVendor && (
                  <div className="form-control">
                    <a
                      onClick={() => {
                        setData({ ...data, vendorUuid: selectedVendor.uuid });
                        setIsShowVendor(false);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {selectedVendor.vendorCode +
                        " - " +
                        selectedVendor.supplierName}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className=" d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => navigate("/receiving")}
                >
                  Close
                </button>
                {action == initialAction.view && (
                  <button
                    className="ms-2 btn btn-danger"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   setIsShowModal(true);
                    // }}
                    data-bs-toggle="modal"
                    data-bs-target="#verticalycentered"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="ms-2 btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {action == initialAction.create ? "Create" : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
