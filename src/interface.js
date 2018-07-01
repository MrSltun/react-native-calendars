// const XDate = require('xdate');
const Moment = require('moment');

function padNumber(n) {
  if (n < 10) {
    return '0' + n;
  }
  return n;
}

function xdateToData(xdate) {
  const dateString = xdate.format('YYYY-MM-DD');
  return {
    year: xdate.get('year'),
    month: xdate.get('month') + 1,
    day: xdate.get('date'),
    timestamp: Moment.utc(dateString).valueOf(),
    dateString: dateString
  };
}

function parseDate(d) {
  if (!d) {
    return;
  } else if (d.timestamp) { // conventional data timestamp
    return Moment.utc(d.timestamp);
  } else if (Moment.isMoment(d)) { // xdate 
    return Moment.utc(d.format('YYYY-MM-DD'));
  } else if (d.getTime) { // javascript date
    const dateString = d.getFullYear() + '-' + padNumber((d.getMonth() + 1)) + '-' + padNumber(d.getDate());
    return Moment.utc(dateString);
  } else if (d.year) {
    const dateString = d.year + '-' + padNumber(d.month) + '-' + padNumber(d.day);
    return Moment.utc(dateString);
  } else if (d) { // timestamp nuber or date formatted as string
    return Moment.utc(d);
  }
}

module.exports = {
  xdateToData,
  parseDate
};

