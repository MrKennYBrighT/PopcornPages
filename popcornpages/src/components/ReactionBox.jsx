import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import popStore from '../store/popStore';

const ReactionBox = () => {
  const [text, setText] = useState('');
  const reactions = popStore((state) => state.reactions);
  const addReaction = popStore((state) => state.addReaction);
  const updateReactionEmoji = popStore((state) => state.updateReactionEmoji);
  const user = popStore((state) => state.user);
  const isLoggedIn = popStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!isLoggedIn || !user) {
      toast((t) => (
        <span>
          You need to <strong>login</strong> or <strong>sign up</strong> to post a reaction.
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                navigate('/login');
                toast.dismiss(t.id);
              }}
              style={{
                backgroundColor: '#FF6B6B',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate('/signup');
                toast.dismiss(t.id);
              }}
              style={{
                backgroundColor: '#FFD966',
                color: '#1C1C3C',
                padding: '6px 12px',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </button>
          </div>
        </span>
      ));
      return;
    }

    const newReaction = {
      user: user.name,
      content: text,
      timestamp: new Date().toLocaleString(),
      emojis: [],
    };

    addReaction(newReaction);
    setText('');
  };

  const handleEmojiClick = (reactionId, emoji) => {
    if (!isLoggedIn || !user) {
      toast.error('Login to react with emojis');
      return;
    }

    updateReactionEmoji(reactionId, emoji);
  };

  return (
    <section id="reaction-box" className="px-8 py-10 bg-[#1C1C3C] text-white">
      <h2 className="text-2xl font-bold text-[#FF6B6B] mb-4">Share Your Reaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you think?"
          maxLength={240}
          className="px-4 py-2 rounded bg-[#2C2C5C] text-white placeholder-yellow-400 focus:outline-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{text.length} / 240</span>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-[#FF6B6B] text-white rounded hover:bg-[#ff4c4c] transition"
        >
          Post My Pop
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reactions.map((r) => (
          <div key={r.id} className="bg-[#2C2C5C] p-4 rounded shadow">
            <p className="text-[#FF6B6B] font-semibold">{r.user}</p>
            <p className="text-gray-300">{r.content}</p>
            <p className="text-xs text-gray-500">{r.timestamp}</p>

            {/* Emoji Reaction Buttons */}
            <div className="mt-2 flex gap-2">
              {['👍', '😂', '😱', '❤️'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(r.id, emoji)}
                  className="text-xl hover:scale-110 transition"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Display emojis */}
            {r.emojis && r.emojis.length > 0 && (
              <div className="mt-2 text-sm text-yellow-400 flex gap-1">
                {r.emojis.map((e, i) => (
                  <span key={`${r.id}-emoji-${i}`}>{e}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReactionBox;
