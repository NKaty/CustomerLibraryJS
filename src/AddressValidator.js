import BaseValidator from './BaseValidator.js';

class AddressValidator extends BaseValidator {
  constructor() {
    super();
    this.simpleRuleValidationMap = {
      addressLine: [['required'], ['string'], ['maxLength', 100]],
      addressLine2: [['string'], ['maxLength', 100]],
      addressType: [['inOptions', [1, 2]]],
      city: [['required'], ['string'], ['maxLength', 50]],
      postalCode: [['required'], ['string'], ['maxLength', 6]],
      state: [['required'], ['string'], ['maxLength', 20]],
      country: [['inOptions', ['United States', 'Canada']]],
    };
  }
}

export default AddressValidator;
