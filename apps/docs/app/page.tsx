'use client'
import { useEffect } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls} from 'three/addons/controls/OrbitControls.js';


export default function Home() {
  let canvas: HTMLElement
  useEffect(() => {
    if (canvas) return
    canvas = document.getElementById('canvas')!
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    canvas = document.getElementById('canvas')!
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfe3dd );

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const loader = new GLTFLoader();
    
    const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 100 );
		camera.position.set( -10, 0, 10 );
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    
    /// lighting ///

    const light = new THREE.AmbientLight(0xffffff);
    light.position.set(10, 10, 10);
    scene.add(light);

    loader.load('/model/adamHead/adamHeadNew.gltf', function ( gltf ) {
      scene.add( gltf.scene )
  }, undefined, function ( error ) {
    console.error( error );
  } );

  // MUST HAVE TO RENDER ANIMATION EVERY SEC!!!
  const tick = () => {
    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
  }
  tick()
  },[])

  return (
    <>
    <h2 className="heading2">Turborepo test site 2 : ThreeJS model</h2>
    <canvas id="canvas"></canvas>
    </>
  );
}
