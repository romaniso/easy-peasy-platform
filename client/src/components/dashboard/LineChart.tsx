import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import {format, parseISO, subDays} from "date-fns";
interface LineChartProps {
    // title: string;
    // percentage: number;
    // put a unit in a plural form, e.g. words, users, kilograms.
    // unitNameInPlural: string;
}
export const LineChart: React.FC<LineChartProps> = () => {
    const data = [];
    for(let num = 30; num >= 0; num--){
        data.push({
            // this one is perfect: days in a month
            date: subDays(new Date(), num).toISOString().substring(0, 10),
            //@TODO: here I need to provide a number of completed exercises and read articles
            value: Math.round(Math.random() * 10),
        })
    }

    console.log(data);

    return (
        <article className='bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md py-2 md:py-3 px-1 md:px-4 shadow-lg h-full flex flex-col transition-transform duration-300'>
            <div className='px-3 md:px-10'>
                <h4 className='text-orange-500 font-bold text-xl drop-shadow md:text-3xl mb-1 md:mb-2'>Your Daily Activity</h4>
                <p className='hidden md:block text-indigo-900 dark:text-indigo-400 font-thin text-sm mb-2'>*How many activities have you completed this month? Let's see.</p>
            </div>
            <div className='h-full w-full'>
                <ResponsiveContainer width='100%' height="100%" style={{marginLeft: "-22px"}}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id='gradientBgColor' x1='0' y1='0' x2='0' y2='1' >
                                <stop offset='0%' stopColor='#6366f1' stopOpacity={0.4} />
                                <stop offset='75%' stopColor='#6366f1' stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="value"
                            stroke='#6366f1'
                            type="monotone"
                            fill='url(#gradientBgColor)'
                        />

                        <XAxis
                            dataKey='date'
                            axisLine={false}
                            tickLine={false}
                            style={{
                                fontSize: '0.8rem',
                                color: '#6366f1',
                            }}
                            tick={{ fill: '#6366f1' }}
                            tickFormatter={str => {
                                const date = parseISO(str);
                                return format(date, 'MMM, d')
                            }}
                        />

                        <YAxis
                            dataKey='value'
                            style={{
                                fontSize: '0.8rem',
                            }}
                            tick={{ fill: '#6366f1' }}
                            axisLine={false}
                            tickLine={false}
                            tickCount={6}
                            // tickSize={6}
                            // tickFormatter={number => `$${number.toFixed(2)}`}
                        />

                        <Tooltip content={<CustomToolTip />}/>

                        <CartesianGrid opacity={0.4} vertical={false} />

                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </article>
    )
}

const CustomToolTip = ({active, payload, label}) => {
    if(active) {
        return <div className='bg-white dark:bg-stone-900 shadow-md text-indigo-900 dark:text-indigo-200 rounded-md p-2'>
            <h4>{format(parseISO(label), "eee, d, MMM")}</h4>
            <p className='text-xs'>
                {payload[0].value.toFixed(2)}
                {" "} completed exercises this day.
            </p>
        </div>
    }
    return null;
}