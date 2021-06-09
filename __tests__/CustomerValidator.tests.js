import Customer from '../src/Customer';
import Address from '../src/Address';
import CustomerValidator from '../src/CustomerValidator';

describe('CustomerValidator checks firstName field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('firstName', 'value')[0]
    ).toBeUndefined();
  });

  test('it should be string rule error', () => {
    expect(CustomerValidator.validateSimpleField('firstName', 10)[0]).toBe(
      'string'
    );
  });

  test('it should be max length rule error', () => {
    expect(
      CustomerValidator.validateSimpleField('firstName', 'value'.repeat(100))[0]
    ).toBe('maxLength');
  });
});

describe('CustomerValidator checks lastName field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('lastName', 'value')[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(CustomerValidator.validateSimpleField('lastName', '')[0]).toBe(
      'required'
    );
  });

  test('it should be string rule error', () => {
    expect(CustomerValidator.validateSimpleField('lastName', 10)[0]).toBe(
      'string'
    );
  });

  test('it should be max length rule error', () => {
    expect(
      CustomerValidator.validateSimpleField('lastName', 'value'.repeat(100))[0]
    ).toBe('maxLength');
  });
});

describe('CustomerValidator checks addresses field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('addresses', [
        new Address(),
        new Address(),
      ])[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(CustomerValidator.validateSimpleField('addresses', null)[0]).toBe(
      'required'
    );
  });

  test('it should be array of objects rule error', () => {
    expect(CustomerValidator.validateSimpleField('addresses', [1, 3])[0]).toBe(
      'arrayOfObjects'
    );
  });

  test('it should be min length rule error', () => {
    expect(CustomerValidator.validateSimpleField('addresses', [])[0]).toBe(
      'minLength'
    );
  });

  test('it should errors of address object fields', () => {
    const [field, errors] = CustomerValidator.validateComplexField(
      'addresses',
      [new Address(), new Address()]
    );

    expect(field).toBe('addresses');
    expect(errors.length).toBe(12);
  });
});

describe('CustomerValidator checks phone number field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('phoneNumber', '+123456')[0]
    ).toBeUndefined();
  });

  test('it should be phone rule error', () => {
    expect(
      CustomerValidator.validateSimpleField('phoneNumber', 'value')[0]
    ).toBe('phone');
  });
});

describe('CustomerValidator checks email field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('email', 'bob@gmail.com')[0]
    ).toBeUndefined();
  });

  test('it should be email rule error', () => {
    expect(CustomerValidator.validateSimpleField('email', 'value')[0]).toBe(
      'email'
    );
  });
});

describe('CustomerValidator checks notes field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('notes', ['notes1', 'notes2'])[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(CustomerValidator.validateSimpleField('notes', null)[0]).toBe(
      'required'
    );
  });

  test('it should be array of primitives rule error', () => {
    expect(CustomerValidator.validateSimpleField('notes', 'aaa')[0]).toBe(
      'arrayOfPrimitives'
    );
  });

  test('it should be min length rule error', () => {
    expect(CustomerValidator.validateSimpleField('notes', [])[0]).toBe(
      'minLength'
    );
  });
});

describe('CustomerValidator checks totalPurchasesAmount field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('totalPurchasesAmount', 10.54)[0]
    ).toBeUndefined();
  });

  test('it should be number rule error', () => {
    expect(
      CustomerValidator.validateSimpleField('totalPurchasesAmount', 'value')[0]
    ).toBe('number');
  });
});

describe('CustomerValidator checks lastPurchaseDate field', () => {
  test('it should not be error', () => {
    expect(
      CustomerValidator.validateSimpleField('lastPurchaseDate', new Date())[0]
    ).toBeUndefined();
  });

  test('it should be date rule error', () => {
    expect(
      CustomerValidator.validateSimpleField('lastPurchaseDate', 'value')[0]
    ).toBe('date');
  });

  test('it should be min date rule error', () => {
    expect(
      CustomerValidator.validateSimpleField(
        'lastPurchaseDate',
        new Date(2019, 11, 31)
      )[0]
    ).toBe('minDate');
  });
});

describe('CustomerValidator checks customer object', () => {
  test('it should return empty array if object is valid', () => {
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

    const customer = new Customer(
      'Bob',
      'Smith',
      [address1, address2],
      '+123456789',
      'bob@gmail.com',
      ['note1', 'note2'],
      100.45,
      new Date()
    );

    expect(CustomerValidator.validate(customer).length).toBe(0);
  });

  test('it should return array errors if object is invalid', () => {
    const customer = new Customer(
      'Bob'.repeat(100),
      '',
      [new Address(), new Address()],
      '+123456789av',
      'bobgmail.com',
      [1, 2],
      'abc',
      'abc'
    );

    expect(CustomerValidator.validate(customer).length).toBe(19);
  });
});
