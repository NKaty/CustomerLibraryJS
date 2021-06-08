import Person from '../src/Person';

describe('Person', () => {
  test('it should create person', () => {
    const person = new Person('Bob', 'Smith');

    expect(person.firstName).toBe('Bob');
    expect(person.lastName).toBe('Smith');
  });
});
