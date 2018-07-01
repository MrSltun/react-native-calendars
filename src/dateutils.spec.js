// const XDate = require('xdate');
const Moment = require('moment');
const dateutils = require('./dateutils');

describe('dateutils', function () {
  describe('sameMonth()', function () {
    it('2014-01-01 === 2014-01-10', function () {
      const a = Moment.utc(Date.UTC(2014, 0, 1));
      const b = Moment.utc(Date.UTC(2014, 0, 10));
      expect(dateutils.sameMonth(a, b)).toEqual(true);
    });
    it('for non-moment instances is false', function () {
      expect(dateutils.sameMonth('a', 'b')).toEqual(false);
      expect(dateutils.sameMonth(123, 345)).toEqual(false);
      expect(dateutils.sameMonth(null, false)).toEqual(false);

      const a = Moment.utc(Date.UTC(2014, 0, 1));
      const b = Moment.utc(Date.UTC(2014, 0, 10));
      expect(dateutils.sameMonth(a, undefined)).toEqual(false);
      expect(dateutils.sameMonth(null, b)).toEqual(false);
    });
  });

  describe('isLTE()', function () {
    it('2014-01-20 >= 2013-12-31 -- 1', function () {
      const a = Moment(new Date(2013, 12, 31));
      const b = Moment(new Date(2014, 1, 20));
      expect(dateutils.isLTE(a, b)).toBe(true);
    });

    it('2014-10-20 >= 2014-10-19 -- 2', function () {
      const a = Moment(new Date(2014, 10, 19));
      const b = Moment(new Date(2014, 10, 20));
      expect(dateutils.isLTE(a, b)).toBe(true);
    });

    it('2014-10-20 >= 2014-09-30 -- 3', function () {
      const a = Moment(new Date(2014, 9, 30));
      const b = Moment(new Date(2014, 10, 20));
      expect(dateutils.isLTE(a, b)).toBe(true);
    });

    it('works for dates that differ by less than a day', function () {
      const a = Moment(new Date(2014, 9, 30, 0, 1,0));
      const b = Moment(new Date(2014, 9, 30, 1, 0,1));
      expect(dateutils.isLTE(a, b)).toBe(true);
      expect(dateutils.isLTE(b, a)).toBe(true);
    });
  });

  describe('isGTE()', function () {
    it('2014-01-20 >= 2013-12-31 -- 1', function () {
      const a = Moment(new Date(2013, 12, 31));
      const b = Moment(new Date(2014, 1, 20));
      expect(dateutils.isGTE(b, a)).toBe(true);
    });

    it('2014-10-20 >= 2014-10-19 -- 2', function () {
      const a = Moment(new Date(2014, 10, 19));
      const b = Moment(new Date(2014, 10, 20));
      expect(dateutils.isGTE(b, a)).toBe(true);
    });

    it('2014-10-20 >= 2014-09-30 -- 3', function () {
      const a = Moment(new Date(2014, 9, 30));
      const b = Moment(new Date(2014, 10, 20));
      expect(dateutils.isGTE(b, a)).toBe(true);
    });

    it('works for dates that differ by less than a day', function () {
      const a = Moment(new Date(2014, 9, 30, 0, 1,0));
      const b = Moment(new Date(2014, 9, 30, 1, 0,1));
      expect(dateutils.isGTE(a, b)).toBe(true);
      expect(dateutils.isGTE(b, a)).toBe(true);
    });
  });

  describe('month()', function () {
    it('2014 May', function () {
      const days = dateutils.month(Moment(new Date(2014, 4, 1)));
      expect(days.length).toBe(31);
    });

    it('2014 August', function () {
      const days = dateutils.month(Moment(new Date(2014, 7, 1)));
      expect(days.length).toBe(31);
    });
  });

  describe('page()', function () {
    it('2014 March', function () {
      const days = dateutils.page(Moment.utc(Date.UTC(2014, 2, 23)));
      expect(days.length).toBe(42);
      expect(days[0].toString())
        .toBe(Moment.utc(Date.UTC(2014, 1, 23, 0, 0, 0)).toString());
      expect(days[days.length - 1].toString())
        .toBe(Moment.utc(Date.UTC(2014, 3, 5, 0, 0, 0)).toString());
    });

    it('2014 May', function () {
      const days = dateutils.page(Moment(new Date(2014, 4, 23)));
      expect(days.length).toBe(35);
    });

    it('2014 June', function () {
      const days = dateutils.page(Moment(new Date(2014, 5, 23)));
      expect(days.length).toBe(35);
    });

    it('2014 August', function () {
      const days = dateutils.page(Moment(new Date(2014, 7, 23)));
      expect(days.length).toBe(42);
    });

    it('2014 October', function () {
      const days = dateutils.page(Moment(new Date(2014, 9, 21)));
      expect(days.length).toBe(35);
    });

    it('has all days in ascending order', function () {
      let days, i, len;

      days = dateutils.page(Moment(new Date(2014, 2, 1)));
      for (i = 0, len = days.length - 1; i < len; i++) {
        expect(days[i + 1].diff(days[i], 'days')).toBe(1);
      }
      days = dateutils.page(Moment(new Date(2014, 9, 1)));
      for (i = 0, len = days.length - 1; i < len; i++) {
        expect(days[i + 1].diff(days[i], 'days')).toBe(1);
      }
    });
  });

});
