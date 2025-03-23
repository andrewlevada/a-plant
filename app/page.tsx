'use client'

import Image from "next/image";
import skyImage from "./sky.png";
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image 
          src={skyImage} 
          alt="a photo of a sky i took on a road trip with my friends, saturation increased" 
          placeholder="blur"
          quality={100} 
          fill 
          className="object-cover" 
        />
      </div>

      <div className="relative z-10 grid grid-cols-3 px-[26px] pt-[22px]">
        <div className="col-span-1 text-left space-y-2">
          <p>this is a place for my links</p>

          <p className="text-[#ffff00]">my name is andrew (or andrey), 20 years old <br />
          i really enjoy imagining and building digital things <br />
          that help, inspire, and feel nice</p>
        </div>

        <div className="col-span-1 text-center space-y-2">
          <p>~ hi, welcome ~</p>
        </div>

        <div className="col-span-1 text-right space-y-2">
          <p>2025</p>
          <p>{floatingLinks.length} links</p>
        </div>
      </div>

      <div className="absolute inset-0 z-10 mix-blend-color-burn @container">
        {floatingLinks.map((link) => (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" key={link.href}
               style={{ transform: `translate(${link.x}px, ${link.y}px)` }}>
            <motion.div
              initial={{ y: 0, rotate: link.rotate, color: "#626245" }}
              whileHover={{ 
                y: -10,
                rotate: 0,
                color: "#000000"
              }}
              transition={{ duration: 0.2 }}
            >
              <Link href={link.href} target="_blank">
                <p className="text-center">{link.content}</p>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </main>
  );
}

interface FloatingLink {
  href: string;
  content: React.ReactNode;
  x: number;
  y: number;
  rotate: number;
}

const floatingLinks: FloatingLink[] = [
  {
    href: "https://portfolio-of-andrew.vercel.app/",
    content: (<>↗ <br /> portfolio v2 <br /> → Aviasales</>),
    x: -420,
    y: -320,
    rotate: 6
  },
  {
    href: "https://andrewlevada.github.io/",
    content: (<>↗ <br /> portfolio v1 <br /> → Icons8</>),
    x: 160,
    y: -260,
    rotate: -4
  },
  {
    href: "https://adrw.page/",
    content: (<>↗ <br /> a pile <br /> of images</>),
    x: 360,
    y: -300,
    rotate: -8
  }
]