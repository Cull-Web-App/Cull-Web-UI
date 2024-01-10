import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // or from whichever library you're using
import EditWatchListComponent from './EditWatchList.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { IWatch } from '../../common';
import { connect } from 'react-redux';
import { clearAssetSearch, updateManyWatch } from '../../state';

type EditWatchListButtonProps = EditWatchListButtonDispatchProps & EditWatchListButtonComponentProps & EditWatchListButtonReduxProps;
interface EditWatchListButtonDispatchProps {
    updateMany: (({ rows }: { rows: IWatch[] }) => void);
    clearSearch: (() => void);
}
interface EditWatchListButtonReduxProps {
}
interface EditWatchListButtonComponentProps {
}

export const EditWatchListButtonComponent = ({ updateMany, clearSearch }: EditWatchListButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRows, setCurrentRows] = useState<IWatch[]>([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentRows([]);
        clearSearch();
        setIsModalOpen(false);
    };

    const handleDone = () => {
        // Update all the positions on the current rows
        currentRows.forEach((row, index) => {
            row.position = index;
        });
        updateMany({ rows: currentRows });
        clearSearch();
        setIsModalOpen(false);
    };

    const handleCurrentRowsChanged = (rows: any) => {
        setCurrentRows(rows);
    };

    return (
        <div>
            <Button onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header>
                    <Button onClick={handleCloseModal}>Close</Button>
                    <Modal.Title>Edit Watch List</Modal.Title>
                    <Button onClick={handleDone}>Done</Button>
                </Modal.Header>
                <Modal.Body>
                    <EditWatchListComponent onRowsUpdate={handleCurrentRowsChanged}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any): EditWatchListButtonDispatchProps => {
    return {
        updateMany: ({ rows }: { rows: IWatch[] }) => dispatch(updateManyWatch({ watches: rows })),
        clearSearch: () => dispatch(clearAssetSearch())
    };
};

const mapStateToProps = (state: any): EditWatchListButtonReduxProps => {
    return {
    };
};

export default connect<EditWatchListButtonReduxProps, EditWatchListButtonDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(EditWatchListButtonComponent);
