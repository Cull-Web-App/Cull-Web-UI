import * as React from 'react';
import { Container, interfaces } from 'inversify';

export const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

/**
 * Hook to use the InversifyContext to retrieve a service identifier
 * @param identifier identifier to retrieve
 */
export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = React.useContext(InversifyContext);
    if (!container)
    {
        throw new Error();
    }

    return container.get<T>(identifier);
};
