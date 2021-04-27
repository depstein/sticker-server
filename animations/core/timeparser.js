function processDefaultTimeText(ms, unit) {
    var parseDuration = moment.duration(ms);
    var orderOfDuration = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
    var durationAbbr = {
      "years": "year", 
      "months": "month",
      "days": "day", 
      "hours": "hour", 
      "minutes": "min", 
      "seconds": "sec", 
      "milliseconds": "ms"
    }
    var topTwoUnits = [];
    var finalValue = "";

    // display hour:minute
    if (unit == "hour:minute")
    {
      for (var i = 0; i < orderOfDuration.length; i++) {
      if (parseDuration["_data"][orderOfDuration[i]] !== 0){
          var unit = ((parseDuration["_data"][orderOfDuration[i]] > 1) ? durationAbbr[orderOfDuration[i]] + "s" : durationAbbr[orderOfDuration[i]]);
          topTwoUnits.push([unit, parseDuration["_data"][orderOfDuration[i]]])
          if(topTwoUnits.length === 2) {
          break;
          }
      }
      
      } 
      if (topTwoUnits.length > 1) {
        finalValue = Math.floor(topTwoUnits[0][1]) + " " + topTwoUnits[0][0] + ", " + Math.floor(topTwoUnits[1][1]) + " " + topTwoUnits[1][0];
      }
      else if(topTwoUnits.length > 0) {
        finalValue = Math.floor(topTwoUnits[0][1]) + " " + topTwoUnits[0][0];
      } else {
        finalValue = "0 sec";
      }
    }
    else if (unit == "days")
    {
      finalValue = ms/1000/86400 + (ms/1000/86400 == 1 ? " day" : " days");
    }
    else 
    {
      finalValue = ms/1000 + " seconds";
    }
    // TODO: custom value?
    return finalValue;
}