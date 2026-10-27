import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const defaultConfig = {
    imageCount: 12,
    imagePath: (i) => `/images/trail/${i}.jpg`,
    mobileBreakpoint: 768,
    gridSizeDesktop: 0.075,
    gridSizeMobile: 0.22,
    gridSpacing: 0.04,
    cursorReach: 0.35,
    maxImageScale: 3.5,
    driftSpeed: 50,
    followSpeed: 6,
    revealDur: 0.8,
};

export default function ImgTrail({
    images,
    title = "The Spotlight Effect",
    subtitle = "Move your cursor across the screen",
    customConfig = {},
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const config = {
            ...defaultConfig,
            ...customConfig,
            maxImageScale: customConfig.maxImageScale ?? customConfig.maxImgScale ?? defaultConfig.maxImageScale,
        };

        let imageBaseSize = 0;
        let spacing = 0;
        let gridStep = 0;
        let gridColumns = 0;
        let gridRows = 0;
        let cursorReach = 0;
        // let animationFrameId = null;

        function calculateGridLayout() {
            const viewW = window.innerWidth;
            const viewH = window.innerHeight;

            imageBaseSize =
                viewW >= config.mobileBreakpoint
                    ? viewW * config.gridSizeDesktop
                    : viewW * config.gridSizeMobile;

            spacing = viewW * config.gridSpacing;
            gridStep = imageBaseSize + spacing;

            gridColumns = Math.ceil(viewW / gridStep) + 3;
            gridRows = Math.ceil(viewH / gridStep) + 3;

            cursorReach = Math.min(viewW, viewH) * config.cursorReach;
        }

        function resizeClusterCanvas() {
            if (!canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const viewW = window.innerWidth;
            const viewH = window.innerHeight;

            canvas.width = viewW * dpr;
            canvas.height = viewH * dpr;

            canvas.style.width = `${viewW}px`;
            canvas.style.height = `${viewH}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            calculateGridLayout();
        }

        window.addEventListener("resize", resizeClusterCanvas);
        resizeClusterCanvas();

        // Load images
        const loadedImages = [];
        const imageSources = Array.isArray(images) && images.length > 0
            ? images
            : Array.from({ length: config.imageCount }, (_, i) => config.imagePath(i + 1));

        imageSources.forEach((src) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => {
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                    loadedImages.push(img);
                }
            };
            img.onerror = () => {
                // If local image fails, attempt fallback to placeholder or unsplash
                const fallbackImg = new Image();
                fallbackImg.crossOrigin = "anonymous";
                fallbackImg.src = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500/500`;
                fallbackImg.onload = () => {
                    if (fallbackImg.naturalWidth > 0) {
                        loadedImages.push(fallbackImg);
                    }
                };
            };
        });

        function imageAtGridPosition(col, row) {
            if (!loadedImages.length) return null;
            const index = Math.abs((col * 11 + row * 7) % loadedImages.length);
            return loadedImages[index];
        }

        const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const focalPoint = { x: mousePos.x, y: mousePos.y };

        const handlePointerMove = (e) => {
            const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
            const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
            if (clientX !== undefined && clientY !== undefined) {
                mousePos.x = clientX;
                mousePos.y = clientY;
            }
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("touchmove", handlePointerMove, { passive: true });

        function wrapAround(value, min, max) {
            const range = max - min;
            if (range <= 0) return min;
            return ((((value - min) % range) + range) % range) + min;
        }

        function cursorInfluence(distanceFromCursor, maxDistance) {
            if (distanceFromCursor >= maxDistance) return 0;
            const normalized = distanceFromCursor / maxDistance;
            const falloff = 1 - normalized * normalized;
            return falloff * falloff;
        }

        const clusterReveal = { intensity: 0 };

        function drawCluster(time, deltaTime) {
            const viewW = window.innerWidth;
            const viewH = window.innerHeight;
            const dt = Math.min((deltaTime || 16.6) / 1000, 0.1);

            focalPoint.x += (mousePos.x - focalPoint.x) * dt * config.followSpeed;
            focalPoint.y += (mousePos.y - focalPoint.y) * dt * config.followSpeed;

            ctx.clearRect(0, 0, viewW, viewH);

            if (!loadedImages.length) return;

            const elapsed = typeof time === "number" ? time : performance.now() / 1000;
            const driftX = elapsed * config.driftSpeed;
            const driftY = elapsed * -config.driftSpeed;

            const wrapMinX = -gridStep * 1.5;
            const wrapMaxX = viewW + gridStep * 1.5;
            const wrapMinY = -gridStep * 1.5;
            const wrapMaxY = viewH + gridStep * 1.5;

            for (let row = -1; row < gridRows; row++) {
                for (let col = -1; col < gridColumns; col++) {
                    const cellX = wrapAround(col * gridStep + driftX, wrapMinX, wrapMaxX);
                    const cellY = wrapAround(row * gridStep + driftY, wrapMinY, wrapMaxY);

                    const image = imageAtGridPosition(col, row);
                    if (!image || !image.complete || !image.naturalWidth) continue;

                    const aspectRatio = image.naturalWidth / image.naturalHeight;
                    if (!aspectRatio || isNaN(aspectRatio)) continue;

                    const imageWidth =
                        aspectRatio >= 1 ? imageBaseSize : imageBaseSize * aspectRatio;
                    const imageHeight =
                        aspectRatio >= 1 ? imageBaseSize / aspectRatio : imageBaseSize;

                    const cellCenterX = cellX + imageBaseSize / 2;
                    const cellCenterY = cellY + imageBaseSize / 2;
                    const distanceX = cellCenterX - focalPoint.x;
                    const distanceY = cellCenterY - focalPoint.y;
                    const distanceFromCursor = Math.sqrt(
                        distanceX * distanceX + distanceY * distanceY
                    );

                    if (distanceFromCursor > cursorReach) continue;

                    const influence = cursorInfluence(distanceFromCursor, cursorReach);
                    const imageScale =
                        influence * config.maxImageScale * clusterReveal.intensity;

                    if (imageScale < 0.02 || isNaN(imageScale)) continue;

                    const scaledWidth = imageWidth * imageScale;
                    const scaledHeight = imageHeight * imageScale;

                    ctx.save();
                    // Slight soft alpha fade towards outer edge of cursor reach
                    ctx.globalAlpha = Math.min(1, influence * 1.5);
                    ctx.drawImage(
                        image,
                        cellX + (imageBaseSize - scaledWidth) / 2,
                        cellY + (imageBaseSize - scaledHeight) / 2,
                        scaledWidth,
                        scaledHeight
                    );
                    ctx.restore();
                }
            }
        }

        gsap.ticker.add(drawCluster);

        const tween = gsap.to(clusterReveal, {
            intensity: 1,
            duration: config.revealDur,
            ease: "power2.out",
        });

        return () => {
            window.removeEventListener("resize", resizeClusterCanvas);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("touchmove", handlePointerMove);
            gsap.ticker.remove(drawCluster);
            if (tween) tween.kill();
        };
    }, [images, customConfig]);

    return (
        <section className="spotlight relative w-full h-screen overflow-hidden bg-black flex items-center justify-center select-none">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="relative z-10 text-center pointer-events-none px-6">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2 font-medium border border-neutral-800 bg-neutral-900/60 backdrop-blur-md px-3 py-1 rounded-full">
                    Interactive Grid
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-b from-white via-neutral-200 to-neutral-500 tracking-tight">
                    {title}
                </h1>
                <p className="mt-3 text-sm md:text-base text-neutral-400 max-w-md mx-auto">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
