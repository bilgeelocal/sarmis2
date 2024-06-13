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
    title: "Дугаар",
    dataIndex: "id",
    key: "id",
    render: (text: any, record: any, index: number) => <a href={text} target="_blank">{index + 1}</a>,
  },
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
  // {
  //   title: "Grey Share",
  //   dataIndex: "grey_share",
  //   defaultSortOrder: "descend",
  //   sorter: (a: any, b: any) => a.share - b.share,
  // },
  {
    title: "Grey Comment",
    dataIndex: "grey_comment",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.comment - b.comment,
  },
];

const LandingPage: NextPage<unknown> = (): React.ReactElement => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });  // Assuming 10 items per page

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

  //like tooloh
  const { totalLikes, grey_likes } = useMemo(() => {
    const totalLikes = Array.isArray(dataSource)
      ? dataSource.reduce(
          (sum: any, item: any) => sum + parseInt(item.like || 0, 10),
          0
        )
      : 0;
    const grey_likes = Array.isArray(dataSource)
      ? dataSource.reduce(
          (sum, item: any) => sum + parseInt(item.grey_like || 0, 10),
          0
        )
      : 0;
    const total = totalLikes + grey_likes;
    return { totalLikes, grey_likes };
  }, [dataSource]);
//comment tooloh 
const { totalComments, grey_comments } = useMemo(() => {
  const totalComments = Array.isArray(dataSource)
    ? dataSource.reduce(
        (sum: any, item: any) => sum + parseInt(item.comment || 0, 10),
        0
      )
    : 0;
  const grey_comments = Array.isArray(dataSource)
    ? dataSource.reduce(
        (sum, item: any) => sum + parseInt(item.grey_comment || 0, 10),
        0
      )
    : 0;
  const total = totalComments + grey_comments;
  return { totalComments, grey_comments };
}, [dataSource]);

//share tooloh
const { totalShares, grey_shares } = useMemo(() => {
  const totalShares = Array.isArray(dataSource)
    ? dataSource.reduce(
        (sum: any, item: any) => sum + parseInt(item.share || 0, 10),
        0
      )
    : 0;
  const grey_shares = Array.isArray(dataSource)
    ? dataSource.reduce(
        (sum, item: any) => sum + parseInt(item.grey_share || 0, 10),
        0
      )
    : 0;
  const total = totalShares + grey_shares;
  return { totalShares, grey_shares };
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
            (value / (totalLikes + grey_likes)) * 100
          )}%)`, 
      },
    },
    stroke: {
      show: true,
    },
    labels: ["Total count", "Grey count"],
    dataLabels: {
      enabled: true,
      formatter: (val: any) => `${val.toFixed(2)}%`,
    },
    legend: {
      show: false,
    },
  };
  

  const chartSeries1 = [totalLikes, grey_likes];

  const chartSeries2 = [totalComments, grey_comments];

  const chartSeries3 = [totalShares, grey_shares];

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
           <div className="charts-row">
            <div className="chart-container">
              <div className="status-label" style={{ textAlign: 'center', color: '#3498db',fontWeight: 'bold' }}>Likes Status</div>
              <Chart
                options={chartOptions}
                series={chartSeries1}
                type="donut"
                width={250}
                height={320}
              />
            </div>
            <div className="chart-container">
              <div className="status-label" style={{ textAlign: 'center', color: '#e74c3c',fontWeight: 'bold' }}>Comments Status</div>
              <Chart
                options={chartOptions}
                series={chartSeries2}
                type="donut"
                width={250}
                height={320}
              />
            </div>
            <div className="chart-container">
              <div className="status-label" style={{ textAlign: 'center', color: '#2ecc71',fontWeight: 'bold' }}>Shares Status</div>
              <Chart
                options={chartOptions}
                series={chartSeries3}
                type="donut"
                width={250}
                height={320}
              />
            </div>
          </div>
        </div>
      
        </div>
      
    </MainLayout>
  );
};

export default LandingPage;