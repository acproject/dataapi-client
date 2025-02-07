import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '@/store/store';
import {login, logout} from '@/store/slice/authSlice';


export const useAuth = () => {
    const dispatch  = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

    return {
        token: authState.token,
        isLoading: authState.status === 'loading',
        error: authState.error,
        login: (username: string, password: string) => dispatch(login({username, password})),
        logout: () => dispatch(logout()),
    };
};