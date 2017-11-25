async function makeTeamCsv(eventKey, tbaApiHelper) {
  const csv = [["TeamNumber", "TeamName"]];

  const teams = await tbaApiHelper.get("/event/" + eventKey + "/teams/simple");
  teams.sort(function(a,b) {return a.team_number - b.team_number;});

  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const matches = await tbaApiHelper.get("/team/" + team.key + "/event/" + eventKey + "/matches");
    if (i == 0) {
      for (let j = 1; j <= matches.length + 1; j++) {
        addHeadersForMatch(j, csv);
      }
    }

    //remove non-qual matches
    for (let j = 0; j < matches.length; j++) {
      const match = matches[j];
      if (match && match.comp_level != "qm") {
        matches.splice(j, 1);
        j--;
      }
    }

    matches.sort(function(a,b) {return a.match_number - b.match_number;});

    csvRow = [];
    csvRow.push(team.team_number);
    csvRow.push(team.nickname);
    for(let j = 0; j < matches.length; j++) {
      const match = matches[j];
      csvRow.push(match.match_number);

      let matchTime = "";
      if (match.time) {
        const date = new Date(match.time * 1000);
        matchTime = formatAMPM(date);
      }
      csvRow.push(matchTime);

      let position = "";
      let partner1 = "";
      let partner2 = "";
      let opponent1 = "";
      let opponent2 = "";
      let opponent3 = "";
      let isSurrogate = "";
      if (match.alliances &&
        match.alliances.blue &&
        match.alliances.blue.team_keys &&
        match.alliances.blue.surrogate_team_keys &&
        match.alliances.red &&
        match.alliances.red.team_keys &&
        match.alliances.red.surrogate_team_keys
      ) {
        const redTeams = match.alliances.red.team_keys;
        const blueTeams = match.alliances.blue.team_keys;

        let partners;
        let opponents;
        let surrogates;

        const redIndex = redTeams.indexOf(team.key);
        const blueIndex = blueTeams.indexOf(team.key);
        if (redIndex != -1) {
          redTeams.splice(redIndex, 1);
          partners = redTeams;
          opponents = blueTeams;
          surrogates = match.alliances.red.surrogate_team_keys;

          position = "Red " + (redIndex + 1);
        }
        else if (blueIndex != -1) {
          blueTeams.splice(blueIndex, 1);
          partners = blueTeams;
          opponents = redTeams;
          surrogates = match.alliances.blue.surrogate_team_keys;

          position = "Blue " + (blueIndex + 1);
        }

        if (partners) {
          partner1 = partners[0].substring(3);
          partner2 = partners[1].substring(3);
        }

        if (opponents) {
          opponent1 = opponents[0].substring(3);
          opponent2 = opponents[1].substring(3);
          opponent3 = opponents[2].substring(3);
        }

        if (surrogates.indexOf(team.key) != -1) {
            isSurrogate = "Surrogate";
        }
      }
      csvRow.push(position);
      csvRow.push(partner1);
      csvRow.push(partner2);
      csvRow.push(opponent1);
      csvRow.push(opponent2);
      csvRow.push(opponent3);
      csvRow.push(isSurrogate);
    }

    csv.push(csvRow);
  }

  console.log(csv);
  for (let i = 0; i < csv.length; i++) {
  	let row = csv[i];
  	let rowString = '';
  	for (let j = 0; j < row.length; j++) {
  		rowString += '"' + row[j] + '"';
  		if (j != row.length - 1) {
  			rowString += ',';
  		}
  	}
  	console.log(rowString);
  }
}

function formatAMPM(date) {
  var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var dayOfWeek = weekday[date.getDay()];
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = dayOfWeek + " " + hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function addHeadersForMatch(matchNumber, csv) {
  csv[0].push("Match" + matchNumber + "Number");
  csv[0].push("Match" + matchNumber + "Time");
  csv[0].push("Match" + matchNumber + "Position");
  csv[0].push("Match" + matchNumber + "Partner1");
  csv[0].push("Match" + matchNumber + "Partner2");
  csv[0].push("Match" + matchNumber + "Opponent1");
  csv[0].push("Match" + matchNumber + "Opponent2");
  csv[0].push("Match" + matchNumber + "Opponent3");
  csv[0].push("Match" + matchNumber + "IsSurrogate");
}
