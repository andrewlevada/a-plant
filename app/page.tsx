import Image from "next/image";
import skyImage from "./sky.png";

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

        <div className="col-span-1 text-center">
          <p>~ hi, welcome ~</p>
        </div>

        <div className="col-span-1 text-right">
          <p>2025</p>
        </div>
      </div>
    </main>
  );
}
