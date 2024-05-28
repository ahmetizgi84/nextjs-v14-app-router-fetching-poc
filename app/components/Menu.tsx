"use client";

import { useMediaQuery } from "usehooks-ts";
import Button from "./Button";
import { BiHome } from "react-icons/bi";
import { GoDatabase } from "react-icons/go";

const Menu = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex justify-center flex-wrap md:mt-10 mt-6">
      <Button url="/static" text="Cached" />
      <Button url="/server-side" text="Server" />
      <Button url="/isr-time-based" text="ISR - 1" />
      <Button url="/isr-on-demand" text="ISR - 2" />
      <Button url="/ssg" text="SSG" />
      {/* <Button url="/isr-and-ssg/1" text="SSG (generateStaticParams & revalidateTag)" /> */}
      <Button
        url="/"
        text="Home"
        isMobile={isMobile}
        icon={<BiHome size={20} />}
      />
      <Button
        url="https://mockapi.io/projects/66547cc61c6af63f467827d2"
        text="CMS"
        blank={true}
        isMobile={isMobile}
        icon={<GoDatabase size={20} />}
      />
    </div>
  );
};

export default Menu;
