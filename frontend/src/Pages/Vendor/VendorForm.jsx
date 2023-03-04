import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAll } from "../../API/plant";
import { Create, ReadByUuid, Update, Delete } from "../../API/vendor";
import { ModalPopUp } from "../../Components";
import { useApplicationStoreContext } from "../../Hook/UserHook";
import { Form } from "react-bootstrap";

export default function VendorForm() {
  const { setIsShowModal, setLastDataModificationTimestamp } =
    useApplicationStoreContext();
  const navigate = useNavigate();
  const { uuid } = useParams();

  const initialData = {
    supplierName: "",
    vendorCode: "",
    certificateType: "",
    fleet: "",
    owner: "",
    rawMaterialType: "",
    idPlant: "",
  };

  const initialAction = {
    create: "create",
    view: "view",
  };

  const [data, setData] = useState(initialData);
  const [action, setAction] = useState(initialAction.create);
  const [plant, setPlant] = useState();

  useEffect(() => {
    GetAll().then((response) => setPlant(response.data.data));
  }, []);

  const handleSubmit = () => {
    navigate("/vendor");
    if (action == initialAction.create) {
      Create(data).then((response) => {
        setLastDataModificationTimestamp(new Date().getTime());
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
      navigate("/vendor");
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
          <h5 className="modal-title">Delete Plant</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">Are you sure delete this plant?</div>
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
          <h5 className="card-title">Add New Vendor</h5>

          <form>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.supplierName}
                  onChange={(e) =>
                    setData({ ...data, supplierName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Code
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.vendorCode}
                  onChange={(e) =>
                    setData({ ...data, vendorCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="pcs" className="col-sm-2 col-form-label">
                Certificate
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Select Plant"
                  onChange={(e) =>
                    setData({ ...data, certificateType: e.target.value })
                  }
                  value={data.certificateType}
                >
                  <option value={null}>Select Cerificate</option>
                  <option value={"FT"}>Fairtrade</option>
                  <option value={"NFT"}>Non Fairtrade</option>
                  <option value={"MSC"}>MSC</option>
                  <option value={"MSC/FT"}>MSC Fairtade</option>
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="size" className="col-sm-2 col-form-label">
                Fleet
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Select Fleet"
                  onChange={(e) => setData({ ...data, fleet: e.target.value })}
                  value={data.fleet}
                >
                  <option>Select Fleet</option>
                  <option value={"OBC"}>OBC</option>
                  <option value={"TWA"}>TWA</option>
                  <option value={"SUL"}>SUL</option>
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="grade" className="col-sm-2 col-form-label">
                Owner
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.owner}
                  onChange={(e) => setData({ ...data, owner: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="grade" className="col-sm-2 col-form-label">
                Material
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Select Plant"
                  onChange={(e) =>
                    setData({ ...data, rawMaterialType: e.target.value })
                  }
                  value={data.rawMaterialType}
                >
                  <option>Select Material</option>
                  <option value={"GG"}>GG</option>
                  <option value={"CL"}>CL</option>
                  <option value={"DL"}>DL</option>
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="grade" className="col-sm-2 col-form-label">
                Plant
              </label>
              <div className="col-sm-10">
                <Form.Select
                  aria-label="Select Plant"
                  onChange={(e) =>
                    setData({ ...data, idPlant: e.target.value })
                  }
                  value={data.idPlant}
                >
                  <option value={null}>Select Plant</option>
                  {plant &&
                    plant.map((item, index) => {
                      return (
                        <option value={item.uuid} key={index}>
                          {item.plantCode}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <div className=" d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => navigate("/vendor")}
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
                  onClick={() => handleSubmit()}
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
