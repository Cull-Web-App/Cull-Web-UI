import React, { memo, useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar.component';
import { connect } from 'react-redux';
import { clearAssetSearch, createOneWatch, deleteOneWatch, findManyAssetsWithQuery } from '../../state';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch, StrictModeDroppable, Watch } from '../../common';
import './EditWatchList.component.css';
import EditWatchListItemComponent from './EditWatchListItem.component';
import { DragDropContext, DropResult, DroppableProvided } from 'react-beautiful-dnd';

type EditWatchListProps = EditWatchListDispatchProps & EditWatchListComponentProps & EditWatchListReduxProps;
interface EditWatchListDispatchProps {
    findManyWithFilter: (({ filter }: { filter: string }) => void);
    clearSearch: (() => void);
}
interface EditWatchListReduxProps {
    watchList: IWatch[];
    searchResults: IAsset[];
    assets: Map<string, IAsset>;
}
interface EditWatchListComponentProps {
    onRowsChanged: ((rows: IWatch[]) => void);
    onRowUpdate: ((rows: IWatch) => void);
    onRowAdd: ((row: IWatch) => void);
    onRowDelete: ((row: IWatch) => void);
}

export const EditWatchListComponent = ({ clearSearch, findManyWithFilter, watchList, assets, searchResults, onRowsChanged, onRowUpdate, onRowAdd, onRowDelete }: EditWatchListProps) => {
    const [currentWatchList, setCurrentWatchList] = useState<IWatch[]>(watchList); // This is the current watch list that is being edited
    const [rows, setRows] = useState<IWatch[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [clearSearchCounter, setClearSearchCounter] = useState(0);

    useEffect(() => {
        if (searchResults.length === 0) {
            setIsAddMode(false);
        } else {
            setIsAddMode(true);
        }
    }, [searchResults]);

    useEffect(() => {
        // Set the rows based on the mode
        if (isAddMode) {
            // Filter out the ones that are already in the watch list
            const filteredSearchResults = searchResults.filter((asset) => !currentWatchList.some((watch) => watch.symbol === asset.symbol));
            const assetsAsWatch: IWatch[] = filteredSearchResults.map((asset, index) => new Watch({ symbol: asset.symbol, position: index }));
            setRows(assetsAsWatch);
        } else {
            setRows(currentWatchList);
        }
        onRowsChanged(currentWatchList);
    }, [isAddMode, currentWatchList, searchResults, onRowsChanged]);

    const handleAdd = (item: IWatch, position: number) => {
        // Create one ONLY on the currentWatchList -- this edit should not be persisted until the user clicks done
        setCurrentWatchList([...currentWatchList, new Watch({ symbol: item.symbol, position })]);
        onRowAdd(item);

        // Set back to remove mode
        clearSearch();
        clearSearchCounter === 0 ? setClearSearchCounter(1) : setClearSearchCounter(0);
    };

    const handleRemove = (item: IWatch) => {
        // Remove it ONLY on the currentWatchList -- this edit should not be persisted until the user clicks done
        setCurrentWatchList(currentWatchList.filter((watch) => watch.symbol !== item.symbol));
        onRowDelete(item);
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

        setCurrentWatchList(items);
        onRowUpdate(reorderedItem);
    };

    return (
        <div className='edit-modal'>
            <div className='edit-modal-header'>
                <SearchBarComponent key={clearSearchCounter} expandEnabled={true} onSearchTermChange={handleSearchTermChanged} onSearch={() => {}}/>
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
        clearSearch: () => dispatch(clearAssetSearch()),
        findManyWithFilter: ({ filter }: { filter: string }) => dispatch(findManyAssetsWithQuery({ query: filter }))
    };
}

export default connect<EditWatchListReduxProps, EditWatchListDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(memo(EditWatchListComponent));