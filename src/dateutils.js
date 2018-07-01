// const XDate = require('xdate');
const Moment = require('moment');

function sameMonth(a, b) {
  return Moment.isMoment(a) && Moment.isMoment(b) &&
    a.get('year') === b.get('year') &&
    a.get('month') === b.get('month');
}

function sameDate(a, b) {
  return Moment.isMoment(a) && Moment.isMoment(b) &&
    a.get('year') === b.get('year') &&
    a.get('month') === b.get('month') &&
    a.get('date') === b.get('date');
}

function isGTE(a, b) {
  return a.diff(b, 'days') > -1;
}

function isLTE(a, b) {
  return b.diff(a, 'days') > -1;
}

function fromTo(a, b) {
  const days = [];
  let from = +a, to = +b;
  for (; from <= to; from = Moment.utc(from).add(1, 'days').valueOf()) {
    days.push(Moment.utc(from));
  }
  return days;
}

function month(xd) {
  const year = xd.get('year'), month = xd.get('month');
  const days = new Date(year, month + 1, 0).getDate();

  // const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
  const firstDay = Moment.utc({year: year, month: month, day: 1, hour: 0, minute: 0, second: 0});
  // const lastDay = new XDate(year, month, days, 0, 0, 0, true);
  const lastDay = Moment.utc({year: year , month: month, day: days, hour: 0, minute: 0, second: 0});

  return fromTo(firstDay, lastDay);
}

function weekDayNames(firstDayOfWeek = 0) {
  // let weekDaysNames = XDate.locales[XDate.defaultLocale].dayNamesShort;
  let weekDaysNames = Moment.weekdaysShort();
  const dayShift = firstDayOfWeek % 7;
  if (dayShift) {
    weekDaysNames = weekDaysNames.slice(dayShift).concat(weekDaysNames.slice(0, dayShift));
  }
  return weekDaysNames;
}

function page(xd, firstDayOfWeek) {
  const days = month(xd);
  let before = [], after = [];

  const fdow = ((7 + firstDayOfWeek) % 7) || 7;
  const ldow = (fdow + 6) % 7;

  firstDayOfWeek = firstDayOfWeek || 0;

  const from = days[0].clone();
  if (from.get('day') !== fdow) {
    from.add(-(from.get('day') + 7 - fdow) % 7, 'days');
  }

  const to = days[days.length - 1].clone();
  const day = to.get('day');
  if (day !== ldow) {
    to.add((ldow + 7 - day) % 7, 'days');
  }

  if (isLTE(from, days[0])) {
    before = fromTo(from, days[0]);
  }

  if (isGTE(to, days[days.length - 1])) {
    after = fromTo(days[days.length - 1], to);
  }

  return before.concat(days.slice(1, days.length - 1), after);
}

module.exports = {
  weekDayNames,
  sameMonth,
  sameDate,
  month,
  page,
  fromTo,
  isLTE,
  isGTE
};
