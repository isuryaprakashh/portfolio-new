'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SpotifyPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSpotify();
    // Refresh every 15 seconds
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <motion.a
      href={data.songUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-transparent p-1.5 flex items-center gap-3 transition-all duration-300 group max-w-[270px] min-w-[200px]"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -3, scale: 1.02 }}
    >
      <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-transparent shadow-xs">
        {data.albumImageUrl ? (
          <img 
            src={data.albumImageUrl} 
            alt="Album Art" 
            className={`w-full h-full object-cover rounded-full ${data.isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} 
            style={{ animationPlayState: data.isPlaying ? 'running' : 'paused' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954">
               <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5c-.2.3-.5.4-.8.2-2.1-1.3-4.8-1.6-8-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.5-.8 6.5-.4 8.9 1.1.4.2.4.6.3.8zm1-2.7c-.2.4-.7.5-1.1.2-2.4-1.5-6.1-1.9-9.1-1.1-.4.1-.9-.1-1-.6-.1-.5.1-.9.6-1 3.5-.9 7.6-.4 10.4 1.3.4.3.5.8.2 1.2zm.1-2.9c-2.9-1.7-7.7-1.9-10.5-1.1-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 3.3-.9 8.7-.7 12 1.2.5.3.7.9.4 1.5-.3.6-.9.8-1.2.5z"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          {data.isPlaying ? (
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5c-.2.3-.5.4-.8.2-2.1-1.3-4.8-1.6-8-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.5-.8 6.5-.4 8.9 1.1.4.2.4.6.3.8zm1-2.7c-.2.4-.7.5-1.1.2-2.4-1.5-6.1-1.9-9.1-1.1-.4.1-.9-.1-1-.6-.1-.5.1-.9.6-1 3.5-.9 7.6-.4 10.4 1.3.4.3.5.8.2 1.2zm.1-2.9c-2.9-1.7-7.7-1.9-10.5-1.1-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 3.3-.9 8.7-.7 12 1.2.5.3.7.9.4 1.5-.3.6-.9.8-1.2.5z"/>
              </svg>
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] bg-[#1DB954] h-[60%] animate-pulse"></span>
                <span className="w-[2px] bg-[#1DB954] h-[100%] animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-[2px] bg-[#1DB954] h-[40%] animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5c-.2.3-.5.4-.8.2-2.1-1.3-4.8-1.6-8-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.5-.8 6.5-.4 8.9 1.1.4.2.4.6.3.8zm1-2.7c-.2.4-.7.5-1.1.2-2.4-1.5-6.1-1.9-9.1-1.1-.4.1-.9-.1-1-.6-.1-.5.1-.9.6-1 3.5-.9 7.6-.4 10.4 1.3.4.3.5.8.2 1.2zm.1-2.9c-2.9-1.7-7.7-1.9-10.5-1.1-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 3.3-.9 8.7-.7 12 1.2.5.3.7.9.4 1.5-.3.6-.9.8-1.2.5z"/>
            </svg>
          )}
          <span className="text-[9px] font-bold text-[#1DB954] uppercase tracking-wider">
            {data.isPlaying ? 'Listening Now' : 'Last Listened'}
          </span>
        </div>
        
        <span className="text-[12px] font-semibold text-[var(--color-deep-ink)] truncate w-full group-hover:text-[var(--color-primary)] transition-colors">
          {data.title || 'Not Listening'}
        </span>
        <span className="text-[10px] text-[var(--color-text-secondary)] truncate w-full">
          {data.artist || 'Spotify'}
        </span>
      </div>
    </motion.a>
  );
}
