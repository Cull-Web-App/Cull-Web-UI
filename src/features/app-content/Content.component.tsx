import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

type ContentProps = ContentComponentProps;
interface ContentComponentProps {
    tabMap: Map<string, [string, JSX.Element]>;
}

export const ContentComponent = ({ tabMap }: ContentProps) => {
    return (
        <div className="content">
            <Routes>
                <Route path='/' element={<Navigate to='/overview'></Navigate>}/>
                {
                    Array.from(tabMap).map(([key, [_, element]]) => <Route key={key} path={`/${key}`} element={element}/> )
                }
            </Routes>
        </div>
    )
};

export default ContentComponent;