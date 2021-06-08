import Address from '../src/Address';

describe('Address', () => {
  test('it should create address', () => {
    const address = new Address(
      '75 PARK PLACE',
      '45 BROADWAY',
      1,
      'New York',
      '123456',
      'New York',
      'United States'
    );

    expect(address.addressLine).toBe('75 PARK PLACE');
    expect(address.addressLine2).toBe('45 BROADWAY');
    expect(address.addressType).toBe(1);
    expect(address.city).toBe('New York');
    expect(address.postalCode).toBe('123456');
    expect(address.state).toBe('New York');
    expect(address.country).toBe('United States');
  });
});
