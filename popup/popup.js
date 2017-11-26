$(document).ready(function() {
  document.getElementById("submit").onclick = submit;
})

function submit() {
  console.log("SENDING MESSAGE...");
  var packet = {'action' : 'printResult',
    'team' : document.getElementById("team").value,
    'match' : document.getElementById("match#").value,
    'event' : document.getElementById("event").value};
  console.log("PACKET:"+"\n"+packet.action+"\n"+packet.team);
  chrome.runtime.sendMessage(packet,
    function(response) {
      // console.log("LAST ERR: "+chrome.runtime.lastError);
      console.log(response);
      var team = response.out.teamNumber;

      document.getElementById('team_match').innerHTML = "Team "+team+" in their match #"+response.out.matchNumber+":";

      // document.getElementById('output').innerHTML = '<hr>\n<p id="team_match">Team '+team+' in Match #'+response.out.matchNumber+':</p>\n<hr>';
      
      document.getElementById('red').innerHTML = '<div>RED TEAMS</div>';
      for (var i = 0; i < response.out.redTeams.length; i++) {
        var prefix = "";
        var suffix = "";
        var rTeam = response.out.redTeams[i].substring(3,response.out.redTeams[i].length);
        if (team == rTeam) {
          prefix = "<b>";
          suffix = "</b>";
        }
        document.getElementById('red').innerHTML += '<div>'+prefix+rTeam+suffix+"</div>";
      }
      document.getElementById('red').innerHTML += '<div><b>Score: '+response.out.redScore+'</b></div>';

      document.getElementById('blue').innerHTML = '<div>BLUE TEAMS</div>';
      for (var i = 0; i < response.out.blueTeams.length; i++) {
        var prefix = "";
        var suffix = "";
        var bTeam = response.out.blueTeams[i].substring(3,response.out.blueTeams[i].length);
        if (team == bTeam) {
          prefix = "<b>";
          suffix = "</b>";
        }
        document.getElementById('blue').innerHTML += '<div>'+prefix+bTeam+suffix+"</div>";
      }
      document.getElementById('blue').innerHTML += '<div><b>Score: '+response.out.blueScore+'</b></div>';
    });
}