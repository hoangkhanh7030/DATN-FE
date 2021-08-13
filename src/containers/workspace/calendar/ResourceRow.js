import React from "react";

import ResourceCell from "./ResourceCell";

import EventRow from "./EventRow";

import * as _ from "underscore";

export default function ResourceRow({
  calendar = [],
  resources = [],
  view = 1,
  team = {},
  indexTeam = 1,
}) {
  resources = _.isEmpty(resources) ? Array(3).fill({}) : resources;
  return resources
    .filter((resource) => _.get(resource, "teamId") === _.get(team, "id"))
    .map((resource, index) => {
      return (
        <>
          <ResourceCell
            resource={resource}
            team={team}
            lastRsc={indexTeam === 1 && index === 2}
          />

          <EventRow
            team={team}
            calendar={calendar}
            view={view}
            resource={resource}
          />
        </>
      );
    });
}
