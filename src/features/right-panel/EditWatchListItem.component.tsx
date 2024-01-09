import React, { memo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { IAsset } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './EditWatchListItem.component.css';
import Button from "react-bootstrap/Button";

type EditWatchListItemProps = EditWatchListItemDispatchProps & EditWatchListItemComponentProps & EditWatchListItemReduxProps;
interface EditWatchListItemDispatchProps {
}
interface EditWatchListItemReduxProps {
}
interface EditWatchListItemComponentProps {
    asset: IAsset;
    isAddMode: boolean;
    icon: IconDefinition;
    index: number;
    onClick: (() => void);
}

export const EditWatchListItemComponent = ({ asset, isAddMode, icon, index, onClick }: EditWatchListItemProps) => {
    return (
        <div className="row">
            <Button style={{color: isAddMode ? 'green' : 'red'}} onClick={onClick} className="rounded-icon">
                <FontAwesomeIcon icon={icon} />
            </Button>
            {asset.symbol}
        </div>
    );
};

export default memo(EditWatchListItemComponent);
