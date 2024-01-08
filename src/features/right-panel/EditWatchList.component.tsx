import React, { useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar.component';
import { connect } from 'react-redux';
import { clearSearch, createOneWatch, deleteOneWatch, findManyAssetsWithQuery } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch } from '../../common';
import './EditWatchList.component.css';

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
    onClose: (() => void);
}

export const EditWatchListComponent = ({ createOne, clearSearch, deleteOne, findManyWithFilter, watchList, searchResults, onClose }: EditWatchListProps) => {
    const [rows, setRows] = useState<IAsset[]>([]);
    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        if (searchResults.length === 0) {
            setRows(watchList.map((watch) => ({ symbol: watch.symbol } as IAsset)));
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

    return (
        <div className='edit-modal'>
            <div className='edit-modal-header'>
                <SearchBarComponent expandEnabled={true} onSearchTermChange={handleSearchTermChanged} onSearch={() => {}} />
            </div>
            <div className='edit-modal-rows'>
                {rows.map((item) => (
                    <div key={item.symbol}>
                        {isAddMode && (
                            <button style={{color: 'green'}} onClick={() => handleAdd(item)}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        )}
                        {!isAddMode && (
                            <button style={{color: 'red'}} onClick={() => handleRemove(item.symbol)}>
                                <FontAwesomeIcon icon={faMinusCircle} />
                            </button>
                        
                        )}
                        {item.symbol}
                    </div>
                ))}
            </div>
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