"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Avatar {
  id: string;
  glb_url: string;
  thumbnail_url: string;
  traits: Record<string, any>;
}

export default function Page() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.from("avatars").select("*");
      if (error) {
        console.error(error);
      } else if (data) {
        setAvatars(data);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <div className="px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className="border rounded-lg p-4 shadow-lg bg-white"
          >
            <Image
              src={avatar.thumbnail_url}
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
            <pre className="text-left bg-gray-100 p-2 rounded-md text-primary-dark">
              {JSON.stringify(avatar.traits, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
