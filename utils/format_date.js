
const formatDate = (date) => {
  let d=new Date();
  d.setTime(Date.parse(date))
  let year=d.getFullYear(),
      month=d.getMonth()+1,
      day=d.getDate(),
      hour=d.getHours(),
      minute=d.getMinutes() < 10 ? ('0'+d.getMinutes()) : d.getMinutes();
  return `${year}/${month}/${day} ${hour}:${minute}`
}

module.exports = formatDate;