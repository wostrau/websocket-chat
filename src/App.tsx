import React, {useEffect, useRef, useState} from 'react'
import './App.css'

type userType = {
    userId: number
    userName: string
    message: string
    photo: string
}

export const App: React.FC = () => {
    const messagesBlockRef = useRef()
    const [message, setMessage] = useState<string>('')
    const [webSocket, setWebSocket] = useState<null | WebSocket>(null)
    if (webSocket) {
        webSocket.onmessage = (messageEvent) => {
            const downloadedUsers = JSON.parse(messageEvent.data)
            setUsers([...users, ...downloadedUsers])
            if (messagesBlockRef.current) messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight)
        }
    }
    const [users, setUsers] = useState<userType[]>([])

    useEffect(() => {
        const localWebSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        setWebSocket(localWebSocket)
    }, [])

    const sendMessage = () => {
        webSocket?.send(message)
        setMessage('')
    }

    return (
        <div className="App">
            <div className="chat">
                <div className="messages" ref={messagesBlockRef}>
                    {users.map((u, index) => {
                        return (
                            <div key={index} className="message">
                                <img
                                    src={u.photo}
                                    alt="avatar"/>
                                <b>{u.userName}</b>
                                <span>{u.message}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="footer">
                        <textarea
                            name="newMessage"
                            cols={30}
                            rows={5}
                            onChange={(e) => setMessage(e.currentTarget.value)}
                            value={message}
                        />
                    <button
                        onClick={sendMessage}
                    >SEND
                    </button>
                </div>
            </div>
        </div>
    )
}
