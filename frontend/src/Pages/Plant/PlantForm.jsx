import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Create, ReadByUuid, Update, Delete } from "../../API/plant";
import { ModalPopUp } from "../../Components";
import { useApplicationStoreContext } from "../../Hook/UserHook";

export default function PlantForm() {
  const { setIsShowModal, setLastDataModificationTimestamp } =
    useApplicationStoreContext();
  const navigate = useNavigate();
  const { uuid } = useParams();

  const initialData = {
    name: "",
    location: "",
    plantCode: "",
    batchCode: "",
  };

  const initialAction = {
    create: "create",
    view: "view",
  };

  const [data, setData] = useState(initialData);
  const [action, setAction] = useState(initialAction.create);

  const handleSubmit = () => {
    navigate("/plant");
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
      navigate("/plant");
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
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Plant</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure delete this plant?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => setIsShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
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
          <h5 className="card-title">Add New Plant</h5>

          <form>
            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="pcs" className="col-sm-2 col-form-label">
                Location
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.location}
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="size" className="col-sm-2 col-form-label">
                Plant Code
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.plantCode}
                  onChange={(e) =>
                    setData({ ...data, plantCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="grade" className="col-sm-2 col-form-label">
                Batch Code
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={data.batchCode}
                  onChange={(e) =>
                    setData({ ...data, batchCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className=" d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => navigate("/plant")}
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
