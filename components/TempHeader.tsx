import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import {
  penguin,
  callsvg,
  clocksvg,
  emailsvg,
  facebooksvg,
  linkedinsvg,
  whatsappsvg,
  locationsvg,
} from "@/public";

export interface ContactInfo {
  icon: StaticImageData | string;
  title: string;
  content: string;
}

export interface SocialIcon {
  id: string;
  title: string;
  icon: StaticImageData; // Adjust the type if you're importing SVGs differently
}

export interface HeaderProps {
  address: string;
  contactInfo: ContactInfo[];
  socialIcons: SocialIcon[];
}

const Header: React.FC<HeaderProps> = ({
  address,
  contactInfo,
  socialIcons,
}) => {
  const pathname = usePathname();

  const NewsLetter = () => {
    return (
      <section className="w-screen flex justify-center py-2  bg-[#230548]">
        <div className="max-w-7xl flex w-full justify-between items-center text-white">
          <div
            id="map_icon_and_address"
            className="flex justify-center gap-x-4 items-center"
          >
            <div>
              <Image src={locationsvg} alt="location" height={34} width={34} />
            </div>

            <div>
              <p>{address}</p>
            </div>
          </div>

          <div id="social_icons" className="flex space-x-4">
            {socialIcons.map(({ icon, title, id }) => (
              <div key={id} className="size-10 overflow-hidden">
                <Image
                  key={id}
                  src={icon}
                  alt={`social-icon-${title}`}
                  height={20}
                  width={10}
                  className=" h-10 w-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const LogoAndInfo = () => {
    return (
      <section className="w-screen mx-auto flex justify-center px-4 py-4">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center justify-start w-full lg:w-4/12 mb-4 lg:mb-0">
            <Image
              src={penguin}
              alt="Jackpot Logo"
              width={80}
              height={80}
              className="mr-4"
            />
            <h1 className="text-3xl font-bold text-black">Jackpot</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center md:justify-center mx-auto justify-start w-full  lg:grid-cols-3 gap-4 text-black">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="flex flex-row lg:flex-col lg:items-center gap-4 lg:gap-2"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  height={34}
                  width={34}
                  className="mb-2 sm:mb-0 sm:mr-3 lg:mr-0 lg:mb-2"
                />
                <div className="lg:text-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Navigation = () => {
    return (
      <div className="bg-white border-2 rounded-l-full rounded-r-full  h-14 rounded-xl relative">
        <nav className="w-9/12">
          <ul className="flex flex-wrap justify-start gap-x-5 px-4 py-2">
            {["HOME", "ABOUT US", "SERVICES"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-800 w-fit hover:text-purple-600 py-2 block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-6 w-3/12 max-w-40 h-full rounded-r-full font-bold hover:bg-orange-600 transition duration-300">
          GET A QUOTE
        </button>
      </div>
    );
  };

  const PathCurrentPageAndNavigation = () => {
    return (
     <section className="w-screen flex pr-14 justify-center">
       <section
        className="relative flex w-full max-w-7xl
       justify-center min-h-40 border-red-400  border-2 mb-4 mt-8"
      >
        <div className="absolute -top-[20%] h-14 w-8/12">
          <Navigation />
        </div>

        <div id="main_header" className="bg-[#65507E] w-full text-white min-h-40 px-4">
          <h1 className="text-4xl font-bold pt-8">Home</h1>
          <div className="bg-[#371C59] absolute w-full bottom-0 px-6 right-0 py-2 flex justify-end space-x-4">
            <Link href="/" className="hover:text-[#EA580C]">
              Home
            </Link>
            <span>/</span>
            <Link href={pathname} className="hover:text-[#EA580C]">
              {pathname.split("/").pop() || "Home"}
            </Link>
          </div>
        </div>
      </section>
     </section>
    );
  };

  return (
    <header className="">
      <div className="">
        <NewsLetter />
        <LogoAndInfo />
        <PathCurrentPageAndNavigation />
      </div>
    </header>
  );
};

export default Header;

// Data imports and exports
