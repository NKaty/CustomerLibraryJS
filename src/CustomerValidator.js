import AddressValidator from './AddressValidator.js';
import BaseValidator from './BaseValidator.js';
import Address from './Address.js';

class CustomerValidator extends BaseValidator {}

CustomerValidator.simpleRuleValidationMap = {
  firstName: [['string'], ['maxLength', 50]],
  lastName: [['required'], ['string'], ['maxLength', 50]],
  addresses: [['required'], ['arrayOfObjects', Address], ['minLength', 1]],
  phoneNumber: [['phone']],
  email: [['email']],
  notes: [['required'], ['arrayOfPrimitives', 'string'], ['minLength', 1]],
  totalPurchasesAmount: [['number']],
  lastPurchaseDate: [['date'], ['minDate', new Date(2020, 0, 1)]],
};

CustomerValidator.complexRuleValidationMap = {
  addresses: (value) => AddressValidator.validate(value),
};

export default CustomerValidator;
