'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAccount } from 'wagmi';
import Image from 'next/image';

interface Avatar {
  id: string;
  glb_url: string;
  image_url: string;
  attributes: Record<string, any>;
}

export default function DashboardPage() {
  const { address } = useAccount();
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.from('avatars').select('*').eq('owner', address);
      if (error) {
        console.error(error);
      } else if (data) {
        setAvatars(data);
      }
    };

    if (address) {
      fetchAvatars();
    }
  }, [address]);

  return (
    <div className="px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="border rounded-lg p-4 shadow-lg bg-white">
            <Image
              src={avatar.image_url}
              alt="Avatar"
              sizes="500px"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={200}
              height={200}
              className="rounded-md"
            />
            <pre className="text-left bg-gray-100 p-2 rounded-md text-primary-dark">{JSON.stringify(avatar.attributes, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
