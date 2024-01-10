import React, { memo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import './EditWatchListItem.component.css';
import Button from "react-bootstrap/Button";

type EditWatchListItemProps = EditWatchListItemDispatchProps & EditWatchListItemComponentProps & EditWatchListItemReduxProps;
interface EditWatchListItemDispatchProps {
}
interface EditWatchListItemReduxProps {
}
interface EditWatchListItemComponentProps {
    watch: IWatch;
    asset: IAsset;
    isAddMode: boolean;
    icon: IconDefinition;
    index: number;
    onClick: (() => void);
}

export const EditWatchListItemComponent = ({ watch, asset, isAddMode, icon, index, onClick }: EditWatchListItemProps) => {
    const color = isAddMode ? 'green' : 'red';
    return (
        <div className="edit-watch-list-item">
            <Draggable draggableId={watch.symbol} index={index}>
                {(provided: DraggableProvided) => (
                    <div 
                        {...provided.draggableProps} 
                        ref={provided.innerRef}
                        key={watch.symbol} 
                        className="watch-list-row"
                    >
                        <Button onClick={onClick} className={`rounded-icon-${color}`}>
                            <FontAwesomeIcon icon={icon}/>
                        </Button>
                        <div>
                            <div className="asset-symbol-text">{watch.symbol}</div>
                            <div className="asset-name-text">{asset.name}</div>
                        </div>
                        <div {...provided.dragHandleProps} className={`drag-handle ${isAddMode ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default memo(EditWatchListItemComponent);
