import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {selectLoading, selectUser} from './redux/slices/authSlice';
import {getMe} from './redux/thunks/auth';
import Game from './features/game/Game';

function App(): JSX.Element {
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='bg-gray-800 h-screen text-white py-8 px-32'>
            <Game/>
        </div>
    );
}

export default App;
