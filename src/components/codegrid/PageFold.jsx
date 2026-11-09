/* eslint-disable no-unused-vars */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import * as THREE from 'three';


gsap.registerPlugin(ScrollTrigger);



export default function PageFold(){ 

    const secRef = useRef(null);


    useGSAP(async () => {
        const secCurr = secRef.current;

        const letter = document.querySelector(".letter");
        const spotlight = document.querySelector(".spotlight");

        const dpr = Math.min(window.devicePixelRatio, 2);

        // await document.fonts.ready;

         async function SnapShot() {
            return await html2canvas(letter, {
                scale: dpr,
                useCORS: true,
                backgroundColor: "#ffffff",
                ignoreElements: (element) => element.classList.contains("letter-canvas"), // webgl render issue
            });
        };

        const letterRect = letter.getBoundingClientRect();
        const spotlightRect = spotlight.getBoundingClientRect();

        const letterWidth = letterRect.width;
        const letterHeight = letterRect.height;

        const viewWidth = spotlightRect.width;
        const viewHeight = spotlightRect.height;

        // letter.style.visibility = 'hidden';

        //  3js scene
        const scene = new THREE.Scene();

        const cameraDistance = letterHeight * 1.5;
        const cameraNear = cameraDistance * 0.3;
        const cameraFar = cameraDistance * 2;
        const spotlightCenterY = spotlightRect.top + window.scrollY + viewHeight / 2;

        const camera = new THREE.PerspectiveCamera();

        //  custom projection
        function updateCamera() {
            const viewportCenterY = window.scrollY + window.innerHeight / 2;

            const eyeY = THREE.MathUtils.clamp(
                spotlightCenterY - viewportCenterY,
                -viewHeight / 2,
                viewHeight / 2
            );

            camera.position.set(0, eyeY, cameraDistance);

            const frustumScale = cameraNear / cameraDistance;

            camera.projectionMatrix.makePerspective(
                (-viewWidth / 2) * frustumScale,
                (viewWidth / 2) * frustumScale,
                (viewHeight / 2 - eyeY) * frustumScale,
                (-viewHeight / 2 - eyeY) * frustumScale,
                cameraNear,
                cameraFar,
            );

            camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
        };

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(dpr);
        renderer.setSize(viewWidth, viewHeight);

        renderer.domElement.classList.add("letter-canvas");

        Object.assign(renderer.domElement.style, {
            position: "absolute",
            top: "0",
            left: "0",
            pointerEvents: "none",
        });
        spotlight.appendChild(renderer.domElement);


        const snapshot = await SnapShot();
            letter.style.visibility = 'hidden';

        const letterTexture = new THREE.CanvasTexture(snapshot);
        letterTexture.minFilter = THREE.LinearFilter;
        letterTexture.magFilter = THREE.LinearFilter;
        letterTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        letterTexture.needsUpdate = true;

        const frontMaterial = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            uniforms: {uTexture: {value: letterTexture}},
            vertexShader,
            fragmentShader: frontFragmentShader
        });

        const backMaterial = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            vertexShader,
            fragmentShader: backFragmentShader
        }); 


        const panelHeight = letterHeight / 3;
        const leyerGap = 1;
        const backBleed = 2;

        const backGeometry = new THREE.PlaneGeometry(
            letterWidth + backBleed * 2,
            panelHeight + backBleed * 2
        );

        function createPanel(index) {
            const frontGeometry = new THREE.PlaneGeometry(letterWidth, panelHeight);
            const uvs = frontGeometry.attributes.uv;
            const vMin = 1 - (index + 1) / 3;
            for (let i = 0; i < uvs.count; i++) {
                uvs.setY(i, vMin + uvs.getY(i) / 3);
            }

            const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);

            const backMesh = new THREE.Mesh(backGeometry, backMaterial);
            backMesh.rotation.y = Math.PI;

            const panel = new THREE.Group();
            panel.add(frontMesh, backMesh);
            return panel;
        };


        const paper = new THREE.Group();
        paper.position.set(
            letterRect.left + letterWidth / 2 - (spotlightRect.left + viewWidth / 2),
            spotlightRect.top + viewHeight / 2 - (letterRect.top + letterHeight / 2),
            0
        );

        scene.add(paper);

        const topPanel = createPanel(0);
        topPanel.position.y = letterHeight / 2 - panelHeight / 2;
        paper.add(topPanel);

        const topFold = new THREE.Group();
        topFold.position.y = letterHeight / 2 - panelHeight;
        paper.add(topFold);

        const middlePanel = createPanel(1);
        middlePanel.position.y = -panelHeight / 2;
        topFold.add(middlePanel);

        const bottomFold = new THREE.Group();
        bottomFold.position.y = -panelHeight;
        topFold.add(bottomFold);

        const bottomPanel = createPanel(2);
        bottomPanel.position.y = -panelHeight / 2;
        bottomFold.add(bottomPanel);

        const FOLDED_ANGLE = -Math.PI;
        topFold.rotation.x = FOLDED_ANGLE;
        bottomFold.rotation.x = FOLDED_ANGLE;

        function updateLayering(){
            const topFoldAmt = topFold.rotation.x / FOLDED_ANGLE;
            const bottomFoldAmt = bottomFold.rotation.x / FOLDED_ANGLE;

            middlePanel.position.z = -leyerGap * 2 * topFoldAmt;
            bottomFold.position.z = -leyerGap * 2 * topFoldAmt;
            bottomPanel.position.z = -leyerGap * bottomFoldAmt;
        };

        // animation
        const UNFOLD_DURATION = 0.75;
        const UNFOLD_EASE = "power2.inOut";

        const unfoldTimeline = gsap
        .timeline({ paused: true })
        .addLabel("folded")
        .to(topFold.rotation, {
            x: 0,
            duration: UNFOLD_DURATION,
            ease: UNFOLD_EASE,
        })
        .addLabel("firstOpen")
        .to(bottomFold.rotation, {
            x: 0,
            duration: UNFOLD_DURATION,
            ease: UNFOLD_EASE,
        })
        .addLabel("open");


        const step_labels = ["folded", "firstOpen", "open"];
        const first_fold_at = 0;
        const second_fold_at = 0.2;

        let currentStep = 0;
        let currentTween = null;


        function onScrollProgress(progress) {
            const step = progress > second_fold_at ? 2 : progress > first_fold_at ? 1 : 0;

            if (step === currentStep) return;
            currentStep = step;

            currentTween?.kill();
            currentTween = unfoldTimeline.tweenTo(step_labels[step]);
        };

        const scrollTrigger = ScrollTrigger.create({
            trigger: spotlight,
            start: "top top",
            end: "75% top",
            onUpdate: (self) => onScrollProgress(self.progress),
        });

        onScrollProgress(scrollTrigger.progress);

        function render() {
            updateCamera();
            updateLayering();
            renderer.render(scene, camera);
        };

        gsap.ticker.add(render);


    }, {scope: secRef});

    return (
        <section ref={secRef} className="relative w-full p-2 overflow-hidden">

            <div className="top h-svh w-full "></div>

            {/* letter */}
            {/* <canvas className="block absolute m-auto"></canvas> */}
            <section className='spotlight bg-white/60 relative w-full h-[120vh] overflow-hidden flex items-center justify-center '>
                <div className="letter bg-white border text-sm w-1/2 max-w-300 px-10 py-4 flex flex-col gap-8"> 
                    <div className="one">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, voluptatem delectus! Deleniti, nesciunt ullam fugit eius reprehenderit facilis perspiciatis adipisci pariatur fuga unde magnam quo officiis inventore rem, nulla libero?
                        Odio, error blanditiis qui nobis accusantium adipisci praesentium delectus atque, est nostrum illum consequatur labore non! Similique minus ad voluptatem corporis modi ratione quis ab numquam vitae iste, eaque exercitationem.
                    </div>
                    <div className="two">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, voluptatem delectus! Deleniti, nesciunt ullam fugit eius reprehenderit facilis perspiciatis adipisci pariatur fuga unde magnam quo officiis inventore rem, nulla libero?
                        Odio, error blanditiis qui nobis accusantium adipisci praesentium delectus atque, est nostrum illum consequatur labore non! Similique minus ad voluptatem corporis modi ratione quis ab numquam vitae iste, eaque exercitationem.
                    </div>
                    <div className="three">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, voluptatem delectus! Deleniti, nesciunt ullam fugit eius reprehenderit facilis perspiciatis adipisci pariatur fuga unde magnam quo officiis inventore rem, nulla libero?
                        Odio, error blanditiis qui nobis accusantium adipisci praesentium delectus atque, est nostrum illum consequatur labore non! Similique minus ad voluptatem corporis modi ratione quis ab numquam vitae iste, eaque exercitationem.
                    </div>
                </div>
            </section>

            <div className="bottom h-svh w-full "></div>

        </section>
    )
};



// shaders
export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const grainChunk = `
  const float GRAIN_STRENGTH = 0.1;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
`;

export const frontFragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  ${grainChunk}

  float noise(float x, float seed){
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(vec2(i, seed)), hash(vec2(i + 1.0, seed)), u); 
  }

  float foldCrease(vec2 uv, float foldY, float seed) {
    float tilt = (hash(vec2(seed, 91.0)) - 0.5) * 0.012 * (uv.x - 0.5);

    float wobble =
        (noise(uv.x * 2.5, seed) - 0.5) * 0.012 +
        (noise(uv.x * 9.0, seed + 7.0) - 0.5) * 0.005 +
        (noise(uv.x * 37.0, seed + 13.0) - 0.5) * 0.0015;

    float depth = mix(0.35, 1.4, noise(uv.x * 6.0, seed + 19.0));

    float d = uv.y - (foldY + tilt + wobble);

    float crease = exp(-pow(d / 0.0018, 2.0)) * 0.2 * depth;
    float shadow = exp(-pow((d + 0.009) / 0.012, 2.0)) * 0.065 * depth;
    float highlight = exp(-pow((d - 0.0042) / 0.006, 2.0)) * 0.055;

    return -crease - shadow + highlight;
  }

    void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float grain = hash(gl_FragCoord.xy);

    float creases =
        foldCrease(vUv, 0.6667, 3.0) + foldCrease(vUv, 0.3333, 11.0);

    vec3 color = texColor.rgb - grain * GRAIN_STRENGTH + creases;
    gl_FragColor = vec4(color, texColor.a);
    }
`;

export const backFragmentShader = `
  ${grainChunk}

  void main() {
    float grain = hash(gl_FragCoord.xy);
    gl_FragColor = vec4(vec3(1.0 - grain * GRAIN_STRENGTH), 1.0);
  }
`;