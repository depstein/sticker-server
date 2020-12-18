function processDefaultTimeText(ms) {
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

    for (i = 0; i < orderOfDuration.length; i++) {
    if (parseDuration["_data"][orderOfDuration[i]] !== 0){
        var unit = ((parseDuration["_data"][orderOfDuration[i]] > 1) ? durationAbbr[orderOfDuration[i]] + "s" : durationAbbr[orderOfDuration[i]]);
        topTwoUnits.push([unit, parseDuration["_data"][orderOfDuration[i]]])
        if(topTwoUnits.length === 2) {
        break;
        }
    }
    } 
    if (topTwoUnits.length > 1) {
    finalValue = topTwoUnits[0][1] + " " + topTwoUnits[0][0] + ", " + topTwoUnits[1][1] + " " + topTwoUnits[1][0];
    }
    else {
    finalValue = topTwoUnits[0][1] + " " + topTwoUnits[0][0];
    }
    
    return finalValue;
}