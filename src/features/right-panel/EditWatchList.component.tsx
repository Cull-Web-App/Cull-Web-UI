import React, { memo, useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar.component';
import { connect } from 'react-redux';
import { clearSearch, createOneWatch, deleteOneWatch, findManyAssetsWithQuery } from '../../state';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch, StrictModeDroppable, Watch } from '../../common';
import './EditWatchList.component.css';
import EditWatchListItemComponent from './EditWatchListItem.component';
import { DragDropContext, Draggable, DraggableProvided, DropResult, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

type EditWatchListProps = EditWatchListDispatchProps & EditWatchListComponentProps & EditWatchListReduxProps;
interface EditWatchListDispatchProps {
    findManyWithFilter: (({ filter }: { filter: string }) => void);
    createOne: (({ symbol, position }: { symbol: string, position: number }) => void);
    clearSearch: (() => void);
    deleteOne: (({ symbol }: { symbol: string }) => void);
}
interface EditWatchListReduxProps {
    watchList: IWatch[];
    searchResults: IAsset[];
    assets: Map<string, IAsset>;
}
interface EditWatchListComponentProps {
    onRowsUpdate: ((rows: IWatch[]) => void);
}

export const EditWatchListComponent = ({ createOne, clearSearch, deleteOne, findManyWithFilter, watchList, assets, searchResults, onRowsUpdate }: EditWatchListProps) => {
    const [rows, setRows] = useState<IWatch[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        if (searchResults.length === 0) {
            setRows(watchList);
            onRowsUpdate(watchList);
            setIsAddMode(false);
        } else {
            const assetsAsWatch: IWatch[] = searchResults.map((asset, index) => new Watch({ symbol: asset.symbol, index }));
            setRows(assetsAsWatch);
            setIsAddMode(true);
        }
    }, [searchResults, watchList]);

    const handleAdd = (item: IWatch, position: number) => {
        createOne({ symbol: item.symbol, position });
    };

    const handleRemove = (item: IWatch) => {
        deleteOne({ symbol: item.symbol });
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
                                <EditWatchListItemComponent key={item.symbol} watch={item} asset={assets.get(item.symbol)!} isAddMode={isAddMode} icon={isAddMode ? faPlusCircle : faMinusCircle} index={index} onClick={() => isAddMode ? handleAdd(item, watchList.length) : handleRemove(item)} />
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
        searchResults: state.asset.latestQueryResult,
        assets: state.asset.assets
    };
}

const mapDispatchToProps = (dispatch: any): EditWatchListDispatchProps => {
    return {
        createOne: ({ symbol, position }: { symbol: string, position: number }) => dispatch(createOneWatch({ symbol, position })),
        clearSearch: () => dispatch(clearSearch()),
        deleteOne: ({ symbol }: { symbol: string }) => dispatch(deleteOneWatch({ symbol })),
        findManyWithFilter: ({ filter }: { filter: string }) => dispatch(findManyAssetsWithQuery({ query: filter }))
    };
}

export default connect<EditWatchListReduxProps, EditWatchListDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(memo(EditWatchListComponent));