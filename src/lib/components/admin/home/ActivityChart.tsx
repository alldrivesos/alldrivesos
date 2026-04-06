import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
// import ReactApexChart from "react-apexcharts";
// import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


  // const series = [
  //   {
  //     name: "Sales",
  //     data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
  //   },
  // ]
  // const options = {
  //   chart: {
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   colors: ["#020617"],
  //   plotOptions: {
  //     bar: {
  //       columnWidth: "40%",
  //       borderRadius: 2,
  //     },
  //   },
  //   xaxis: {
  //     axisTicks: {
  //       show: false,
  //     },
  //     axisBorder: {
  //       show: false,
  //     },
  //     labels: {
  //       style: {
  //         colors: "#616161",
  //         fontSize: "12px",
  //         fontFamily: "inherit",
  //         fontWeight: 400,
  //       },
  //     },
  //     categories: [
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //   },
  //   yaxis: {
  //     labels: {
  //       style: {
  //         colors: "#616161",
  //         fontSize: "12px",
  //         fontFamily: "inherit",
  //         fontWeight: 400,
  //       },
  //     },
  //   },
  //   grid: {
  //     show: true,
  //     borderColor: "#dddddd",
  //     strokeDashArray: 5,
  //     xaxis: {
  //       lines: {
  //         show: true,
  //       },
  //     },
  //     padding: {
  //       top: 5,
  //       right: 20,
  //     },
  //   },
  //   fill: {
  //     opacity: 0.8,
  //   },
  //   tooltip: {
  //     theme: "dark",
  //   },
  // }

const ActivityChart = () => {
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          {/* <Square3Stack3DIcon className="h-6 w-6" /> */}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Bar Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        {/* {typeof window !== "undefined" && <ReactApexChart options={options} series={series} type="bar" width="100%"
                height="350px"/>} */}
                <></>
      </CardBody>
    </Card>
  );
};

export default ActivityChart;
