import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../services/types';

interface IProtectedRoute {
    children?: JSX.Element,
    path?: string,
    exact?: boolean,
}

export function ProtectedRoute({ children, ...rest }: IProtectedRoute) {
    const { isAuth } = useSelector(state => state.requests)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
