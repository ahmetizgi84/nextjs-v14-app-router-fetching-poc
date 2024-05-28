"use client";

import { useState } from "react";
import { TbRefresh } from "react-icons/tb";

interface Props {
  text?: string;
}

const RevalidateSsgButton: React.FC<Props> = ({ text = "Revalidate" }) => {
  const handleRevalidate = async () => {
    // setIsLoading(true);
    const response = await fetch(`/api/product`).then((res) => res.json());

    window.location.reload();
    if (response.revalidated) {
      console.log("data revalidated!");
    }
    // setTimeout(() => {
    //   setIsLoading(false);
    //   window.location.reload();
    // }, 500);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button
        className="
            relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800
                  "
        onClick={handleRevalidate}
      >
        <div className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <span>{text}</span>
          <span className={`${isLoading ? "animate-spin" : ""} ml-1`}>
            <TbRefresh size={20} />
          </span>
        </div>
      </button>
    </>
  );
};

export default RevalidateSsgButton;
