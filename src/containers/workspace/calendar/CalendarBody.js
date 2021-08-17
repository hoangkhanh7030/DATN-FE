import React, { Fragment } from "react";
import * as _ from "underscore";
import TeamRow from "./TeamRow";
import ResourceRow from "./ResourceRow";

export default function CalendarBody({
  calendar = [],
  view = 1,
  teams = [],
  resources = [],
  handleRenameTeam,
  handleDeleteBooking,
}) {
  teams = _.isEmpty(teams) ? Array(2).fill({}) : teams;

  return teams.map((team, index) => {
    return (
      <Fragment key={index}>
        <TeamRow
          team={team}
          calendar={calendar}
          view={view}
          resources={resources}
          handleRenameTeam={handleRenameTeam}
        />

        <ResourceRow
          team={team}
          indexTeam={index}
          calendar={calendar}
          view={view}
          resources={resources}
          handleDeleteBooking={handleDeleteBooking}
        />
      </Fragment>
    );
  });
}
