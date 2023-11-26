function Reading({text, title, bgImage, level}){
    return <div className=''>
        <header className='bg-cover bg-center bg-no-repeat h-[130px]' style={{backgroundImage: `url(${bgImage})`}}>
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
        <main className='px-3 lg:px-6 py-4 lg:py-10 text-indigo-900 dark:text-indigo-200 text-base md:text-lg'>{text}</main>
    </div>;
}

export default Reading;