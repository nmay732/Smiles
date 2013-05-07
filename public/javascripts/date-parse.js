function relativeDate(time_stamp){
  var d = parseInt(new Date(time_stamp).valueOf(), 10); //date given
  var c = parseInt(new Date().valueOf(), 10); //current date
  var diff = Math.floor((c-d)/1000); //time difference in seconds between then and now
  var cutoff = [Date().valueOf(), 31536000, 2592000, 86400, 3600, 60, 1]; //if it's less than this value 
                                                             //you can call it by the 
                                                             //corresponding entry in "words"
  var words = ['year', 'month', 'day', 'hour', 'minute', 'second'];
  for(var i=words.length-1; i>=0; i--){
    if(diff < cutoff[i]){
      var div;
      if(i+1 > cutoff.length) div=1; //if we're counting seconds, don't divide them
      else div=cutoff[i+1]; //if we're not counting in seconds, convert from seconds to this unit
      var val = Math.floor(diff/div);
      console.log("i: " + i);
      console.log("cutoff[i+1]: " + cutoff[i+1]);
      console.log("diff: " + diff);
      console.log("div: " + div);
      console.log("diff/div=val: " + val);
      if(diff < 0){ //this should never happen. may indicate timezone errors TODO: correct for timezones
        return "from the future";
      }
      if(val > 1){ //plural time measurement
        return "" + val + " " + words[i] + "s ago";
      }
      else{ //singular time measurement
        return"a " + words[i] + " ago";
      }
    }
  }
  return"just now"; //polling less than ONE SECOND ago
}

