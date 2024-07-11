"use client";
import Header from "@/components/TempHeader";
import { address, contactInfo, socialIcons } from "@/constants";
import { UserInfo } from "@/components/UserInfo";

const WelcomePage = () => {
  return (
    <div className="">
      {/* <div className="absolute h-auto opacity-50">
        <Image src={bgsvg} height={200} width={1200} alt="backgroudn" />
      </div> */}
      <div>
        <Header
          address={address}
          contactInfo={contactInfo}
          socialIcons={socialIcons}
        />
        <UserInfo />
      </div>
    </div>
  );
};

export default WelcomePage;
