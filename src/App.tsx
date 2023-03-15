import React, {useEffect, useState} from 'react'
import './App.css'

type userType = {
    userId: number
    userName: string
    photo: string
    message: string
}

export const App: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const [webSocket, setWebSocket] = useState<null | WebSocket>(null)
    const [users, setUsers] = useState<userType[]>([])

    useEffect(() => {
        const localWebSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        localWebSocket.onmessage = (messageEvent) => {
            const messages = JSON.parse(messageEvent.data)
            setUsers(messages)
        }
        setWebSocket(localWebSocket)
    }, [])

    const sendMessage = () => {
        webSocket?.send(message)
    }

    return (
        <div className="App">
            <div className="chat">
                <div className="messages">
                    {users.map(u => {
                        return (
                            <div key={u.userId} className="message">
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
                            defaultValue={message}
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
