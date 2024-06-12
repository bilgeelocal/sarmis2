import dynamic from "next/dynamic";
import { MainLayout } from "layouts";
import { NextPage } from "next";
import { Table, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const columns: any = [
  {
    title: "Пост",
    dataIndex: "post",
    key: "name",
    render: (text:any) => <a href={text} target="_blank">{text.slice(0, 50)}</a>,
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

const LandingPage: NextPage<unknown> = (): React.ReactElement => {
  const [dataSource, setDataSource] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  const [selectedDate, setSelectedDate] = useState<string>("2024-06-12");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/detail?candidate=${name}&date=${selectedDate}`
      );
      const data = response.data.data;
      console.log(data);
      const transformedData = data.map((item: any) => ({
        post: item.post,
        nam: item.nam,
        like: item.like,
        share: item.share,
        comment: item.comment,
        grey_like: item.grey_like,
        grey_share: item.grey_share,
        grey_comment: item.grey_comment,
      }));
      setDataSource(transformedData);
    }
    fetchData();
  }, [name, selectedDate]);

  const { totalLikes, totalComments, likePercentage } = useMemo(() => {
    const totalLikes = Array.isArray(dataSource)
      ? dataSource.reduce(
          (sum: any, item: any) => sum + parseInt(item.like || 0, 10),
          0
        )
      : 0;
    const totalComments = Array.isArray(dataSource)
      ? dataSource.reduce(
          (sum, item: any) => sum + parseInt(item.comment || 0, 10),
          0
        )
      : 0;
    const total = totalLikes + totalComments;
    const likePercentage = total ? Math.round((totalLikes / total) * 100) : 0;
    return { totalLikes, totalComments, likePercentage };
  }, [dataSource]);

  const chartOptions: any = {
    chart: {
      type: "donut",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ["#5D87FF", "#364670", "#EF6C00"],
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
        formatter: (value: any) =>
          `${value} (${Math.round(
            (value / (totalLikes + totalComments)) * 100
          )}%)`,
      },
    },
    stroke: {
      show: true,
    },
    labels: ["Total likes", "Total comments", "Like percentage"],
    dataLabels: {
      enabled: true,
      formatter: (val: any) => `${val.toFixed(2)}%`,
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [totalLikes, totalComments, likePercentage];

  function onClickRow(record: any) {
    console.log("Selected record:", record);
  }

  function onChangeDate(date: any) {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
  }

  return (
    <MainLayout>
      <div className="p-6 w-full">
        <div className="flex flex-col">
          <div>
            <DatePicker defaultValue={dayjs()} onChange={onChangeDate} />
            <Table
              dataSource={dataSource}
              columns={columns}
              onRow={(record: any, rowIndex: any) => ({
                onClick: () => onClickRow(record),
              })}
            />
          </div>
          <div className="">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              width={500}
              height={320}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;