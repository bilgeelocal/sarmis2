import dynamic from "next/dynamic";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { MainLayout } from "layouts";
import { NextPage } from "next";
import { Table, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const columns: any = [
  {
    title: "Нэр",
    dataIndex: "name",
    key: "name",
    filters: [
      {
        text: "Батшугар",
        value: "Батшугар",
      },
      {
        text: "Номин",
        value: "Номин",
      },
    ],

    filterSearch: true,
    onFilter: (value: any, record: any) => record.name.includes(value),
  },
  {
    title: "Нам",
    dataIndex: "nam",
    key: "age",
    filterSearch: true,
    onFilter: (value: any, record: any) => record.nam.startsWith(value),
  },
  {
    title: "Like",
    dataIndex: "like",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.like - b.like,
  },
  {
    title: "Share",
    dataIndex: "share",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.share - b.share,
  },
  {
    title: "Comment",
    dataIndex: "comment",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.comment - b.comment,
  },
  {
    title: "Grey Like",
    dataIndex: "grey_like",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.like - b.like,
  },
  {
    title: "Grey Share",
    dataIndex: "grey_share",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.share - b.share,
  },
  {
    title: "Grey Comment",
    dataIndex: "grey_comment",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.comment - b.comment,
  },
];

interface Props {
  data: any;
}
const LandingPage: NextPage<Props> = ({ data }): React.ReactElement => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    async function fetchData() {
      console.log("yo", data);
      try {
        const transformedData = data.map((item: any) => ({
          name: item.name,
          nam: item.nam,
          like: item.like,
          share: item.share,
          comment: item.comment,
          grey_like: item.grey_like,
          grey_share: item.grey_share,
          grey_comment: item.grey_comment,
        }));
        setDataSource(transformedData);
        console.log("Transformed data:", transformedData); // Log the transformed data
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setDataSource([]);
      }
    }
    fetchData();
  }, []);
  const { totalLikes, totalComments, likePercentage } = useMemo(() => {
    console.log("Data source in useMemo:", dataSource); // Log dataSource used in useMemo

    const totalLikes = Array.isArray(dataSource) ? dataSource.reduce((sum: any, item: any) => sum + parseInt(item.like || 0, 10), 0) : 0;
    const totalComments = Array.isArray(dataSource) ? dataSource.reduce((sum, item: any) => sum + parseInt(item.comment || 0, 10), 0) : 0;
    const total = totalLikes + totalComments;
    const likePercentage = total ? Math.round((totalLikes / total) * 100) : 0;
    return { totalLikes, totalComments, likePercentage };
  }, [dataSource]);

  const chartOptions: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ["#5D87FF", "#ECF2FF"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value: any) => `${value} (${Math.round((value / (totalLikes + totalComments)) * 100)}%)`,
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val: any) => `${val.toFixed(2)}%`,
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [likePercentage, 100 - likePercentage];

  function onClickRow(record: any) {
    console.log("Selected record:", record);
  }

  function onChangeDate(date: any) {
    console.log("Selected date:", dayjs(date).format("YYYY-MM-DD"));
  }

  return (
    <MainLayout>
      <div className="p-6 w-full">
        <div className="w-full flex">
          <div className="w-3/4">
            <DatePicker defaultValue={dayjs()} onChange={onChangeDate} />
            <Table
              dataSource={dataSource}
              columns={columns}
              onRow={(record: any, rowIndex: any) => ({
                onClick: () => onClickRow(record),
              })}
            />
          </div>
          <div className="w-1/4">
            <Chart options={chartOptions} series={chartSeries} type="donut" width={500} height={320} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context): Promise<GetServerSidePropsResult<any>> => {
  const response = await axios.get("https://kiuhwqca87.execute-api.ap-southeast-1.amazonaws.com/api/maindata", {
    responseType: "json",
  });

  return {
    props: {
      data: response.data.data,
    },
  };
};

export default LandingPage;
