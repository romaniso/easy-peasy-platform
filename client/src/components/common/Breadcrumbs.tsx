import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsChevronRight } from 'react-icons/bs';

const Breadcrumbs: React.FC = () => {
    const { pathname } = useLocation();
    let currentLink: string = '';

    const crumbs: JSX.Element[] = pathname
        .split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index, arr) => {
            const decodedCrumb: string = decodeURIComponent(crumb);
            currentLink += `/${crumb}`;

            return (
                <div
                    className={`inline-flex items-center gap-1 mr-2 md:mr-4 text-indigo-800/75 dark:text-indigo-300/90 text-base md:text-lg hover:text-orange-500 hover:dark:text-orange-500 transition-opacity ${
                        index === arr.length - 1 ? 'font-bold text-indigo-900 hover:text-orange-500 dark:text-indigo-200' : ''
                    }`}
                    key={decodedCrumb}
                >
                    <Link to={currentLink}>
                        {decodedCrumb}
                    </Link>
                    {index !== arr.length - 1 && <BsChevronRight />}
                </div>
            );
        });

    return (
        <div className='mb-2 md:mb-6 mt-4 container mx-auto'>
            <section className='bg-white dark:bg-stone-800 inline-block px-2 py-1 md:px-3 md:py-2 rounded-md shadow'>
                {crumbs}
            </section>
        </div>
    );
}

export default Breadcrumbs;