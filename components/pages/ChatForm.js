import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
const ChatForm = ({ onSend }) => {
    const {data: session} = useSession({required:false});

  const [user, setUser] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(user, content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {<input
        type="text"
        placeholder="Your username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
  />}
      <input
        type="text"
        placeholder="Type your message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatForm;