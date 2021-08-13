import React from "react";
import * as _ from "underscore";
import TeamRow from "./TeamRow";
import ResourceRow from "./ResourceRow";

export default function CalendarBody({
  calendar = [],
  view = 1,
  teams = [],
  resources = [],
}) {
  teams = _.isEmpty(teams) ? Array(2).fill({}) : teams;

  return teams.map((team, index) => {
    return (
      <>
        <TeamRow team={team} calendar={calendar} view={view}  resources={resources} />

        <ResourceRow
          team={team}
          indexTeam={index}
          calendar={calendar}
          view={view}
          resources={resources}
        />
      </>
    );
  });
}
