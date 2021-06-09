import Address from '../src/Address';
import AddressValidator from '../src/AddressValidator';

describe('AddressValidator checks addressLine field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('addressLine', 'value')[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(AddressValidator.validateSimpleField('addressLine', '')[0]).toBe(
      'required'
    );
  });

  test('it should be string rule error', () => {
    expect(AddressValidator.validateSimpleField('addressLine', 10)[0]).toBe(
      'string'
    );
  });

  test('it should be max length rule error', () => {
    expect(
      AddressValidator.validateSimpleField(
        'addressLine',
        'value'.repeat(100)
      )[0]
    ).toBe('maxLength');
  });
});

describe('AddressValidator checks addressLine2 field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('addressLine2', 'value')[0]
    ).toBeUndefined();
  });

  test('it should not be error if field is empty', () => {
    expect(
      AddressValidator.validateSimpleField('addressLine2', '')[0]
    ).toBeUndefined();
  });

  test('it should be string rule error', () => {
    expect(AddressValidator.validateSimpleField('addressLine2', 10)[0]).toBe(
      'string'
    );
  });

  test('it should be max length rule error', () => {
    expect(
      AddressValidator.validateSimpleField(
        'addressLine2',
        'value'.repeat(100)
      )[0]
    ).toBe('maxLength');
  });
});

describe('AddressValidator checks addressType field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('addressType', 1)[0]
    ).toBeUndefined();
  });

  test('it should be inOptions rule error', () => {
    expect(AddressValidator.validateSimpleField('addressType', 10)[0]).toBe(
      'inOptions'
    );
  });
});

describe('AddressValidator checks city field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('city', 'value')[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(AddressValidator.validateSimpleField('city', '')[0]).toBe(
      'required'
    );
  });

  test('it should be string rule error', () => {
    expect(AddressValidator.validateSimpleField('city', 10)[0]).toBe('string');
  });

  test('it should be max length rule error', () => {
    expect(
      AddressValidator.validateSimpleField('city', 'value'.repeat(100))[0]
    ).toBe('maxLength');
  });
});

describe('AddressValidator checks postalCode field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('postalCode', 'value')[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(AddressValidator.validateSimpleField('postalCode', '')[0]).toBe(
      'required'
    );
  });

  test('it should be string rule error', () => {
    expect(AddressValidator.validateSimpleField('postalCode', 10)[0]).toBe(
      'string'
    );
  });

  test('it should be max length rule error', () => {
    expect(
      AddressValidator.validateSimpleField('postalCode', 'value'.repeat(100))[0]
    ).toBe('maxLength');
  });
});

describe('AddressValidator checks state field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('state', 'value')[0]
    ).toBeUndefined();
  });

  test('it should be required rule error', () => {
    expect(AddressValidator.validateSimpleField('state', '')[0]).toBe(
      'required'
    );
  });

  test('it should be string rule error', () => {
    expect(AddressValidator.validateSimpleField('state', 10)[0]).toBe('string');
  });

  test('it should be max length rule error', () => {
    expect(
      AddressValidator.validateSimpleField('state', 'value'.repeat(30))[0]
    ).toBe('maxLength');
  });
});

describe('AddressValidator checks country field', () => {
  test('it should not be error', () => {
    expect(
      AddressValidator.validateSimpleField('country', 'Canada')[0]
    ).toBeUndefined();
  });

  test('it should be inOptions rule error', () => {
    expect(AddressValidator.validateSimpleField('country', 'France')[0]).toBe(
      'inOptions'
    );
  });
});

describe('AddressValidator checks address object', () => {
  test('it should return empty array if object is valid', () => {
    const address = new Address(
      '75 PARK PLACE',
      '45 BROADWAY',
      1,
      'New York',
      '123456',
      'New York',
      'United States'
    );

    expect(AddressValidator.validate(address).length).toBe(0);
  });

  test('it should return array errors if object is invalid', () => {
    const address = new Address(
      undefined,
      'value'.repeat(100),
      10,
      null,
      '1234568999999',
      '',
      'France'
    );

    expect(AddressValidator.validate(address).length).toBe(7);
  });
});
