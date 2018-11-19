import { format } from 'date-fns';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

describe('Converts the GitHub timestamp to a readable format', () => {
  const timestamp = "2018-11-18T15:55:32Z";

  it('Parses the date properly', () => {
    expect(format(new Date(timestamp), 'MMM DD, YYYY')).toBe('Nov 18, 2018');
  });

  it('Parses the time properly', () => {
    expect(format(new Date(timestamp), 'h:mma')).toBe('10:55am');
  });
})
