'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import GLBThumbnail from '../ui/GLBThumbnail';

const defaultGlbUrl = 'https://models.readyplayer.me/66546bf4367a2b80debe21e5.glb';

export default function LaunchPage() {
  const { address } = useAccount();
  const [avatar, setAvatar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [glbUrl, setGlbUrl] = useState<string | null>(defaultGlbUrl);

  useEffect(() => {
    const fetchGlbUrl = async () => {
      const url = await generateGlbUrl();
      setGlbUrl(url || defaultGlbUrl);
    };

    fetchGlbUrl();
  }, []);

  useEffect(() => {
    const handleCreateAvatar = async () => {
      if (!thumbnailUrl || !glbUrl) return;

      setLoading(true);

      const traits = await generateTraits();

      const { data, error } = await supabase
        .from('avatars')
        .insert([{ owner: address, traits, glb_url: glbUrl, thumbnail_url: thumbnailUrl }]);

      if (error) {
        console.error(error);
      } else {
        setAvatar(data && data[0]);
      }
      setLoading(false);
    };

    handleCreateAvatar();
  }, [thumbnailUrl, glbUrl, address]);

  return (
    <div className="flex flex-col items-center">
      {glbUrl && <GLBThumbnail url={glbUrl} onThumbnailGenerated={setThumbnailUrl} />}
      <button
        onClick={() => {}}
        disabled={!address || loading || !thumbnailUrl}
        className="bg-secondary text-primary-dark py-2 px-4 rounded mb-4"
      >
        {loading ? 'Creating...' : 'Create Avatar'}
      </button>
      {avatar && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Avatar Created</h2>
          <Image src={avatar.thumbnail_url} alt="Avatar"
              sizes="500px"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={200}
              height={200}
              className='rounded-md mb-4' />
          <pre className="text-left bg-gray-100 p-2 rounded-md">{JSON.stringify(avatar.traits, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Mock functions for demonstration
async function generateGlbUrl() {
  return null;
}

async function generateTraits() {
  return { hair: 'brown', eyes: 'blue', outfit: 'casual' };
}
