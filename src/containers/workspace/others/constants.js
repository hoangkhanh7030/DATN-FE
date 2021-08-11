export const VIEWS = [
  { label: "Week view", value: 1 },
  { label: "Two weeks view", value: 2 },
  { label: "Four weeks view", value: 4 },
];

export const DAY = "day";
export const DAYS = "days";
export const WEEK = "week";

export const DAY_FMT = "ddd";
export const DATE_FMT = "DD";

export const DMY = "DD MMM YYYY";
export const D_M_Y = "DD-MM-YYYY";

export const SUN = "Sun";
export const WEEKENDS = ["Sat", "Sun"];

/*-------------- ---------------*/
export const EMPTY_TEAMS = [];

export const EMPTY_RESOURCES = [];

export const TEAMS = [
  { id: 1, name: "DESIGN TEAM" },
  { id: 2, name: "BACKEND" },
];

export const RESOURCES = [
  {
    idResource: 1,
    name: "Alan Smith",
    idTeam: 1,
    position: "UX DESIGNER",
    booking: [
      [
        {
          id: 2,
          startDate: "2021-08-02",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#fb7e3c",
            colorPattern: "#c86430",
          },
        },
      ],
      [
        {
          id: 1,
          startDate: "2021-08-03",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#fb7e3c",
            colorPattern: "#c86430",
          },
        },
      ],
      [
        {
          id: 4,
          startDate: "2021-08-04",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
      ],
      [
        {
          id: 4,
          startDate: "2021-08-05",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
      ],
      [
        {
          id: 4,
          startDate: "2021-08-06",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
      ],
    ],
  },
  {
    idResource: 2,
    name: "Marie Jutten",
    idTeam: 1,
    position: "UI DESIGNER",
    booking: [
      [
        {
          id: 1,
          startDate: "2021-08-03",
          endDate: "2021-08-04",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#fb7e3c",
            colorPattern: "#c86430",
          },
        },

        {
          id: 4,
          startDate: "2021-08-02",
          endDate: "2021-08-02",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
        {
          id: 5,
          startDate: "2021-08-05",
          endDate: "2021-08-05",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
        {
          id: 3,
          startDate: "2021-08-06",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
      ],
      [
        {
          id: 2,
          startDate: "2021-08-02",
          endDate: "2021-08-06",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#fb7e3c",
            colorPattern: "#c86430",
          },
        },
      ],
    ],
  },
  {
    idResource: 3,
    name: "Leonardo Dicapriooooooooo",
    idTeam: 2,
    position: "Java Developer",
    booking: [
      [
        {
          id: 1,
          startDate: "2021-08-02",
          endDate: "2021-08-04",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#fb7e3c",
            colorPattern: "#c86430",
          },
        },
        {
          id: 3,
          startDate: "2021-08-05",
          endDate: "2021-08-05",
          project: {
            id: 1,
            name: "Globis Sight",
            clientName: "CLIENT MANAGED",
            textColor: "#fff",
            color: "#89d34f",
            colorPattern: "#6da83f",
          },
        },
      ],
    ],
  },
  {
    idResource: 4,
    name: "Tony Dang",
    idTeam: 2,
    position: "JS Developer",
    booking: [],
  },
];
