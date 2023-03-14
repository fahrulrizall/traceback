import React from "react";
import { Modal } from "react-bootstrap";
import { useApplicationStoreContext } from "../Hook/UserHook";

export default function ModalPopUp({ component }) {
  const { isShowModal, setIsShowModal } = useApplicationStoreContext();
  return (
    <Modal
      show={isShowModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setIsShowModal(!isShowModal)}
    >
      {component && component()}
    </Modal>
  );
}
