"use client";

import { TbRefresh } from "react-icons/tb";
import {
  revalidateContentWithPath,
  revalidateContentWithTag,
} from "../lib/actions";

interface Props {
  text?: string;
}

const RevalidateServerActionButton: React.FC<Props> = ({
  text = "Revalidate with Server Action",
}) => {
  const handleRevalidate = async () => {
    //  revalidateContentWithPath();
    revalidateContentWithTag();
  };

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
          <span className="ml-1">
            <TbRefresh size={20} />
          </span>
        </div>
      </button>
    </>
  );
};

export default RevalidateServerActionButton;
