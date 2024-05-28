interface Props {
   text: string;
   icon: React.ReactNode;
}

const ButtonSkeleton: React.FC<Props> = ({ text, icon }) => {
   return (
      <>
         <div className='hidden md:block'>
            <ButtonSkeletonText text={text} />
         </div>
         <div className='md:hidden'>
            <ButtonSkeletonText text={icon ? icon : text} />
         </div>
      </>
   );
};

interface ButtonSkeletonTextProps {
   text: React.ReactNode;
}

const ButtonSkeletonText: React.FC<ButtonSkeletonTextProps> = ({ text }) => {
   return (
      <p className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
         {text}
      </p>
   );
};

export default ButtonSkeleton;
