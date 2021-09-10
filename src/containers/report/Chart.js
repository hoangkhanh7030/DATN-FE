import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useStyles } from "./style";

export default function Chart({
  reportData = [],
  reportType = "project",
  viewType = "DAYS",
}) {
  console.log(reportData);
  const classes = useStyles();
  const names = reportData?.map((item) => item.name);
  // const [clients, setClients] = useState([]);
  // const [teams, setTeams] = useState([]);
  // const [positions, setPositions] = useState([]);
  // const clients = reportData?.map((item) => `Client Name: ${item.clientName}`);
  let clients = [];
  let teams = [];
  let positions = [];
  if (reportType === "project") {
    // setClients(reportData?.map((item) => `Client Name: ${item.clientName}`));
    clients = reportData?.map((item) => `Client Name: ${item.clientName}`);
  } else {
    teams = reportData?.map((item) => `Team: ${item.teamName}`);
    // setTeams(reportData?.map((item) => `Team: ${item.teamName}`));
    positions = reportData?.map((item) => `Position: ${item.positionName}`);
    // setPositions(reportData?.map((item) => `Position: ${item.positionName}`));
  }

  const workingDays = reportData?.map((item) => item.workingDays);
  let max = Math.max(...workingDays);
  console.log("🚀 ~ file: Chart.js ~ line 29 ~ Chart ~ max", max);
  console.log(
    "🚀 ~ file: Chart.js ~ line 28 ~ Chart ~ workingDays",
    workingDays
  );
  const overtimeDays = reportData?.map((item) => item.overtimeDays);
  let max1 = Math.max(...overtimeDays);
  console.log("🚀 ~ file: Chart.js ~ line 29 ~ Chart ~ max", max1);
  console.log(
    "🚀 ~ file: Chart.js ~ line 30 ~ Chart ~ overtimeDays",
    overtimeDays
  );
  let sumMax = max + max1;
  const data = {
    labels: names,
    clients,
    teams,
    positions,
    datasets: [
      {
        label: "Working Hours",
        backgroundColor: "#3870F5",
        borderColor: "#072f8f",
        borderWidth: 1,
        stack: 1,
        data: workingDays,
      },

      {
        label: "Overtime Hours",
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
          !chart.data.datasets[0].data.length  &&
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
    responsive: true,
    // maintainAspectRatio: false,

    tooltips: {
      displayColors: false,
      callbacks: {
        label: (tooltipItems, data) => {
          var type = tooltipItems.datasetIndex ? "Overtime" : "Working";
          var multiStringText = [
            `${type} ${viewType.toLowerCase()}s: ${tooltipItems.yLabel}`,
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
      display: false,
    },
    type: "bar",
    scales: {
      

      xAxes: [
        {
          display: reportData.length,
          stacked: true,
        },
      ],
      yAxes: [
        {
          display: reportData.length,
          stacked: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            max: Math.ceil(sumMax) + (Math.ceil(sumMax) % 2 ? 1 : 2) ,
            // stepSize: 20,
          },
        },
      ],
    },
  };

  return (
    <Box className={classes.chart}>
      <Bar
        data={data}
        width={null}
        height={80}
        options={options}
        plugins={plugins}
      />
    </Box>
  );
}
