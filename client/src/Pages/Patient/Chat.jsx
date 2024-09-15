import React from 'react';
import ChatInbox from '../Admin/components/Chat/ChatInbox';
import ChatInboxPage from '../Admin/components/Chat/ChatInboxPage';

const PChat = () => {
    return (
        <div className='relative pb-10'>
        <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70"> Chat</h1>

        <ChatInboxPage/>

    </div >
    );
}

export default PChat;
