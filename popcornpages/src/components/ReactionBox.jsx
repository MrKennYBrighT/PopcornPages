import React, { useState } from 'react';
import usePopStore from '../store/popStore';

const ReactionBox = () => {
  const [text, setText] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const { addReaction, reactions, user } = usePopStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newReaction = {
      id: Date.now(),
      user: user?.name || 'Anonymous',
      content: text,
      spoiler: isSpoiler,
      timestamp: new Date().toLocaleString(),
    };

    addReaction(newReaction);
    setText('');
    setIsSpoiler(false);
  };

  return (
    <section className="px-8 py-10 bg-[#1C1C3C] text-white">
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
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className="accent-yellow-400"
            />
            Mark as spoiler
          </label>
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
            {r.spoiler && <p className="text-xs text-red-400 italic">⚠️ Spoiler</p>}
            <p className="text-xs text-gray-500">{r.timestamp}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReactionBox;
