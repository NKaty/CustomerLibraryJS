// eslint-disable-next-line max-classes-per-file
import BaseValidator from '../src/BaseValidator';

describe('BaseValidator.validationRules', () => {
  test('it should check required rule', () => {
    expect(BaseValidator.validationRules.required('field')).toBeTruthy();
    expect(BaseValidator.validationRules.required(10)).toBeTruthy();
    expect(BaseValidator.validationRules.required([])).toBeTruthy();

    expect(BaseValidator.validationRules.required(null)).toBeFalsy();
    expect(BaseValidator.validationRules.required(undefined)).toBeFalsy();
    expect(BaseValidator.validationRules.required('')).toBeFalsy();
  });

  test('it should check string rule', () => {
    expect(BaseValidator.validationRules.string('field')).toBeTruthy();
    expect(BaseValidator.validationRules.string('')).toBeTruthy();
    expect(BaseValidator.validationRules.string(null)).toBeTruthy();
    expect(BaseValidator.validationRules.string(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.string(10)).toBeFalsy();
    expect(BaseValidator.validationRules.string([])).toBeFalsy();
  });

  test('it should check number rule', () => {
    expect(BaseValidator.validationRules.number(10.78)).toBeTruthy();
    expect(BaseValidator.validationRules.number(0)).toBeTruthy();
    expect(BaseValidator.validationRules.number(null)).toBeTruthy();
    expect(BaseValidator.validationRules.number(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.number(NaN)).toBeFalsy();
    expect(BaseValidator.validationRules.number('abc')).toBeFalsy();
    expect(BaseValidator.validationRules.number([])).toBeFalsy();
  });

  test('it should check date rule', () => {
    expect(BaseValidator.validationRules.date(new Date())).toBeTruthy();
    expect(BaseValidator.validationRules.date(null)).toBeTruthy();
    expect(BaseValidator.validationRules.date(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.date('field')).toBeFalsy();
    expect(BaseValidator.validationRules.date(10)).toBeFalsy();
    expect(BaseValidator.validationRules.date([])).toBeFalsy();
  });

  test('it should check arrayOfPrimitives rule', () => {
    expect(
      BaseValidator.validationRules.arrayOfPrimitives(['a', 'v'], 'string')
    ).toBeTruthy();
    expect(
      BaseValidator.validationRules.arrayOfPrimitives([], 'string')
    ).toBeTruthy();

    expect(
      BaseValidator.validationRules.arrayOfPrimitives('field', 'string')
    ).toBeFalsy();
    expect(
      BaseValidator.validationRules.arrayOfPrimitives(10, 'string')
    ).toBeFalsy();
    expect(
      BaseValidator.validationRules.arrayOfPrimitives([1, 3], 'string')
    ).toBeFalsy();
  });

  test('it should check arrayOfObjects rule', () => {
    expect(
      BaseValidator.validationRules.arrayOfObjects([[], []], Array)
    ).toBeTruthy();
    expect(
      BaseValidator.validationRules.arrayOfObjects([], Array)
    ).toBeTruthy();

    expect(
      BaseValidator.validationRules.arrayOfObjects('field', Array)
    ).toBeFalsy();
    expect(BaseValidator.validationRules.arrayOfObjects(10, Array)).toBeFalsy();
    expect(
      BaseValidator.validationRules.arrayOfObjects([1, 3], Array)
    ).toBeFalsy();
  });

  test('it should check min length rule', () => {
    expect(BaseValidator.validationRules.minLength('field', 4)).toBeTruthy();
    expect(BaseValidator.validationRules.minLength('field', 5)).toBeTruthy();
    expect(BaseValidator.validationRules.minLength(['a', 'b'], 1)).toBeTruthy();
    expect(BaseValidator.validationRules.minLength(null)).toBeTruthy();
    expect(BaseValidator.validationRules.minLength(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.minLength('field', 6)).toBeFalsy();
    expect(BaseValidator.validationRules.minLength([], 1)).toBeFalsy();
  });

  test('it should check min length rule', () => {
    expect(BaseValidator.validationRules.maxLength('field', 10)).toBeTruthy();
    expect(BaseValidator.validationRules.maxLength('field', 5)).toBeTruthy();
    expect(
      BaseValidator.validationRules.maxLength(['a', 'b'], 10)
    ).toBeTruthy();
    expect(BaseValidator.validationRules.maxLength(null)).toBeTruthy();
    expect(BaseValidator.validationRules.maxLength(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.maxLength('field', 4)).toBeFalsy();
    expect(BaseValidator.validationRules.maxLength(['a', 'b'], 1)).toBeFalsy();
  });

  test('it should check in options rule', () => {
    expect(BaseValidator.validationRules.inOptions(1, [1, 2])).toBeTruthy();
    expect(
      BaseValidator.validationRules.inOptions('a', ['a', 'b'])
    ).toBeTruthy();

    expect(BaseValidator.validationRules.inOptions(3, [1, 2])).toBeFalsy();
    expect(
      BaseValidator.validationRules.inOptions('d', ['a', 'b'])
    ).toBeFalsy();
    expect(BaseValidator.validationRules.inOptions([null, [1, 2]])).toBeFalsy();
    expect(
      BaseValidator.validationRules.inOptions([undefined, [1, 2]])
    ).toBeFalsy();
  });

  test('it should check email rule', () => {
    expect(BaseValidator.validationRules.email('bob@gmail.com')).toBeTruthy();
    expect(BaseValidator.validationRules.email('')).toBeTruthy();
    expect(BaseValidator.validationRules.email(null)).toBeTruthy();
    expect(BaseValidator.validationRules.email(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.email('field')).toBeFalsy();
    expect(BaseValidator.validationRules.email(10)).toBeFalsy();
    expect(BaseValidator.validationRules.email([])).toBeFalsy();
  });

  test('it should check phone number rule', () => {
    expect(BaseValidator.validationRules.phone('+1233455')).toBeTruthy();
    expect(BaseValidator.validationRules.phone('')).toBeTruthy();
    expect(BaseValidator.validationRules.phone(null)).toBeTruthy();
    expect(BaseValidator.validationRules.phone(undefined)).toBeTruthy();

    expect(BaseValidator.validationRules.phone('field')).toBeFalsy();
    expect(BaseValidator.validationRules.phone(10)).toBeFalsy();
    expect(BaseValidator.validationRules.phone([])).toBeFalsy();
  });

  test('it should check min date rule', () => {
    expect(
      BaseValidator.validationRules.minDate(new Date(), new Date(2020, 0, 1))
    ).toBeTruthy();
    expect(BaseValidator.validationRules.minDate(null)).toBeTruthy();
    expect(BaseValidator.validationRules.minDate(undefined)).toBeTruthy();

    expect(
      BaseValidator.validationRules.minDate(
        new Date(2000, 0, 1),
        new Date(2020, 0, 1)
      )
    ).toBeFalsy();
    expect(BaseValidator.validationRules.minDate('field')).toBeFalsy();
    expect(BaseValidator.validationRules.minDate(10)).toBeFalsy();
    expect(BaseValidator.validationRules.minDate([])).toBeFalsy();
  });
});

describe('BaseValidator.errorMessages', () => {
  test('it should return required error message', () => {
    expect(BaseValidator.errorMessages.required('fieldName')).toBe(
      'fieldName: The field is required.'
    );
  });

  test('it should return string error message', () => {
    expect(BaseValidator.errorMessages.string('fieldName')).toBe(
      'fieldName: The field must be a string.'
    );
  });

  test('it should return number error message', () => {
    expect(BaseValidator.errorMessages.number('fieldName')).toBe(
      'fieldName: The field must be a number.'
    );
  });

  test('it should return array of primitives error message', () => {
    expect(
      BaseValidator.errorMessages.arrayOfPrimitives('fieldName', 'string')
    ).toBe('fieldName: The field must be an array of strings.');
  });

  test('it should return array of objects error message', () => {
    expect(BaseValidator.errorMessages.arrayOfObjects('fieldName', Array)).toBe(
      'fieldName: The field must be an array of Arrays.'
    );
  });

  test('it should return date error message', () => {
    expect(BaseValidator.errorMessages.date('fieldName')).toBe(
      'fieldName: The field must be a date.'
    );
  });

  test('it should return min length error message', () => {
    expect(BaseValidator.errorMessages.minLength('fieldName', 10)).toBe(
      'fieldName: The field length must be at least 10.'
    );
  });

  test('it should return max length error message', () => {
    expect(BaseValidator.errorMessages.maxLength('fieldName', 10)).toBe(
      'fieldName: The field length must be at most 10.'
    );
  });

  test('it should return in options error message', () => {
    expect(BaseValidator.errorMessages.inOptions('fieldName', ['a', 'b'])).toBe(
      'fieldName: The valid values for the field are a, b.'
    );
  });

  test('it should return email error message', () => {
    expect(BaseValidator.errorMessages.email('fieldName')).toBe(
      'fieldName: The email is invalid.'
    );
  });

  test('it should return phone number error message', () => {
    expect(BaseValidator.errorMessages.phone('fieldName')).toBe(
      'fieldName: The phone number is invalid.'
    );
  });

  test('it should return min date error message', () => {
    expect(BaseValidator.errorMessages.minDate('fieldName', '2020-1-1')).toBe(
      'fieldName: The date must be after 2020-1-1.'
    );
  });
});

describe('BaseValidator.getObjectToValidate', () => {
  test('it should return combined object', () => {
    const objectToValidate = {
      field1: 1,
      field4: 4,
      field5: 5,
    };

    BaseValidator.simpleRuleValidationMap = {
      field1: [['required']],
      field2: [['required']],
    };

    BaseValidator.complexRuleValidationMap = {
      field3: () => true,
    };

    expect(BaseValidator.getObjectToValidate(objectToValidate)).toStrictEqual({
      field1: 1,
      field2: undefined,
      field3: undefined,
      field4: 4,
      field5: 5,
    });
  });
});

describe('BaseValidator.validateSimpleRule', () => {
  test('it should return empty array if field is valid', () => {
    BaseValidator.simpleRuleValidationMap = {
      fieldName: [['required']],
    };

    expect(BaseValidator.validateSimpleField('fieldName', 'value').length).toBe(
      0
    );
  });

  test('it should return empty array if field is not in validation rules', () => {
    expect(BaseValidator.validateSimpleField('fieldName', 'value').length).toBe(
      0
    );
  });

  test('it should return error message if field is invalid', () => {
    BaseValidator.simpleRuleValidationMap = {
      fieldName: [['required']],
    };

    expect(
      BaseValidator.validateSimpleField('fieldName', '').length
    ).toBeTruthy();
  });

  test('it should return empty array if field is not in validation map', () => {
    BaseValidator.simpleRuleValidationMap = {
      fieldName: [['required']],
    };

    expect(
      BaseValidator.validateSimpleField('anotherField', undefined).length
    ).toBe(0);
  });
});

describe('BaseValidator.validateComplexRule', () => {
  class FirstValidator extends BaseValidator {}

  class SecondValidator extends BaseValidator {}

  test('it should return empty array if field is valid', () => {
    FirstValidator.simpleRuleValidationMap = {
      firstName: [['required']],
      lastName: [['required']],
    };
    SecondValidator.complexRuleValidationMap = {
      firstField: (value) => FirstValidator.validate(value),
    };

    expect(
      SecondValidator.validateComplexField('firstField', {
        firstName: 'first name',
        lastName: 'last name',
      }).length
    ).toBe(0);
  });

  test('it should return errors for object if field is invalid', () => {
    FirstValidator.simpleRuleValidationMap = {
      firstName: [['required']],
      lastName: [['required']],
    };
    SecondValidator.complexRuleValidationMap = {
      firstField: (value) => FirstValidator.validate(value),
    };

    const [field, errors] = SecondValidator.validateComplexField(
      'firstField',
      {}
    );

    expect(field).toBe('firstField');
    expect(errors.length).toBe(2);
  });

  test('it should return errors for array of objects if field is invalid', () => {
    FirstValidator.simpleRuleValidationMap = {
      firstName: [['required']],
      lastName: [['required']],
    };
    SecondValidator.complexRuleValidationMap = {
      firstField: (value) => FirstValidator.validate(value),
    };

    const [field, errors] = SecondValidator.validateComplexField('firstField', [
      {},
      {},
    ]);

    expect(field).toBe('firstField');
    expect(errors.length).toBe(4);
  });

  test('it should return empty array if field is not in validation map', () => {
    FirstValidator.simpleRuleValidationMap = {
      firstName: [['required']],
      lastName: [['required']],
    };
    SecondValidator.complexRuleValidationMap = {
      firstField: (value) => FirstValidator.validate(value),
    };

    expect(BaseValidator.validateComplexField('anotherField', {}).length).toBe(
      0
    );
  });
});

describe('BaseValidator.validate', () => {
  class FirstValidator extends BaseValidator {}

  class SecondValidator extends BaseValidator {}

  test('it should return empty array if object is valid', () => {
    FirstValidator.simpleRuleValidationMap = {
      firstName: [['required']],
      lastName: [['required']],
    };
    SecondValidator.simpleRuleValidationMap = {
      email: [['required'], ['email']],
      country: [['required'], ['string'], ['maxLength', 10]],
    };
    SecondValidator.complexRuleValidationMap = {
      firstField: (value) => FirstValidator.validate(value),
    };

    expect(
      SecondValidator.validate({
        email: 'bob@gmail.com',
        country: 'France',
        firstField: {
          firstName: 'name',
          lastName: 'last name',
        },
      }).length
    ).toBe(0);
  });

  test('it should return array errors if object is invalid', () => {
    FirstValidator.simpleRuleValidationMap = {
      firstName: [['required']],
      lastName: [['required']],
    };
    SecondValidator.simpleRuleValidationMap = {
      email: [['required'], ['email']],
      country: [['required'], ['maxLength', 10]],
    };
    SecondValidator.complexRuleValidationMap = {
      firstField: (value) => FirstValidator.validate(value),
    };

    expect(SecondValidator.validate({}).length).toBe(4);
  });
});
