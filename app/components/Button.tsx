'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ButtonSkeleton from './ButtonSkeleton';

interface Props {
   url: string;
   text: string;
   blank?: boolean;
   isMobile?: boolean;
   icon?: React.ReactNode;
}

const Button: React.FC<Props> = ({
   url,
   text,
   blank = false,
   isMobile = false,
   icon,
}) => {
   const [domLoaded, setDomLoaded] = useState(false);

   useEffect(() => {
      setDomLoaded(true);
   }, []);

   return (
      <>
         {domLoaded ? (
            <Link
               href={url}
               target={`${blank ? '_blank' : '_self'}`}
               className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600'
            >
               {isMobile ? icon : text}
            </Link>
         ) : (
            <ButtonSkeleton text={text} icon={icon} />
         )}
      </>
   );
};

export default Button;
