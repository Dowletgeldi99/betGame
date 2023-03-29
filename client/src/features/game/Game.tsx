import React, {useEffect, useState} from 'react';
import GameInfo from '../../components/GameInfo';
import GameNav from '../../components/GameNav';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectUser} from "../../redux/slices/authSlice";
import Register from "../../components/Register";
import RankingInfo from "../../components/RankingInfo";
import {Ranking} from "../../types/Ranking";
import CanvasChart from "../../components/CanvasChart";
import {Round} from "../../types/Round";
import Chat from "../../components/ChatRoom";
import {UseSocket} from "../../hooks/useSocket";
import {selectCurrentRound, setCurrentRound, setCurrentRoundPlaying} from "../../redux/slices/currentRoundSlice";

const Game = () => {
    const dispatch = useAppDispatch();
    const currentRound = useAppSelector(selectCurrentRound);
    const user = useAppSelector(selectUser);
    const [messages, setMessages] = useState<{ sender: string, message: string }[]>([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [rankingInfo, setRankingInfo] = useState<Ranking[]>([]);
    const jwt = localStorage.getItem("token")?.split(' ') ?? ''
    const socket = UseSocket('ws://localhost:3000/game', {
        extraHeaders: {
            token: jwt[jwt.length - 1],
            mode: 'Multi'
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false,
    })


    useEffect(() => {
        function onConnect() {
            console.log('on connection')
        }

        function onDisconnect() {
            console.log('on disconnection')
        }

        function onNewRound(payload: Round) {
            dispatch(setCurrentRound(payload));

        }

        function onEndRound(payload: Round) {
            dispatch(setCurrentRound(null));
            dispatch(setCurrentRoundPlaying(false))
        }

        function onBetEnd(payload: Round) {
            dispatch(setCurrentRound(payload));
        }

        socket.connect()
        socket.on('connect', onConnect);
        socket.on('setCurrentRound', (payload) => {
            dispatch(setCurrentRound(payload));
            if (payload) dispatch(setCurrentRoundPlaying(true))
        });
        socket.on('totalPoint', totalPoint => {
            setTotalPoints(totalPoint)
        })
        socket.on('ranking', ranking => {
            setRankingInfo(ranking)
        })
        socket.on('message', message => {
            setMessages(prevMessage => [...prevMessage, message])

        })
        socket.on('disconnect', onDisconnect);
        socket.on('newRound', onNewRound)
        socket.on('endRound', onEndRound)
        socket.on('betEnd', onBetEnd)

        return () => {
            socket.off('ranking', ranking => {
                setRankingInfo(ranking)
            })
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('newRound', onNewRound);
            socket.off('endRound', onEndRound);
            socket.off('betEnd', onBetEnd);
            socket.close()
        };
    }, [socket]);

    return (
        <div className={'h-full'}>
            <div className={'flex gap-x-4'}>
                <div className={'w-1/4'}>
                    {
                        user ? <GameNav socket={socket} currentRound={currentRound}/> : <Register/>
                    }
                </div>
                <div className={'w-3/4 space-y-4'}>
                    <GameInfo username={user ? user.name : ''} totalPoints={totalPoints}/>
                    <CanvasChart currentRound={currentRound}/>
                </div>
            </div>
            <div className={'flex gap-4'}>
                <RankingInfo rankingInfo={rankingInfo}/>
                <Chat messages={messages} socket={socket}/>
            </div>
        </div>
    );
};

export default Game;
