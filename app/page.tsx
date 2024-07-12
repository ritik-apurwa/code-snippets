"use client";
import {
  bgsvg,
  emailFooter,
  fairplay,
  herobg,
  locationFooter,
  payouticon,
  penguin,
  phoneFooter,
  secureicon,
} from "@/public";
import { motion, AnimatePresence } from "framer-motion";
import { StepForwardIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const HeroSection2 = () => {
  return (
    <div className="relative  min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center"
        >
          <Image
            src={herobg}
            height={1000}
            width={1200}
            alt="Lottery Background"
            className="object-contain max-w-full h-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center items-center text-center space-y-6 px-4"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Win Big with Our Lottery!
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Join now and change your life forever.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Link
              href="/welcome"
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Play Now devendra ate click kr 
            </Link>
            <Link
              href="/about"
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

interface FeatureCard {
  icon: StaticImageData;
  title: string;
  description: string;
}
interface StepCard {
  title: string;
  number: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCard) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <Image src={icon} alt={`${title} icon`} height={48} width={48} />
    <h3 className="mt-4 text-2xl font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description }: StepCard) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="w-16 h-16 bg-[#230548] rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl font-bold text-white">{number}</span>
    </div>
    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </motion.div>
);

const Section3 = () => {
  const features = [
    {
      icon: secureicon,
      title: "Secure and Safe",
      description:
        "Your security is our top priority. We use state-of-the-art encryption to protect your data.",
    },
    {
      icon: payouticon,
      title: "Instant Payouts",
      description:
        "Get your winnings instantly transferred to your account. No waiting, no hassle.",
    },
    {
      icon: fairplay,
      title: "Fair Play",
      description:
        "We ensure fair play in every draw with our certified random number generator.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Register",
      description:
        "Create an account in minutes and join our growing community of winners.",
    },
    {
      number: "2",
      title: "Choose Numbers",
      description:
        "Pick your lucky numbers or use our quick pick option for instant play.",
    },
    {
      number: "3",
      title: "Wait for Draw",
      description:
        "Stay tuned for the live draw and get ready to claim your life-changing prize!",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-[#230548] mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Our Lottery?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.h2
          className="text-4xl font-bold text-center text-[#230548] mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterWithBg = () => {
  return (
    <section>
      {/* i want to set in backgroudn of whole footer it looks in this way that user can feel it but upon it i want my content  */}
      <div>
        <Image
          src={bgsvg}
          height={300}
          width={500}
          alt="dotter-bg-for-footer"
        />
      </div>
      {/* this is my logo section  */}
      <div>
        <Image
          src={penguin}
          height={300}
          width={500}
          alt="dotter-bg-for-footer"
        />
        <h1>Jackpot</h1>
      </div>
      {/* this is my links section */}
      <div>
        <ul className="flex flex-wrap justify-start gap-x-5 px-4 py-2">
          {["HOME", "ABOUT US", "SERVICES", "Contact-Us"].map((item) => (
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
      </div>
      {/* make apprrite two section more which is right or necessary for a lottory application */}
      <div>first one here with atlest four links</div>

      <div>
        <div>
          <Image src={phoneFooter} alt="icon" height={30} width={30} />
          <p>
            call us <br /> +919889989898
          </p>
        </div>
        <div>
          <Image src={emailFooter} alt="icon" height={30} width={30} />
          <p>
            Email <br /> startmarketing@gmail.com
          </p>
        </div>
        <div>
          <Image src={locationFooter} alt="icon" height={30} width={30} />
          <p>
            Address <br /> Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <section>
      <HeroSection2 />
      <Section3 />
    </section>
  );
};

export default Page;
