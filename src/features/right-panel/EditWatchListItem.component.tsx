import React, { CSSProperties, memo, useEffect } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IAsset, IWatch } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import './EditWatchListItem.component.scss';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type EditWatchListItemProps = EditWatchListItemComponentProps;
interface EditWatchListItemComponentProps {
    provided: DraggableProvided
    watch: IWatch | null;
    asset: IAsset | null;
    isAddMode: boolean;
    icon: IconDefinition;
    style: CSSProperties;
    onClick: (() => void);
    onLoad: (() => void);
}

export const EditWatchListItemComponent = ({ provided, watch, asset, isAddMode, icon, style, onClick, onLoad }: EditWatchListItemProps) => {
    const color = isAddMode ? 'green' : 'red';
    useEffect(() => {
        onLoad();
    }, []);

    if (!watch || !asset) {
        return null;
    }

    const getStyle = (provided: DraggableProvided, style: CSSProperties) => {
        if (!style) {
            return provided.draggableProps.style;
        }

        return {
            ...provided.draggableProps.style,
            ...style
        };
    };

    return (
        <div
            className="edit-watch-list-item"
            key={watch.symbol}
            {...provided.draggableProps}
            style={getStyle(provided, style)}
            ref={provided.innerRef}
        >
            <Row className="watch-list-row">
                <Col xs={1}>
                    <Button onClick={onClick} className={`rounded-icon-${color}`}>
                        <FontAwesomeIcon icon={icon}/>
                    </Button>
                </Col>
                <Col>
                    <div>
                        <div className="asset-symbol-text">{watch.symbol}</div>
                        <div className="asset-name-text">{asset.name}</div>
                    </div>
                </Col>
                <Col xs={1}>
                    <div {...provided.dragHandleProps} className={`drag-handle ${isAddMode ? 'hidden' : ''}`}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default memo(EditWatchListItemComponent);
