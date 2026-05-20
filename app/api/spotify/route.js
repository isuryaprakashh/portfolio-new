import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const username = process.env.LASTFM_USERNAME;
  const apiKey = process.env.LASTFM_API_KEY;

  if (!username || !apiKey) {
    // Mock response if env vars are missing
    return NextResponse.json({
      isPlaying: true,
      title: "Set up Last.fm Env Vars",
      artist: "Surya Prakash",
      albumImageUrl: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      songUrl: "#"
    });
  }

  try {
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await res.json();
    const track = data.recenttracks?.track?.[0];

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = track['@attr']?.nowplaying === 'true';
    const title = track.name;
    const artist = track.artist['#text'];
    
    // Find highest quality image
    const imageObj = track.image.find(img => img.size === 'extralarge') 
      || track.image.find(img => img.size === 'large') 
      || track.image[track.image.length - 1];
      
    const albumImageUrl = imageObj ? imageObj['#text'] : '';
    
    // Redirect to Spotify Search instead of Last.fm
    const songUrl = `https://open.spotify.com/search/${encodeURIComponent(title + ' ' + artist)}`;

    return NextResponse.json({
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    return NextResponse.json({ isPlaying: false });
  }
}
