class BaseValidator {
  static validate(obj) {
    return Object.entries(this.getObjectToValidate(obj)).reduce(
      (acc, entries) => {
        const [field, value] = entries;

        if (field in this.simpleRuleValidationMap) {
          const error = this.validateSimpleField(field, value);
          if (error.length) {
            acc.push(error[1]);
            return acc;
          }
        }

        if (field in this.complexRuleValidationMap) {
          const errors = this.validateComplexField(field, value);
          if (errors.length) {
            return [...acc, ...errors[1]];
          }
        }

        return acc;
      },
      []
    );
  }

  static getObjectToValidate(obj) {
    const objToValidate = {};

    Object.keys(this.simpleRuleValidationMap).forEach((item) => {
      objToValidate[item] = undefined;
    });

    Object.keys(this.complexRuleValidationMap).forEach((item) => {
      objToValidate[item] = undefined;
    });

    return Object.assign(objToValidate, obj);
  }

  static validateComplexField(field, value) {
    if (!(field in this.complexRuleValidationMap)) {
      return [];
    }

    let errors;

    if (value instanceof Array) {
      errors = value
        .map((item, index) =>
          this.complexRuleValidationMap[field](value[index]).map(
            (error) => `${field}${index}: ${error}`
          )
        )
        .flat();
    } else {
      errors = this.complexRuleValidationMap[field](value);
    }

    return errors.length ? [field, errors] : [];
  }

  static validateSimpleField(field, value) {
    if (!(field in this.simpleRuleValidationMap)) {
      return [];
    }

    const rules = this.simpleRuleValidationMap[field];

    for (let i = 0; i < rules.length; i += 1) {
      const [rule, ...args] = rules[i];
      const result = this.validationRules[rule](value, ...args);
      if (!result) {
        return [rule, this.errorMessages[rule](field, ...args)];
      }
    }

    return [];
  }
}

BaseValidator.validationRules = {
  required: (value) => !(value === null || value === undefined || value === ''),
  string: (value) =>
    typeof value === 'string' || value === null || value === undefined,
  number: (value) =>
    value === null ||
    value === undefined ||
    (typeof value === 'number' && !Number.isNaN(value)),
  date: (value) =>
    value instanceof Date || value === null || value === undefined,
  arrayOfPrimitives: (value, type) =>
    // eslint-disable-next-line valid-typeof
    value instanceof Array && value.every((item) => typeof item === type),
  arrayOfObjects: (value, type) =>
    value instanceof Array && value.every((item) => item instanceof type),
  minLength: (value, min = 0) =>
    value === null || value === undefined || value.length >= min,
  maxLength: (value, max = Infinity) =>
    value === null || value === undefined || value.length <= max,
  inOptions: (value, options) =>
    options && options.some((item) => value === item),
  email: (value) =>
    value === null ||
    value === undefined ||
    value === '' ||
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
      value
    ),
  phone: (value) =>
    value === null ||
    value === undefined ||
    value === '' ||
    /^\+[1-9]\d{1,14}$/.test(value),
  minDate: (value, min) =>
    value === null || value === undefined || value >= min,
};

BaseValidator.errorMessages = {
  required: (field) => `${field}: The field is required.`,
  string: (field) => `${field}: The field must be a string.`,
  number: (field) => `${field}: The field must be a number.`,
  date: (field) => `${field}: The field must be a date.`,
  arrayOfPrimitives: (field, type) =>
    `${field}: The field must be an array of ${type}s.`,
  arrayOfObjects: (field, type) =>
    `${field}: The field must be an array of ${type.name}s.`,
  minLength: (field, min) =>
    `${field}: The field length must be at least ${min}.`,
  maxLength: (field, max) =>
    `${field}: The field length must be at most ${max}.`,
  inOptions: (field, options) =>
    `${field}: The valid values for the field are ${options.join(', ')}.`,
  email: (field) => `${field}: The email is invalid.`,
  phone: (field) => `${field}: The phone number is invalid.`,
  minDate: (field, minDate) => `${field}: The date must be after ${minDate}.`,
};

BaseValidator.simpleRuleValidationMap = {};

BaseValidator.complexRuleValidationMap = {};

export default BaseValidator;
