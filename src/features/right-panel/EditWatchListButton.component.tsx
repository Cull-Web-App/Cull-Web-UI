import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // or from whichever library you're using
import EditWatchListComponent from './EditWatchList.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { IWatch } from '../../common';
import { useDispatch } from 'react-redux';
import { clearAssetSearch, createManyWatch, deleteManyWatch, updateManyWatch } from '../../state';

import './EditWatchListButton.component.scss';

type EditWatchListButtonProps = EditWatchListButtonComponentProps;
interface EditWatchListButtonComponentProps {
}

export const EditWatchListButtonComponent = ({ }: EditWatchListButtonProps) => {
    const dispatch = useDispatch();
    const createMany = ({ rows }: { rows: IWatch[] }) => dispatch(createManyWatch({ watches: rows }));
    const updateMany = ({ rows }: { rows: IWatch[] }) => dispatch(updateManyWatch({ watches: rows }));
    const deleteMany = ({ symbols }: { symbols: string[] }) => dispatch(deleteManyWatch({ symbols }));
    const clearSearch = () => dispatch(clearAssetSearch());

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRows, setCurrentRows] = useState<IWatch[]>([]); // This is the current watch list that is being edited
    const [updatedRows, setUpdatedRows] = useState<Set<string>>(new Set<string>()); // These are the rows that have been updated
    const [addedRows, setAddedRows] = useState<Set<string>>(new Set<string>()); // These are the rows that have been added
    const [deletedRows, setDeletedRows] = useState<Set<string>>(new Set<string>()); // These are the rows that have been deleted

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        // Reset everything
        setCurrentRows([]);
        setAddedRows(new Set<string>());
        setDeletedRows(new Set<string>());
        setUpdatedRows(new Set<string>());
        clearSearch();
        setIsModalOpen(false);
    };

    const handleDone = () => {
        // Update all the positions for the current rows
        const currentRowSymbols = new Set<string>();
        currentRows.forEach((row, index) => {
            currentRowSymbols.add(row.symbol);
            row.position = index;
        });

        // Split apart into the different types of rows -- these checks should be unnecessary, but just in case
        const addRows = currentRows.filter(row => addedRows.has(row.symbol) && !deletedRows.has(row.symbol) && !updatedRows.has(row.symbol));
        const updateRows = currentRows.filter(row => !addedRows.has(row.symbol) && !deletedRows.has(row.symbol));
        const deleteRows = [...deletedRows.keys()].filter(row => !currentRowSymbols.has(row));

        // Dispatch the actions -- one for each call
        if (addRows.length > 0) {
            createMany({ rows: addRows });
        }

        if (updateRows.length > 0) {
            updateMany({ rows: updateRows });
        }

        if (deleteRows.length > 0) {
            deleteMany({ symbols: deleteRows });
        }

        handleCloseModal();
    };

    const handleRowsChange = (rows: IWatch[]) => {
        setCurrentRows(rows);
    }

    const handleRowsUpdate = (row: IWatch) => {
        // This is only an update if this row was not just created
        if (!addedRows.has(row.symbol)) {
            setUpdatedRows(updatedRows.add(row.symbol));
        }
    };

    const handleRowAdd = (row: IWatch) => {
        // If this row was deleted, then this is not a change
        if (deletedRows.has(row.symbol)) {
            setUpdatedRows(updatedRows.add(row.symbol));
            setDeletedRows(deletedRows.delete(row.symbol) ? deletedRows : deletedRows);
        } else {
            // This is an add
            setAddedRows(addedRows.add(row.symbol));
        }
    };

    const handleRowDelete = (row: IWatch) => {
        // If this row was added, then this is not a change
        if (addedRows.has(row.symbol)) {
            setUpdatedRows(updatedRows.add(row.symbol));
            setAddedRows(addedRows.delete(row.symbol) ? addedRows : addedRows);
        } else {
            // This is a delete
            setDeletedRows(deletedRows.add(row.symbol));
        }
    };


    return (
        <div className="edit-button-container">
            <div className="edit-button-icon" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faEdit} />
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header>
                    <Button onClick={handleCloseModal}>Close</Button>
                    <Modal.Title>Edit Watch List</Modal.Title>
                    <Button onClick={handleDone}>Done</Button>
                </Modal.Header>
                <Modal.Body>
                    <EditWatchListComponent onRowsChanged={handleRowsChange} onRowUpdate={handleRowsUpdate} onRowAdd={handleRowAdd} onRowDelete={handleRowDelete}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditWatchListButtonComponent;
