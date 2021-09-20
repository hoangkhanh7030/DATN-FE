import { Box } from "@material-ui/core";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { useStyles } from "./style";

export default function Chart({
  reportData = [],
  reportType = "resource",
  viewType = "DAYS",
}) {
  const classes = useStyles();
  const names = reportData?.map((item) => item.name);
  let clients = [];
  let teams = [];
  let positions = [];
  if (reportType === "project") {
    clients = reportData?.map((item) => `Client Name: ${item.clientName}`);
  } else {
    teams = reportData?.map((item) => `Team: ${item.teamName}`);
    positions = reportData?.map((item) => `Position: ${item.positionName}`);
  }

  const workingDays = reportData?.map((item) => item.workingDays);
  let max = Math.max(...workingDays);
  const overtimeDays = reportData?.map((item) => item.overtimeDays);
  let max1 = Math.max(...overtimeDays);
  let sumMax = max + max1;

  const data = {
    labels: names,
    clients,
    teams,
    positions,
    datasets: [
      {
        label: `Working ${viewType.toLowerCase()}s`,
        backgroundColor: "#3870F5",
        borderColor: "#072f8f",
        borderWidth: 1,
        stack: 1,
        data: workingDays,
      },

      {
        label: `Overtime ${viewType.toLowerCase()}s`,
        backgroundColor: "#ED6A5A",
        borderColor: "#931e10",
        borderWidth: 1,
        stack: 1,
        data: overtimeDays,
      },
    ],
  };

  const plugins = [
    {
      afterDraw: function (chart) {
        if (
          !chart.data.datasets[0].data.length &&
          !chart.data.datasets[1].data.length
        ) {
          let ctx = chart.ctx;
          let width = chart.width;
          let height = chart.height;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "26px Arial";
          ctx.fillText("No data to display", width / 2, height / 4);
          ctx.restore();
        }
      },
    },
  ];

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,

    tooltips: {
      mode: "nearest",
      displayColors: false,
      callbacks: {
        label: (tooltipItems, data) => {
          var type = tooltipItems.datasetIndex ? "Overtime" : "Working";
          var multiStringText = [
            `${type} ${viewType.toLowerCase()}s: ${tooltipItems.xLabel}`,
          ];

          if (reportType === "project") {
            multiStringText.push(data.clients[tooltipItems.index]);
          } else {
            multiStringText.push(data.teams[tooltipItems.index]);
            multiStringText.push(data.positions[tooltipItems.index]);
          }
          return multiStringText;
        },
      },
    },
    legend: {
      display: data.datasets[0].data.length && data.datasets[1].data.length,
    },
    type: "bar",
    scales: {
      xAxes: [
        {
          display: reportData.length,
          stacked: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            max: Math.ceil(sumMax) + (Math.ceil(sumMax) % 2 ? 1 : 2),
          },
        },
      ],
      yAxes: [
        {
          display: reportData.length,
          stacked: true,
          barPercentage: 0.8,
        },
      ],
    },
  };

  return (
    <Box className={classes.chart}>
      <HorizontalBar
        data={data}
        // width={null}
        // height={80}
        options={options}
        plugins={plugins}
      />
    </Box>
  );
}
