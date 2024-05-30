'use client'

import React from 'react';
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';

interface SetupAvatarProps {
  onAvatarExported: (url: string) => void;
}

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = {
  width: '100%',
  height: '80vh',
  border: 'none',
  marginBlock: 'auto',
};

const SUBDOMAIN = 'https://phygitals.readyplayer.me/en/avatar';

export default function SetupAvatar({ onAvatarExported }: SetupAvatarProps) {
  const handleOnAvatarExported = (event: any) => {
    const url = event.data.url;
    console.log(event.data);
    console.log(url)
    onAvatarExported(url);
  };

  return (
    <main className='h-screen bg-fuchsia-950'>
      <section className='h-5/6 bg-orange-700'>
        <AvatarCreator
          subdomain="SUBDOMAIN"
          config={config}
          style={style}
          onAvatarExported={handleOnAvatarExported}
        />
      </section>
    </main>
  );
}