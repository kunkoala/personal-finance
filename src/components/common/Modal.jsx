import React from "react";
import Modal from "react-bootstrap/Modal";

function DialogModal({ modalTitle, isOpen, onClose, children }) {
  // prevent closing on click inside the dialog

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal show={isOpen} onHide={onClose} onClick={onClose} backdrop="static">
      <Modal.Dialog onClick={handleContainerClick}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}

export default DialogModal;
