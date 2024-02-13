import React from "react";
import Panel from "../components/common/Panel";
import {FiguresChart} from "../components/dashboard/FiguresChart";

const DashboardPage: React.FC = () => {
    return (
        <div className='h-full md:p-12'>
            <Panel className='bg-gradient flex flex-col !p-0 rounded-none md:rounded-md overflow-hidden h-full w-full'>
                <header className='p-3 md:p-5 bg-gradient-to-r from-orange-500 to-orange-300 dark:from-stone-900 dark:to-stone-800'>
                    <h1 className='text-indigo-800 dark:text-indigo-300 font-extrabold drop-shadow text-center md:text-left text-3xl md:text-4xl'>
                        {/*{t('header.mainHeader')}*/}
                        Dashboard
                    </h1>
                </header>
                <main className='flex flex-wrap h-full py-1 md:py-2 px-2 mdpx-1.5 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-indigo-100 dark:scrollbar-thumb-stone-800 scrollbar-track-white dark:scrollbar-track-stone-900'>
                    <div className='py-1 md:py-2 px-0 md:px-1.5 flex-1 basis-full md:basis-1/3 md:h-1/2'>
                        <FiguresChart title='Added Words' figure={10} unitNameInPlural='words' maxNumber={1000}/>
                    </div>
                    <div className='py-1 md:py-2 px-0 md:px-1.5 flex-1 basis-full md:basis-1/3 md:h-1/2'>
                        <FiguresChart title='Added Cards' figure={50} unitNameInPlural='cards' maxNumber={1000}/>
                    </div>
                    <div className='py-1 md:py-2 px-0 md:px-1.5 flex-1 basis-full md:basis-1/3 md:h-1/2'>
                        <FiguresChart title='Added Users' figure={30} unitNameInPlural='users' maxNumber={1000}/>
                    </div>
                    <div className='py-1 md:py-2 px-0 md:px-1.5 flex-grow basis-full md:h-1/2'>
                        <FiguresChart title='Added Words' figure={10} unitNameInPlural='words' maxNumber={1000}/>
                    </div>
                </main>
            </Panel>
        </div>
    );
}

export default DashboardPage;