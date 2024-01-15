import React, { CSSProperties, memo, useEffect } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import './EditWatchListItem.component.scss';
import Button from "react-bootstrap/Button";

type EditWatchListItemProps = EditWatchListItemComponentProps;
interface EditWatchListItemComponentProps {
    watch: IWatch | null;
    asset: IAsset | null;
    isAddMode: boolean;
    icon: IconDefinition;
    index: number;
    style: CSSProperties;
    onClick: (() => void);
    onLoad: (() => void);
}

export const EditWatchListItemComponent = ({ watch, asset, isAddMode, icon, index, style, onClick, onLoad }: EditWatchListItemProps) => {
    const color = isAddMode ? 'green' : 'red';
    useEffect(() => {
        onLoad();
    }, []);

    if (!watch || !asset) {
        return null;
    }

    return (
        <Draggable draggableId={watch.symbol} index={index}>
            {(provided: DraggableProvided) => (
                <div className="edit-watch-list-item" key={watch.symbol}  style={style}>
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
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
                </div>
            )}
        </Draggable>
    );
};

export default memo(EditWatchListItemComponent);
