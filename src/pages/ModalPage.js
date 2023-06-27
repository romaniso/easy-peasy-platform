import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";

function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const actionBar = (
    <Button onClick={handleClose} secondary>
      Close Modal
    </Button>
  );

  const modal = (
    <Modal actionBar={actionBar} onClose={handleClose}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa esse
        repellat debitis dignissimos quia. Eaque numquam, maxime tempora dolor
        nostrum nesciunt dignissimos. Odit nobis beatae id nam doloremque aut
        libero?
      </p>
    </Modal>
  );
  return (
    <div>
      <Button onClick={handleClick} primary>
        Open Modal
      </Button>
      {showModal && modal}
    </div>
  );
}

export default ModalPage;
