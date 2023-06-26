import ChartLoader from "@/shared/loaders/chartLoader/ChartLoader";
import { formatLargeNum } from "@/utils";
import { useEffect, Dispatch, SetStateAction } from "react";
import {
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	AreaChart,
	Area,
	CartesianGrid,
} from "recharts";
import styles from "./Chart.module.scss";

const convertDate = (date: any) => {
	const formattedDate: any = new Date(date * 1000).toISOString().split("T")[0];
	return formattedDate;
};
const convertTime = (epochTime: number): string => {
	const date = new Date(epochTime);
	let hours = date.getHours();
	let minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	return `${hours}:${minutes} ${ampm}`;
};

const formatLargeNumb = (num: number) => {
	if (num === 0) {
		return `${num}`;
	}
	if (num > 0 && num < 1) {
		return (num / 1).toFixed(3);
	} else if (num > 1 && num < 999) {
		return `${(num / 1).toFixed(3)}`;
	} else if (num > 999 && num < 1000000) {
		return `${num / 1000}K`;
	} else if (num >= 1000000 && num < 1000000000) {
		return `${(num / 1000000).toFixed(1)}M`;
	} else if (num >= 1000000000 && num < 1000000000000) {
		return `${(num / 1000000000).toFixed(1)}B`;
	} else if (num > 1000000000000) {
		return `${(num / 1000000000000).toFixed(3)}T`;
	} else if (num < 900) {
		return num;
	}
	return num;
};

export function CustomTooltip({ active, payload }: any) {
	if (active) {
		return (
			<div className={styles.chart_toolTip}>
				<h4>
					{payload && payload[0].payload.date
						? convertDate(payload[0].payload.date)
						: null}
				</h4>
				<p>${payload ? formatLargeNum(payload[0].value) : null}</p>
			</div>
		);
	}
	return null;
}

export type LineChartProps = {
	data: any[];
	setHoverValue?: Dispatch<SetStateAction<number | undefined>>; // used for value on hover
	setHoverDate?: Dispatch<SetStateAction<string | undefined>>; // used for label of value
	linearGrad1?: string;
	linearGrad2?: string;
	grad1Opacity?: number;
	grad2Opacity?: number;
	xDataKey?: string;
	xAxisLine?: boolean;
	xTickLine?: boolean;
	xTickFormatter?: (e?: any) => void;
	xFontSize?: string;
	xMinTickGap?: number;
	xOrientation?: "bottom" | "top";
	xTickSize?: number;
	yDataKey?: string;
	yAxisLine?: boolean;
	yTickLine?: boolean;
	yTickFormatter?: (e?: any) => void;
	yFontSize?: string;
	ytickCount?: number;
	yOrientation?: "left" | "right";
	yTickSize?: number;
} & React.HTMLAttributes<HTMLDivElement>;

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
// const HoverUpdater = ({ payload, setHoverValue, setHoverDate }) => {
// 	useEffect(() => {
// 		setHoverValue(payload.value);
// 		// setHoverDate(
// 		// 	payload.time.toLocaleString({
// 		// 		year: "numeric",
// 		// 		day: "numeric",
// 		// 		month: "short",
// 		// 	})
// 		// );
// 		setHoverDate(payload.time);
// 	}, [payload.value, payload.time, setHoverValue, setHoverDate]);

// 	return null;
// };

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({
	data,
	setHoverValue,
	setHoverDate,
	linearGrad1,
	linearGrad2,
	grad1Opacity,
	grad2Opacity,
	xDataKey,
	xAxisLine,
	xTickLine,
	xTickFormatter,
	xFontSize,
	xMinTickGap,
	xOrientation,
	xTickSize,
	yDataKey,
	yAxisLine,
	yTickLine,
	yTickFormatter,
	yFontSize,
	ytickCount,
	yOrientation,
	yTickSize,
}: LineChartProps) => {
	if (!data || data.length === 0) {
		return <ChartLoader />;
	}
	return (
		<ResponsiveContainer height="100%" width="100%">
			<AreaChart
				data={data}
				margin={{
					top: 5,
					right: 15,
					left: 0,
					bottom: 5,
				}}
				onMouseLeave={() => {
					if (setHoverDate) setHoverDate(undefined);
					if (setHoverValue) setHoverValue(undefined);
				}}
			>
				<defs>
					<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="5%"
							stopColor={linearGrad1 ? linearGrad1 : "#311205"}
							stopOpacity={grad1Opacity ? grad1Opacity : 1}
						/>
						<stop
							offset="100%"
							stopColor={linearGrad2 ? linearGrad2 : "#311205"}
							stopOpacity={grad2Opacity ? grad2Opacity : 0.1}
						/>
					</linearGradient>
				</defs>
				<XAxis
					dataKey={xDataKey ? xDataKey : "date"}
					axisLine={xAxisLine ? xAxisLine : false}
					tickLine={xTickLine ? xTickLine : false}
					// tickFormatter={date => convertTime(Number(date))}
					fontSize={xFontSize ? xFontSize : "1.2rem"}
					minTickGap={xMinTickGap ? xMinTickGap : 10}
					orientation={xOrientation ? xOrientation : "bottom"}
					tick={{ dx: xTickSize ? xTickSize : 1, fill: "white" }}
				/>
				<YAxis
					dataKey={yDataKey ? yDataKey : "value"}
					tickCount={ytickCount ? ytickCount : 6}
					scale="linear"
					axisLine={yAxisLine ? yAxisLine : false}
					tickLine={yTickLine ? yTickLine : false}
					fontSize={yFontSize ? yFontSize : "1.2rem"}
					tickFormatter={val => `$${formatLargeNumb(val)}`}
					orientation={yOrientation ? yOrientation : "right"}
					tick={{ dx: yTickSize ? yTickSize : -10, fill: "white" }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<CartesianGrid stroke="#37352D" strokeDasharray="0" vertical={false} />
				<Area
					dataKey="value"
					type="monotone"
					stroke={"#F48D62"}
					fill="url(#gradient)"
					strokeWidth={1}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default LineChart;
