// src/components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirm Action</h3>
        <p>{message}</p>
        <div className="form-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
