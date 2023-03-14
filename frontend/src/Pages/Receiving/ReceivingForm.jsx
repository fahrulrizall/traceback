import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { GetVendorCode } from "../../API/vendor";
import {
  CreateNewReceiving,
  ReadByUuid,
  Update,
  Delete,
} from "../../API/receiving";
import { useNavigate, useParams } from "react-router-dom";
import { useApplicationStoreContext } from "../../Hook/UserHook";
import { ModalPopUp } from "../../Components";

export default function ReceivingForm() {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { setIsShowModal, setLastDataModificationTimestamp } =
    useApplicationStoreContext();
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
  const [vendorList, setVendorList] = useState();
  const [isShowVendor, setIsShowVendor] = useState(false);
  const [action, setAction] = useState(initialAction.create);

  useEffect(() => {
    if (data.vendorCode && data.vendorCode.length === 5) {
      GetVendorCode(data.vendorCode).then((response) => {
        setVendorList(response.data.data);
      });
    } else {
      setVendorList();
    }
  }, [data.vendorCode]);

  const handleSubmit = () => {
    navigate("/receiving");
    if (action == initialAction.create) {
      CreateNewReceiving(data).then(() => {
        setLastDataModificationTimestamp(new Date());
      });
    } else {
      Update(uuid, data).then((response) => {
        setLastDataModificationTimestamp(new Date().getTime());
      });
    }
  };

  const deleteData = () => {
    Delete(uuid).then(() => {
      setIsShowModal(false);
      setLastDataModificationTimestamp(new Date().getTime());
      navigate("/receiving");
    });
  };

  useEffect(() => {
    if (uuid) {
      setAction(initialAction.view);
      ReadByUuid(uuid).then((response) => setData(response.data.data));
    }
  }, [uuid]);

  const component = () => {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Delete Receiving</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">Are you sure delete this receiving?</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteData()}
          >
            Delete
          </button>
        </div>
      </div>
    );
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
                  type="text"
                  className="form-control"
                  list="vendors"
                  onChange={(e) => {
                    setData({ ...data, vendorCode: e.target.value });
                    setIsShowVendor(true);
                  }}
                  value={data.vendorCode}
                />
                {isShowVendor && vendorList && (
                  <div className="form-control">
                    <a
                      onClick={() => {
                        setData({ ...data, vendorUuid: vendorList.uuid });
                        setIsShowVendor(false);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {vendorList.vendorCode + " - " + vendorList.supplierName}
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
                    onClick={(e) => {
                      e.preventDefault();
                      setIsShowModal(true);
                    }}
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
      <ModalPopUp component={component} />
    </div>
  );
}
