import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // or from whichever library you're using
import EditWatchListComponent from './EditWatchList.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditWatchListButtonComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Watch List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditWatchListComponent onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditWatchListButtonComponent;
