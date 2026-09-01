import Link from "next/link";
import { Container } from "../container";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const NavbarScroll = () => {
  const navItems = [
    { title: "Projects", href: "/projects " },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];
  const [hovered, setHovered] = useState(null);
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
 
    (latest > 20) ? setScrolled(true) : setScrolled(false);
    
  });

  return (
    <Container className="relative">
      <motion.nav
        animate={{ 
            boxShadow: scrolled ? "var(--shadow-custom)" : "none" ,
            width: scrolled ? "40%" : "100%",
            y : scrolled ? 10 : 0,
        }}
        transition={{
            duration: 0.5,
            ease: "linear",
        }}
        className="z-1000 fixed inset-x-0 top-0 mx-auto backdrop-blur-xs flex max-w-4xl items-center justify-between p-2 rounded-full "
        layoutId=""
      >
        <Link href={'/'}>
          <Image
            className="h-10 w-10 rounded-full"
            src="/me.jpg"
            height="100"
            width="100"
            alt={"avatar"}
          />
        </Link>
        <div className="flex items-center">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-4 py-1 text-sm"
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="absolute inset-0 z-8 h-full w-full rounded-full bg-neutral-300 dark:bg-neutral-800"
                />
              )}
              <span className="relative z-10 text-lg font-medium">{item.title} </span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </Container>
  );
};

export default NavbarScroll;
