import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useStyles } from "./style";

export default function Chart({ reportData = [], reportType = "project" }) {
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
  const overtimeDays = reportData?.map((item) => item.overtimeDays);

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
          chart.data.datasets[0].data.length < 1 &&
          chart.data.datasets[1].data.length < 1
        ) {
          let ctx = chart.ctx;
          let width = chart.width;
          let height = chart.height;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "30px Arial";
          ctx.fillText("No data to display", width / 2, height / 2);
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
          var multiStringText = [`${type} hours: ${tooltipItems.yLabel}`];

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
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
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
        height={null}
        options={options}
        plugins={plugins}
      />
    </Box>
  );
}
