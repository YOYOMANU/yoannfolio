import { MouseEvent, Ref, RefObject, useRef } from 'react';
import { useMotionValue, useTransform, useSpring, motion } from 'framer-motion';

export default function ProfilePhoto({ PhotoProfil }: { PhotoProfil: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width - 0.5);
            y.set((e.clientY - rect.top) / rect.height - 0.5);
        }
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="reveal"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="photo-section"
                style={{ rotateX, rotateY, transformPerspective: 1000 }}
            >
                <div className="photo-frame">
                    <div className="photo-container">
                        {PhotoProfil ? (
                            <img src={PhotoProfil} alt="Yoann Emmanuel" />
                        ) : (
                            <div className="photo-placeholder" style={{ display: 'flex' }}>YE</div>
                        )}
                    </div>
                    <span className="frame-corner tl" />
                    <span className="frame-corner br" />
                </div>
            </motion.div>
        </motion.div>
    );
}