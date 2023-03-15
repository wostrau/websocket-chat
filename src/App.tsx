import React, {useEffect, useState} from 'react'
import './App.css'

type userType = {
    id: number
    name: string
    photo: string
    message: string
}

export const App: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const [users, setUsers] = useState<userType[]>([
        {id: 1, name: 'Sanya', photo: 'https://via.placeholder.com/100', message: 'I\'m here!'},
        {id: 2, name: 'Masha', photo: 'https://via.placeholder.com/100', message: 'I\'m not OK with this('}
    ])

    useEffect(() => {
        const webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        webSocket.onmessage = () => {
        }
    }, [])

    const sendMessage = () => {
        alert(message)
    }

    return (
        <div className="App">
            <div className="chat">
                <div className="messages">
                    {users.map(u => {
                        return (
                            <div key={u.id} className="message">
                                <img
                                    src={u.photo}
                                    alt="avatar"/>
                                <b>{u.name}</b>
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
