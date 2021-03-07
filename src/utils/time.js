export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  console.log(a);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  // var time =
  //   date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  let dateObj = {
    year: a.getFullYear(),
    month: months[a.getMonth()],
    date: a.getDate(),
    hour: a.getHours(),
    min: a.getMinutes(),
    sec: a.getSeconds(),
    day: days[a.getDay()],
  };
  return dateObj;
}
