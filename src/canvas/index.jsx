import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Canvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // if(mountRef.current != null)
    //     return;
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Load GLTF Model
    let mixer;
    const loader = new GLTFLoader();
    loader.load(
      '/assets/spiderman.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -1, 0); // Adjust model position
        scene.add(model);
        
        // Animation Mixer
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          console.log(clip)
          mixer.clipAction(clip).play();
        });
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the GLTF model:', error);
      }
    );

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) 
        mixer.update(delta);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref = {mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Canvas;
