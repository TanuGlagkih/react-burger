import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface IProtectedRoute {
    children?: JSX.Element,
    path?: any,
    exact?: boolean,
}

export function ProtectedRoute({ children, ...rest }: IProtectedRoute) {
    //@ts-ignore
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
