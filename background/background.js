console.log("background working");

const tba = new blueAllianceApiHelper();

// makeTeamCsv("2017cc", tba);

//Quick example:
async function printAMatchResult(teamNumber, eventKey) {
  const teamKey = "frc" + teamNumber;
  const matches = await tba.get("/team/" + teamKey + "/event/" + eventKey + "/matches");

  const match = matches[0];

  const redTeams = match.alliances.red.team_keys;
  const redScore = match.score_breakdown.red.totalPoints;
  const blueTeams = match.alliances.blue.team_keys;
  const blueScore = match.score_breakdown.blue.totalPoints;

  if (redTeams.includes(teamKey)) {
    console.log("Team " + teamNumber + " was on the red alliance and scored " +
                redScore + " vs the blue alliance who scored " + blueScore);

  }
  else if (blueTeams.includes(teamKey)) {
    console.log("Team " + teamNumber + " was on the blue alliance and scored " +
                blueScore + " vs the red alliance who scored " + redScore);
  }
  else {
    console.log("Unexpected state. Team " + teamNumber + "'s first match listed doesn't contain the team on either alliance");
  }
}

printAMatchResult(5026, "2017cc");
