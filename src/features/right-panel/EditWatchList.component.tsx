import React, { useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar.component';
import { connect } from 'react-redux';
import { clearSearch, createOneWatch, deleteOneWatch, findManyAssetsWithQuery } from 'state';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch, StrictModeDroppable } from '../../common';
import './EditWatchList.component.css';
import EditWatchListItemComponent from './EditWatchListItem.component';
import { DragDropContext, Draggable, DraggableProvided, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

type EditWatchListProps = EditWatchListDispatchProps & EditWatchListComponentProps & EditWatchListReduxProps;
interface EditWatchListDispatchProps {
    findManyWithFilter: (({ filter }: { filter: string }) => void);
    createOne: (({ symbol }: { symbol: string }) => void);
    clearSearch: (() => void);
    deleteOne: (({ symbol }: { symbol: string }) => void);
}
interface EditWatchListReduxProps {
    watchList: IWatch[];
    searchResults: IAsset[];
}
interface EditWatchListComponentProps {
    onRowsUpdate: ((rows: IAsset[]) => void);
}

export const EditWatchListComponent = ({ createOne, clearSearch, deleteOne, findManyWithFilter, watchList, searchResults, onRowsUpdate }: EditWatchListProps) => {
    const [rows, setRows] = useState<IAsset[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        if (searchResults.length === 0) {
            const watchListRows = watchList.map((watch) => ({ symbol: watch.symbol } as IAsset));
            setRows(watchListRows);
            onRowsUpdate(watchListRows);
            setIsAddMode(false);
        } else {
            setRows(searchResults);
            setIsAddMode(true);
        }
    }, [searchResults, watchList]);

    const handleAdd = (item: IAsset) => {
        createOne({ symbol: item.symbol });
    };

    const handleRemove = (item: string) => {
        deleteOne({ symbol: item });
    };

    const handleSearchTermChanged = ({ searchTerm }: { searchTerm: string }) => {
        if (searchTerm === '') {
            clearSearch();
            return;
        } else {
            findManyWithFilter({ filter: searchTerm });
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(rows);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setRows(items);
        onRowsUpdate(items);
    };

    return (
        <div className='edit-modal'>
            <div className='edit-modal-header'>
                <SearchBarComponent expandEnabled={true} onSearchTermChange={handleSearchTermChanged} onSearch={() => {}} />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <StrictModeDroppable droppableId="watch-list">
                    {(provided: DroppableProvided) => (
                        <div className='edit-modal-rows' {...provided.droppableProps} ref={provided.innerRef}>
                            {rows.map((item, index) => (
                                <Draggable draggableId={item.symbol} index={index} key={item.symbol}>
                                    {(provided: DraggableProvided) => (
                                        <div 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps} 
                                            ref={provided.innerRef}
                                            key={item.symbol}
                                        >
                                            <EditWatchListItemComponent key={item.symbol} asset={item} isAddMode={isAddMode} index={index} icon={isAddMode ? faPlusCircle : faMinusCircle} onClick={() => isAddMode ? handleAdd(item) : handleRemove(item.symbol)} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </div>
    );
};

const mapStateToProps = (state: any): EditWatchListReduxProps => {
    return {
        watchList: state.watch.watches,
        searchResults: state.symbols.latestQueryResult
    };
}

const mapDispatchToProps = (dispatch: any): EditWatchListDispatchProps => {
    return {
        createOne: ({ symbol }: { symbol: string }) => dispatch(createOneWatch({ symbol })),
        clearSearch: () => dispatch(clearSearch()),
        deleteOne: ({ symbol }: { symbol: string }) => dispatch(deleteOneWatch({ symbol })),
        findManyWithFilter: ({ filter }: { filter: string }) => dispatch(findManyAssetsWithQuery({ query: filter }))
    };
}

export default connect<EditWatchListReduxProps, EditWatchListDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(EditWatchListComponent);