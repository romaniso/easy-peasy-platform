import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  TooltipProps,
} from "recharts";

import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { ActivityStatsEntity } from "../../types/lastMonthActivitiesEntity";

interface LineChartProps {
  title: string;
  explanation?: string;
  data: ActivityStatsEntity[];
}
export const LineChart = ({
  title,
  explanation,
  data,
}: LineChartProps): JSX.Element => {
  return (
    <article className="bg-white dark:bg-black/40 dark:border dark:border-stone-900 rounded-md py-2 md:py-3 px-1 md:px-4 shadow-lg h-full flex flex-col transition-transform duration-300">
      <div className="px-3 md:px-10">
        <h4 className="text-orange-500 font-bold text-xl drop-shadow md:text-3xl mb-1 md:mb-2">
          {title}
        </h4>
        <p className="hidden md:block text-indigo-900 dark:text-indigo-400 font-thin text-sm mb-2">
          {explanation}
        </p>
      </div>
      <div className="h-full w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ marginLeft: "-22px" }}
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradientBgColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              stroke="#6366f1"
              type="monotone"
              fill="url(#gradientBgColor)"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              style={{
                fontSize: "0.8rem",
                color: "#6366f1",
              }}
              tick={{ fill: "#6366f1" }}
              tickFormatter={(str) => {
                const date = parseISO(str);
                return format(date, "MMM, d");
              }}
            />

            <YAxis
              dataKey="value"
              style={{
                fontSize: "0.8rem",
              }}
              tick={{ fill: "#6366f1" }}
              axisLine={false}
              tickLine={false}
              tickCount={6}
            />

            <Tooltip content={<CustomToolTip />} />

            <CartesianGrid opacity={0.4} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

const CustomToolTip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  const { t } = useTranslation("dashboard");
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-stone-900 shadow-md text-indigo-900 dark:text-indigo-200 rounded-md p-2">
        <h4 className="text-orange-500 font-semibold">
          {format(parseISO(label), "eee, d, MMM")}
        </h4>
        <p className="text-xs">
          <span className="font-bold">{payload[0]?.value}</span>{" "}
          {t("dailyActivity.tooltipText")}
        </p>
      </div>
    );
  }
  return null;
};
