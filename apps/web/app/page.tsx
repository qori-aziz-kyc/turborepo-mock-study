'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button } from "@repo/ui/button";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLElement | any>();
  const container2 = useRef<HTMLElement | any>();
  const tl = useRef<GSAPTimeline | any>();

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.box');
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 150, y: 80, rotation: 360 })
        .to(boxes[1], { x: 50, y: -10, rotation: 360 })
        .to(boxes[2], { x:-150,y: -100, rotation: -360 })
        .to(boxes[3], { x:-50 ,y: -190, rotation: -360  })
        .reverse();
    },
    { scope: container }
  );

  useGSAP(
    () => {
        const circles = gsap.utils.toArray('.circle')
        circles.forEach((circle) => {
          gsap.to(circle, {
            x: -900,
            y : -400,
            scrollTrigger: {
              trigger: circle,
              start: 'bottom bottom',
              end: 'top 20%',
              scrub : true,
            }
          })
        })
    }, {scope:container2}
  );

  return (
    <main>
      <section className="boxes-container" ref={container}>
        <h2>Test Site: Click button</h2>
        <Button
          onClick = {toggleTimeline}
          className="mx-auto rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        >
          Toggle Timeline
        </Button>
          {/* <button onClick={toggleTimeline}>Toggle Timeline</button> */}
        <div className="box gradient-green-2">I</div>
        <div className="box gradient-blue">R</div>
        <div className="box gradient-red">Q</div>
        <div className="box gradient-green-2">O</div>
      </section>
      <section className="section flex-center column">
        <h2>Basic ScrollTrigger !</h2>
        <p>Scroll down to start</p>
      </section>
      <div className="section2 flex-right column" ref={container2}>
        <div className="circle gradient-red">circle 1</div>
        <div className="circle gradient-blue">circle 2</div>
        <div className="circle gradient-green-2">circle 3</div>
        <div className="circle gradient-red">circle 4</div>
        <div className="circle gradient-blue">circle 5</div>
        <div className="circle gradient-green-2">circle 6</div>
      </div>
    </main>
  );
}
