import React from "react";
import ReactMarkdown from 'react-markdown';

interface ReadingProps {
    text: string;
    title: string;
    image: string;
    level: string;
}
const Reading: React.FC<ReadingProps> = ({text, title, image, level}) =>{
    return <div className=''>
        <header className='bg-cover bg-center bg-no-repeat min-h-[10px] overflow-hidden rounded-t-md' style={{backgroundImage: `url(${image})`}}>
            <div className='w-full h-full py-2 px-6 backdrop-brightness-[35%]  flex flex-col justify-center gap-2'>
                <h3 className='text-5xl font-bold text-orange-500 drop-shadow text-center tracking-widest'>
                    {title}
                </h3>
                <section>
                    {/*Component?*/}
                    <span className='border border-indigo-300 rounded-md text-indigo-300 text-2xl inline-block w-10 h-10 text-center'>{level}</span>
                </section>
            </div>
        </header>
        <ReactMarkdown className='markdown-reading'>{text}</ReactMarkdown>
    </div>;
}

export default Reading;