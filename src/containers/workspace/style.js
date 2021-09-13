import { makeStyles } from "@material-ui/core/styles";
import * as colors from "assets/css/Common";

const textColor = "#929292";

export const useStyles = makeStyles((theme) => ({
  flexBasic: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    padding: "0px 20px",
  },
  searchBox: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
  },
  searchBar: {
    background: colors.bgColor,
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "none",
    height: "38.5px !important",
    marginRight: "8px",
  },

  moveIcon: {
    color: colors.primaryColor,
    fontSize: 16,
  },

  actionBox: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },

  todayButton: {
    fontSize: 12,
    padding: "7px 15px",
  },
  todayIcon: {
    marginRight: 10,
  },

  calendar: {
    width: "100%",
    marginTop: 10,
  },

  calendarDay: {
    display: "inline-block",
    width: ({ view }) => `calc((100% - 12%)/${view * 7})`,
    padding: "6px 8px 2px",
    margin: 0,
    boxSizing: "border-box",
    border: `1px solid  ${colors.borderColor}`,
    borderLeft: 0,
  },

  textOverall: {
    fontSize: 10,
    fontWeight: 600,
    padding: 2,
  },
  dayText: {
    color: textColor,
    fontSize: 10,
  },
  todayText: {
    color: "white",
    fontSize: 10,
  },
  today: {
    background: `${colors.primaryColor}`,
    color: "white",
  },

  weekend: {
    backgroundImage:
      "linear-gradient(45deg, #F8F8F8 25%,transparent 25%,  transparent 50%, #F8F8F8 50%, #F8F8F8 75%, transparent 75%,#FFF)",
    backgroundSize: "8px 8px",
  },

  select: {
    "& .MuiTextField-root": {
      margin: 0,
      marginLeft: 10,
    },
    "& .MuiSelect-outlined": {
      fontSize: 14,
    },
  },

  leftWidth: {
    width: "12% !important",
  },

  team: {
    minHeight: 47,
    borderTop: 0,
    background: colors.bgColor,
  },
  emptyTeam: {
    borderBottom: 0,
  },

  listBooking: {
    minHeight: 47,
    borderTop: 0,
    position: "relative",
  },
  silbingGrid: {
    position: "absolute",
    left: 0,
    top: 0,
    width: ({ view }) => `calc(100% - ${view}%)`,
    height: "98%",
    "&:hover": {
      border: `1px solid ${colors.primaryColor}`,
      cursor: "pointer",
      backgroundColor: `#9BB7FA`,
      pointerEvents: "pointer",
    },
    "&:active": {
      cursor: "pointer",
      pointerEvents: "none",
    },
  },
}));
