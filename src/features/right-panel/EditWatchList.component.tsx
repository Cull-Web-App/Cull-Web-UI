import React, { memo, useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar.component';
import { connect, useDispatch, useSelector } from 'react-redux';
import { clearAssetSearch, findManyAssetsWithQuery, selectAssets, selectLatestQueryResult, selectWatches } from '../../state';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch, StrictModeDroppable, Watch } from '../../common';
import './EditWatchList.component.scss';
import EditWatchListItemComponent from './EditWatchListItem.component';
import { DragDropContext, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache, ListRowProps } from 'react-virtualized';
import ReactDOM from 'react-dom';

type EditWatchListProps = EditWatchListComponentProps;
interface EditWatchListComponentProps {
    onRowsChanged: ((rows: IWatch[]) => void);
    onRowUpdate: ((rows: IWatch) => void);
    onRowAdd: ((row: IWatch) => void);
    onRowDelete: ((row: IWatch) => void);
}

export const EditWatchListComponent = ({ onRowsChanged, onRowUpdate, onRowAdd, onRowDelete }: EditWatchListProps) => {
    const dispatch = useDispatch();
    const findManyWithFilter = ({ filter }: { filter: string }) => dispatch(findManyAssetsWithQuery({ query: filter }));
    const clearSearch = () => dispatch(clearAssetSearch());

    const watchList = useSelector(selectWatches);
    const assets = useSelector(selectAssets);
    const searchResults = useSelector(selectLatestQueryResult);

    const [currentWatchList, setCurrentWatchList] = useState<IWatch[]>(watchList); // This is the current watch list that is being edited
    const [currentSearchTerm, setCurrentSearchTerm] = useState(''); // This is the current search term that is being used to find assets
    const [rows, setRows] = useState<IWatch[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [clearSearchCounter, setClearSearchCounter] = useState(0);

    // Create a cache that will store the height of each item
    const cache = new CellMeasurerCache({
        defaultHeight: 50, // Provide a default height for items
        fixedWidth: true,
    });

    useEffect(() => {
        if (searchResults.length === 0 && currentSearchTerm === '') {
            setIsAddMode(false);
        } else {
            setIsAddMode(true);
        }
    }, [searchResults, currentSearchTerm]);

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
        setCurrentSearchTerm('');
        clearSearch();
        clearSearchCounter === 0 ? setClearSearchCounter(1) : setClearSearchCounter(0);
    };

    const handleRemove = (item: IWatch) => {
        // Remove it ONLY on the currentWatchList -- this edit should not be persisted until the user clicks done
        setCurrentWatchList(currentWatchList.filter((watch) => watch.symbol !== item.symbol));
        onRowDelete(item);
    };

    const handleSearchTermChanged = ({ searchTerm }: { searchTerm: string }) => {
        setCurrentSearchTerm(searchTerm);
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

    const RenderRow = ({ index, key, parent, style }: ListRowProps) => {
        const item = rows[index];
        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                parent={parent}
                rowIndex={index}
            >
                {({ measure }) => (
                    <EditWatchListItemComponent
                        key={key}
                        watch={item}
                        asset={assets.get(item.symbol)!}
                        isAddMode={isAddMode}
                        icon={isAddMode ? faPlusCircle : faMinusCircle}
                        index={index}
                        onClick={() => isAddMode ? handleAdd(item, watchList.length) : handleRemove(item)}
                        style={style}
                        onLoad={measure}
                    />
                )}
            </CellMeasurer>
        );
    };

    return (
        <div className='edit-modal'>
            <div className='edit-modal-header'>
                <SearchBarComponent key={clearSearchCounter} expandEnabled={true} onSearchTermChange={handleSearchTermChanged} onSearch={() => { }} />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <StrictModeDroppable
                    droppableId="watch-list"
                    mode="virtual"
                >
                    {(provided: DroppableProvided) => (
                        <div className='edit-modal-rows' {...provided.droppableProps}>
                            {rows.length === 0 && (
                                <div className='edit-modal-empty'>
                                    <div className='edit-modal-empty-text'>
                                        {isAddMode ? `The Symbol ${currentSearchTerm} does not exist ` : 'Type in a symbol to add it to your watch list'}
                                    </div>
                                </div>
                            )}
                            {rows.length > 0 && (
                                <AutoSizer container={provided.innerRef}>
                                    {({ height, width }: { height: number, width: number }) => (
                                        <List
                                            height={height}
                                            deferredMeasurementCache={cache}
                                            rowHeight={cache.rowHeight}
                                            rowCount={rows.length}
                                            rowRenderer={RenderRow}
                                            width={width}
                                            overscanRowCount={20}
                                            ref={(ref) => {
                                                // react-virtualized has no way to get the list's ref that I can so
                                                // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                                                if (ref) {
                                                    // eslint-disable-next-line react/no-find-dom-node
                                                    const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);
                                                    if (whatHasMyLifeComeTo instanceof HTMLElement) {
                                                        provided.innerRef(whatHasMyLifeComeTo);
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </AutoSizer>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </div>
    );
};

export default memo(EditWatchListComponent);