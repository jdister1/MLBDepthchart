var spinner = null;
var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

$(document).ready(function() {
    //instantiates foundation framework
    $(document).foundation();

    loadTeamDropdown();

    $(".teamNameListItem").click(function(){
      //loading spinner
      loader(1);
      //close dropdown
      $('#teamNames').foundation('dropdown', 'close', $('#teamNames'))
      //empty current results
      $("#positionResults").html('');
      getTeamDepthChart($(this).attr('id'));
    });

});

function getTeamDepthChart(teamId){
   var url = 'http://cleveland.indians.mlb.com/team/depth_chart/index.jsp?c_id='+teamId+'';
   $.ajax({
   url: url,
   type: 'get',
   success: function(res) {
      printDepthChart(res);
   }
   });
};
function printDepthChart(data){
  var positions = ["LF","CF","RF","SS","2B","1B","DH","C","3B","SP","P","DL"];
  var positionNames = ["Left Field","Center Field","Right Field","Short Stop","Second Base","First Base","Designated Hitter","Catcher","Third Base","Rotation" ,"Bullpen","Disabled List"];
  for(var i = 0; i < positions.length; ++i)
  {
    //create header for position
    var htmlInsert = "<ul class='pricing-table'>";
    //gets position name
    htmlInsert = htmlInsert + "<li class='title'>"+positionNames[i]+"</li>";

    //to see when starter should be inserted
    var counter = 0;
    $(data.responseText).find('#pos_'+positions[i]+' > ul > li > a').each(function() {
       if(counter == 0)
          htmlInsert = htmlInsert + "<li class='price'>"+$(this).text()+"</li>";
       else
          htmlInsert = htmlInsert + "<li class='bullet-item'>"+$(this).text()+"</li>";
       ++counter;
    });
    htmlInsert = htmlInsert + "</ul>"
    //after looping through possibilities, append entire string
    $("#positionResults").append(htmlInsert);

    loader(0);
  }
}

function loadTeamDropdown(){
  var teamNames = ["Angels","Astros","Athletics","Blue Jays","Braves","Brewers","Cardinals","Cubs","Diamondbacks","Dodgers", "Giants","Indians","Mariners","Marlins","Mets","Nationals","Orioles","Padres","Phillies","Pirates","Rangers","Rays","Red Sox"
  ,"Reds","Rockies","Royals","Tigers","Twins","White Sox","Yankees"];
  var teamId = ["ana","hou","oak","tor","atl","mil","stl","chc","ari","la","sf","cle","sea","mia","nym","was","bal","sd","phi","pit","tex","tb","bos",
  "cin","col", "kc","det","min","cws","nyy"];

  for(var i = 0; i < teamNames.length; ++i)
  {
    $("#teamNames").append("<li class='teamNameListItem' id='"+teamId[i]+"'>"+ teamNames[i]+"</li>");
  }
}

function loader(doLoad){
  var target = document.getElementById('search');
  if(doLoad == 1)
  {
    spinner = new Spinner(opts).spin(target);
  }
  else{
    spinner.stop();
  }


}
