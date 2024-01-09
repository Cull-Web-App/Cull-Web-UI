import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // or from whichever library you're using
import EditWatchListComponent from './EditWatchList.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

export const EditWatchListButtonComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRows, setCurrentRows] = useState([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCurrentRowsChanged = (rows: any) => {
    };

    return (
        <div>
            <Button onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Watch List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditWatchListComponent onRowsUpdate={handleCurrentRowsChanged}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditWatchListButtonComponent;
