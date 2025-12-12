import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { addMessage, fetchChatHistory } from '../../redux/slices/chatSlice';
import { SOCKET_URL } from '../../utils/apiConfig';
import API_URL from '../../utils/apiConfig';

const ChatWidget = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.authState);
    const { messages } = useSelector((state) => state.chatState);
    const [isOpen, setIsOpen] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const [adminId, setAdminId] = useState(null);
    const socketRef = useRef();
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch Real Admin ID on mount
    useEffect(() => {
        if (user && token) {
            const getAdmin = async () => {
                try {
                    const res = await fetch(`${API_URL}/users/admin-id`, {
                         headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        setAdminId(data.data);
                    }
                } catch (err) {
                    console.error("Failed to get admin ID", err);
                }
            };
            getAdmin();
        }
    }, [user, token]);

    useEffect(() => {
        if (user && token && adminId) {
            socketRef.current = io(SOCKET_URL);
            socketRef.current.emit('join', user._id);

            socketRef.current.on('receiveMessage', (message) => {
                dispatch(addMessage(message));
                setIsTyping(false); // Stop typing if message received
            });

            socketRef.current.on('typing', (senderId) => {
                 if (senderId === adminId) setIsTyping(true);
            });

            socketRef.current.on('stopTyping', (senderId) => {
                 if (senderId === adminId) setIsTyping(false);
            });
            
            // Pass adminId to fetch history between USER and ADMIN
            dispatch(fetchChatHistory(adminId));

            return () => {
                socketRef.current.disconnect();
            };
        }
    }, [user, token, adminId, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !socketRef.current || !adminId) return;

        const messageData = {
            sender: user._id,
            receiver: adminId, 
            message: messageInput,
        };

        socketRef.current.emit('sendMessage', messageData);
        // Optimistically add
        dispatch(addMessage({ ...messageData, _id: Date.now().toString(), createdAt: new Date().toISOString() })); 
        setMessageInput('');
    };

    if (!user || user.role === 'admin') return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button 
                    className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-noon-yellow to-yellow-500 hover:scale-110 animate-bounce-subtle"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="fas fa-comment-dots text-black text-2xl"></i>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-0 right-0 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-fade-in-up h-[600px]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-900 to-black p-4 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative">
                                <i className="fas fa-headset text-noon-yellow text-lg"></i>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-md">Noon Support</h3>
                                <p className="text-xs text-gray-300">We typically reply in minutes</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-[#e5ddd5] space-y-3" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}>
                        {/* Welcome Message */}
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-800 px-4 py-2 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-sm relative">
                                <p>👋 Hello {user.name.split(' ')[0]}! How can we help you today?</p>
                                <span className="text-[10px] text-gray-400 block text-right mt-1">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>

                        {messages.map((msg, index) => {
                            const isMe = msg.sender === user._id;
                            return (
                                <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`px-4 py-2 rounded-lg shadow-sm max-w-[80%] text-sm relative ${
                                        isMe 
                                            ? 'bg-[#d9fdd3] text-gray-800 rounded-tr-none' 
                                            : 'bg-white text-gray-800 rounded-tl-none'
                                    }`}>
                                        <p>{msg.message}</p>
                                        <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-green-800/60' : 'text-gray-400'}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {isMe && <i className="fas fa-check-double ml-1 text-blue-500"></i>}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Typing Bubble */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form className="p-3 bg-gray-100 flex gap-2 items-center" onSubmit={handleSendMessage}>
                        <button type="button" className="text-gray-500 hover:text-gray-700 p-2">
                             <i className="fas fa-paperclip"></i>
                        </button>
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => {
                                setMessageInput(e.target.value);
                                if (!socketRef.current || !adminId) return;

                                if (!typingTimeoutRef.current) {
                                    socketRef.current.emit('typing', { sender: user._id, receiver: adminId });
                                }
                                
                                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

                                typingTimeoutRef.current = setTimeout(() => {
                                    socketRef.current.emit('stopTyping', { sender: user._id, receiver: adminId });
                                    typingTimeoutRef.current = null;
                                }, 2000);
                            }}
                            placeholder="Type a message..."
                            className="flex-1 bg-white border-none rounded-full px-4 py-2.5 text-sm focus:ring-0 shadow-sm"
                        />
                        {messageInput.trim() ? (
                            <button 
                                type="submit" 
                                className="w-10 h-10 bg-noon-yellow text-black rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all shadow-md transform hover:scale-105"
                            >
                                <i className="fas fa-paper-plane text-sm"></i>
                            </button>
                        ) : (
                             <button type="button" className="text-gray-500 hover:text-gray-700 p-2">
                                <i className="fas fa-microphone"></i>
                            </button>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
