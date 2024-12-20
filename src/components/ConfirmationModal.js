import React from "react";
import "./ConfirmationModal.css"; // Custom styles for the modal

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirmation</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">Yes</button>
                    <button onClick={onCancel} className="cancel-button">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
