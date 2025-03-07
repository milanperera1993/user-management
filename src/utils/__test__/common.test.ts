import { getBaseUrl, getMockId } from '../common';

test('getBaseUrl returns correct URL', () => {
  expect(getBaseUrl()).toBe('https://user-server-5wqf.onrender.com');
});

test('getMockId generates correct mock ID', () => {
  expect(getMockId('1')).toBe('2');
  expect(getMockId('10')).toBe('11');
});