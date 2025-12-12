import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SOCKET_URL } from '../../utils/apiConfig';
import io from 'socket.io-client';
import { addMessage, fetchChatHistory, fetchChatUsers } from '../../redux/slices/chatSlice';
import AdminLayout from '../Admin/AdminLayout';

const AdminChat = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.authState);
    const { messages } = useSelector((state) => state.chatState);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { users: chatUsers } = useSelector((state) => state.chatState); // Use users from Redux
    const socketRef = useRef();
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const selectedUserRef = useRef(null);

    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);
    
    useEffect(() => {
        if (user && user.role === 'admin') {
            dispatch(fetchChatUsers()); // Fetch all users with history

            socketRef.current = io(SOCKET_URL);
            socketRef.current.emit('join', user._id);

            socketRef.current.on('receiveMessage', (message) => {
                dispatch(addMessage(message));
            });

            socketRef.current.on('typing', (senderId) => {
                if (selectedUserRef.current && senderId === selectedUserRef.current._id) {
                    setIsTyping(true);
                }
            });

            socketRef.current.on('stopTyping', (senderId) => {
                if (selectedUserRef.current && senderId === selectedUserRef.current._id) {
                    setIsTyping(false);
                }
            });

            return () => {
                socketRef.current.disconnect();
            };
        }
    }, [user, token, dispatch]);

    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchChatHistory(selectedUser._id));
        }
    }, [selectedUser, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, selectedUser]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedUser) return;

        const messageData = {
            sender: user._id,
            receiver: selectedUser._id,
            message: messageInput,
        };

        socketRef.current.emit('sendMessage', messageData);
        dispatch(addMessage({ ...messageData, createdAt: new Date().toISOString() }));
        setMessageInput('');
    };

    return (
        <AdminLayout>
            <div className="h-[calc(100vh-100px)] flex bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {/* Users List */}
                <div className="w-1/3 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-noon-black">Active Chats</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {chatUsers.length === 0 ? (
                            <div className="p-4 text-center text-gray-400 text-sm">No chats found</div>
                        ) : (
                            chatUsers.map(u => (
                                <div 
                                    key={u._id} 
                                    onClick={() => setSelectedUser(u)} 
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${selectedUser?._id === u._id ? 'bg-blue-50 border-l-4 border-l-noon-blue' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                                           {u.profileImg ? <img src={u.profileImg} alt={u.name} className="w-full h-full object-cover"/> : <i className="fas fa-user"></i>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-noon-black">{u.name}</p>
                                            <p className="text-xs text-gray-400">{u.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-gray-50/50">
                    {selectedUser ? (
                        <>
                            <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-noon-yellow flex items-center justify-center text-noon-black font-bold">
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-noon-black">{selectedUser.name}</h3>
                                        <p className="text-xs text-green-500 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                                        </p>
                                        {isTyping && <p className="text-xs text-noon-blue font-bold animate-pulse">Typing...</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-sm ${
                                            msg.sender === user._id 
                                                ? 'bg-noon-blue text-white rounded-tr-none' 
                                                : 'bg-white text-noon-black rounded-tl-none border border-gray-100'
                                        }`}>
                                            <p>{msg.message}</p>
                                            <span className={`text-[10px] block mt-1 text-right ${msg.sender === user._id ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <form className="p-4 bg-white border-t border-gray-100 flex gap-2" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => {
                                        setMessageInput(e.target.value);
                                        
                                        if (!socketRef.current || !selectedUser) return;

                                        if (!typingTimeoutRef.current) {
                                             socketRef.current.emit('typing', { sender: user._id, receiver: selectedUser._id });
                                        }
                                        
                                        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

                                        typingTimeoutRef.current = setTimeout(() => {
                                            socketRef.current.emit('stopTyping', { sender: user._id, receiver: selectedUser._id });
                                            typingTimeoutRef.current = null;
                                        }, 2000);
                                    }}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-noon-blue focus:ring-1 focus:ring-noon-blue transition-all"
                                />
                                <button 
                                    type="submit"
                                    disabled={!messageInput.trim()}
                                    className="w-10 h-10 bg-noon-blue text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <i className="fas fa-paper-plane text-sm"></i>
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-comments text-3xl"></i>
                            </div>
                            <p className="text-lg font-medium">Select a user to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminChat;
