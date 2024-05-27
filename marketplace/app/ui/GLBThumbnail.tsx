import React, { useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import { supabase } from '../lib/supabaseClient';

const GLBThumbnail = ({ url, onThumbnailGenerated }: { url: string, onThumbnailGenerated: (dataUrl: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      if (canvasRef.current) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(256, 256);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 1.5, 3);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;

        const ambientLight = new THREE.AmbientLight(0x404040, 3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 10, 10).normalize();
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(url, async (gltf) => {
          scene.add(gltf.scene);
          controls.update();
          renderer.render(scene, camera);

          const dataUrl = canvasRef.current!.toDataURL('image/png');
          const file = dataURLtoFile(dataUrl, 'thumbnail.png');

          const response = await supabase.storage.from('thumbnails').upload(`thumbnails/${Date.now()}.png`, file);
          if (response.error) {
            console.error('Error uploading image:', response.error);
          } else {
            const publicUrl = supabase.storage.from('thumbnails').getPublicUrl(response.data.path).data.publicUrl;
            onThumbnailGenerated(publicUrl);
          }
        });
      }
    };

    generateThumbnail();
  }, [url, onThumbnailGenerated]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};

function dataURLtoFile(dataUrl: string, filename: string) {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default GLBThumbnail;
