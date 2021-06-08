import Address from '../src/Address';
import Customer from '../src/Customer';

describe('Customer', () => {
  test('it should create customer', () => {
    const address1 = new Address(
      '75 PARK PLACE',
      '45 BROADWAY',
      1,
      'New York',
      '123456',
      'New York',
      'United States'
    );

    const address2 = new Address(
      '100 PARK PLACE',
      '866 BROADWAY',
      2,
      'Some city',
      '654321',
      'Some state',
      'Canada'
    );

    const purchaseDate = Date.now();

    const customer = new Customer(
      'Bob',
      'Smith',
      [address1, address2],
      '+123456789',
      'bob@gmail.com',
      ['note1', 'note2'],
      100.45,
      purchaseDate
    );

    expect(customer.firstName).toBe('Bob');
    expect(customer.lastName).toBe('Smith');
    expect(customer.phoneNumber).toBe('+123456789');
    expect(customer.email).toBe('bob@gmail.com');
    expect(customer.totalPurchasesAmount).toBe(100.45);
    expect(customer.lastPurchaseDate).toBe(purchaseDate);

    expect(customer.notes[0]).toBe('note1');
    expect(customer.notes[1]).toBe('note2');

    expect(customer.addresses[0].addressLine).toBe('75 PARK PLACE');
    expect(customer.addresses[0].addressLine2).toBe('45 BROADWAY');
    expect(customer.addresses[0].addressType).toBe(1);
    expect(customer.addresses[0].city).toBe('New York');
    expect(customer.addresses[0].postalCode).toBe('123456');
    expect(customer.addresses[0].state).toBe('New York');
    expect(customer.addresses[0].country).toBe('United States');

    expect(customer.addresses[1].addressLine).toBe('100 PARK PLACE');
    expect(customer.addresses[1].addressLine2).toBe('866 BROADWAY');
    expect(customer.addresses[1].addressType).toBe(2);
    expect(customer.addresses[1].city).toBe('Some city');
    expect(customer.addresses[1].postalCode).toBe('654321');
    expect(customer.addresses[1].state).toBe('Some state');
    expect(customer.addresses[1].country).toBe('Canada');
  });
});
