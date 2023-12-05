import * as React from 'react';
import { Container } from 'inversify';
import { InversifyContext } from '../hooks';

type Props = {
    container: Container;
    children: any; // Add children to satisfy typecheck
};

/**
 * Provider component that will provider the DI container to all the react components
 * @param props props to Provider
 */
export const InversifyProvider: React.FC<Props> = (props: Props) => {
    return (
        <InversifyContext.Provider value={{ container: props.container }}>
            {props.children}
        </InversifyContext.Provider>
    );
};