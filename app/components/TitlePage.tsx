interface Props {
   title: string;
   subtitle: string;
   codeExample: string;
   urlExampleGitHub: string;
   underlineColor: string;
   underlineWidth: string;
}

const TitlePage: React.FC<Props> = ({
   title,
   subtitle,
   codeExample,
   urlExampleGitHub,
   underlineColor,
   underlineWidth,
}) => {
   return (
      <>
         <h1 className={`text-3xl md:text-4xl text-center mt-10 md:mt-0`}>
            {title}
         </h1>
         <div className='flex justify-center'>
            <hr className={`${underlineColor} ${underlineWidth} mt-3`} />
         </div>
         <div className='flex justify-center'>
            <div className='font-light opacity-90 text-center mt-7 mb-5 text-gray-700 dark:text-gray-200 w-3/4 min-w-[300px] md:max-w-[800px]'>
               {subtitle}
               <span className='ml-1 underline'>
                  <a
                     href={urlExampleGitHub}
                     target='_blank'
                     rel='noopener noreferrer'
                  >
                     See example on GitHub
                  </a>
               </span>
               <div className='mt-5 bg-gray-900 p-2 rounded-lg hidden lg:block'>
                  <pre style={{ color: 'aliceblue' }}>
                     <code>{codeExample}</code>
                  </pre>
               </div>
            </div>
         </div>
      </>
   );
};

export default TitlePage;
