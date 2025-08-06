import React, { useState } from 'react';
import usePopStore from '../store/popStore';

const ReactionBox = () => {
  const [text, setText] = useState('');
  const { addReaction, reactions, user } = usePopStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newReaction = {
      id: Date.now(),
      user: user?.name || 'Anonymous',
      content: text,
      timestamp: new Date().toLocaleString(),
    };

    addReaction(newReaction);
    setText('');
  };

  return (
    <section className="px-8 py-10 bg-[#1C1C3C] text-white">
      <h2 className="text-2xl font-bold text-[#FF6B6B] mb-4">Share Your Reaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you think?"
          className="flex-1 px-4 py-2 rounded bg-[#2C2C5C] text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#FF6B6B] text-white rounded hover:bg-[#ff4c4c] transition"
        >
          Post
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reactions.map((r) => (
          <div key={r.id} className="bg-[#2C2C5C] p-4 rounded shadow">
            <p className="text-yellow-400 font-semibold">{r.user}</p>
            <p className="text-gray-300">{r.content}</p>
            <p className="text-xs text-gray-500">{r.timestamp}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReactionBox;
