console.log("background working");

const tba = new blueAllianceApiHelper();

// makeTeamCsv("2017cc", tba);

//Quick example:
// document.getElementById("submit").onclick = printResult;

function onRequest(request, sender, cb) {
  console.log(request);
  console.log(cb);
  console.log("LAST ERR: "+chrome.runtime.lastError);
  if (request.action == 'printResult') {
    printAMatchResult(request.team, request.match, request.event).then(function(result) {
      console.log(result);
      console.log(cb);
      cb({'out' :result});
      console.log("LAST ERROR")
      console.log(chrome.runtime.lastError);
    });
    // console.log(out);
    // cb(out);
  }
  else {
    cb(null);
  }
  return true;
}


async function printResult() {
  const teamN = document.getElementById("team");
  const matchN = document.getElementById("match#");
  const event = document.getElementById("event");

  printAMatchResult(teamN, matchN, event);
}
async function printAMatchResult(teamNumber, matchn, eventKey) {
  const teamKey = "frc" + teamNumber;
  const matches = await tba.get("/team/" + teamKey + "/event/" + eventKey + "/matches");

  const match = matches[matchn-1]; //?

  const redTeams = match.alliances.red.team_keys;
  const redScore = match.score_breakdown.red.totalPoints;
  const blueTeams = match.alliances.blue.team_keys;
  const blueScore = match.score_breakdown.blue.totalPoints;

  var str = "";

  if (redTeams.includes(teamKey)) {
    str = "Team " + teamNumber + " was on the red alliance and scored " + redScore + " vs the blue alliance who scored " + blueScore;

  }
  else if (blueTeams.includes(teamKey)) {
    str = "Team " + teamNumber + " was on the blue alliance and scored " + blueScore + " vs the red alliance who scored " + redScore;
  }
  else {
    str = "Unexpected state. Team " + teamNumber + "'s first match listed doesn't contain the team on either alliance";
  }
  return {"redTeams": redTeams, "blueTeams": blueTeams, "redScore": redScore, "blueScore": blueScore, "matchNumber": matchn, "teamNumber": teamNumber};
}

printAMatchResult(5026, 1, "2017cc").then(function(response) {
  console.log(response);
});
chrome.runtime.onMessage.addListener(onRequest);