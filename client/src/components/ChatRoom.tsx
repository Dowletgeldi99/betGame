import React, {FC, useEffect, useRef, useState} from 'react';
import {Socket} from "socket.io-client";
import {Message} from "../types/Message";
import {IoMdChatboxes} from "react-icons/all";

interface IChatRoomProps {
    socket: Socket
    messages: Message[]
}

const ChatRoom: FC<IChatRoomProps> = ({socket, messages}) => {
    const [inputValue, setInputValue] = useState('');
    const bottomRef = useRef<HTMLDivElement | null>(null)

    console.log({messages})

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const sendMessage = () => {
        console.log({inputValue})
        if (inputValue.trim() !== '') {
            socket.emit('chat', inputValue.trim());
            setInputValue('');
        }
    }

    return (
        <div className={'py-4 w-1/2'}>
            <div className={'flex items-center mb-2'}>
                <IoMdChatboxes size={24} className={'text-red-400'}/>
                <h2 className={'text-lg ml-2 capitalize font-semibold'}>
                    Chat
                </h2>
            </div>
            <div
                className={'flex flex-col justify-between min-w-full h-[200px] ring-1 ring-gray-600 overflow-hidden rounded-md'}>
                <div className={'flex flex-col gap-2 p-4 overflow-y-auto'}>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <strong className={'text-sm'}>{message.sender}: </strong>
                            <span className={'text-xs bg-gray-700 rounded p-1'}>{message.message}</span>
                        </div>
                    ))}
                    <div ref={bottomRef}/>
                </div>
                <div className={'flex gap-2 p-2 bg-gray-700'}>
                    <input className={' w-full rounded outline-0 bg-gray-800 px-1'} type="text" value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}/>
                    <button
                        className={
                            'bg-gradient-to-r from-pink-600 via-pink-500 to-orange-600 px-10 py-1 rounded-md font-semibold'
                        }
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;