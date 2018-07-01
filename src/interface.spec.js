const iface = require('./interface');
// const XDate = require('xdate');
const Moment = require('moment');

describe('calendar interface', () => {
  describe('input', () => {
    it('should return undefined if date is undefined', () => {
      const date = iface.parseDate();
      expect(date).toBe(undefined);
    });

    it('should accept UTC timestamp as argument', () => {
      const date = iface.parseDate(1479832134398);
      expect(date.valueOf()).toEqual(1479832134398);
      expect(date.utcOffset()).toEqual(0);
    });

    it('should accept datestring as argument', () => {
      const date = iface.parseDate('2012-03-16');
      expect(date.format('YYYY-MM-DD')).toEqual('2012-03-16');
      expect(date.utcOffset()).toEqual(0);
    });

    it('should expect object with UTC timestamp as argument', () => {
      const date = iface.parseDate({timestamp: 1479832134398});
      expect(date.valueOf()).toEqual(1479832134398);
      expect(date.utcOffset()).toEqual(0);
    });

    it('should accept moment as argument', () => {
      const testDate = Moment('2016-11-22 00:00:00+03');
      expect(testDate.utc().format()).toEqual('2016-11-21T21:00:00Z');
      const time = 1479772800000;
      expect(Moment.utc(time).format()).toEqual('2016-11-22T00:00:00Z');
    });

    it('should accept Date as argument', () => {
      const testDate = new Date(2015, 5, 5, 12, 0);
      const date = iface.parseDate(testDate);
      expect(date.format('YYYY-MM-DD')).toEqual('2015-06-05');
    });

    it('should accept data as argument', () => {
      const testDate = {
        year: 2015,
        month: 5,
        day: 6
      };
      const date = iface.parseDate(testDate);
      expect(date.format('YYYY-MM-DD')).toEqual('2015-05-06');
    });
  });

  describe('output', () => {
    it('should convert moment to data', () => {
      const time = 1479772800000;
      const testDate = Moment.utc(time);
      expect((testDate).format()).toEqual('2016-11-22T00:00:00Z');
      const data = iface.xdateToData(testDate);
      expect(data).toEqual({
        year: 2016,
        month: 11,
        day: 22,
        timestamp: 1479772800000,
        dateString: '2016-11-22'
      });
    });
  });
});
