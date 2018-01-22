# Setup Jest
    
    npm run test
    
<img width="1624" alt="no test" src="https://user-images.githubusercontent.com/5876481/35201326-2d64fce6-fecf-11e7-8b62-bd7bc39ed427.png">

It is important to have .test or .spec extension. 

    **/__tests__/**/*.js?(x),**/?(*.)(spec|test).js?(x)
    
## toBe vs toEqual

```javascript
test('should setup remove expense action object', () => {
	const action = removeExpense({id: 5});
	expect(action).toBe({
		type: 'REMOVE_EXPENSE',
		id: 5
	})
});
```
`toBe` is not going to work for this code.

<img width="1624" alt="toBe vs toEqual" src="https://user-images.githubusercontent.com/5876481/35201471-a58474da-fed0-11e7-962f-24205419fd82.png">

    Compared values have no visual difference. Looks like you wanted to test for object/array equality with strict `toBe` matcher. You probably need to use `toEqual` instead.
    
Expected value to be (using ===) (Jest 20), Expected value to be (using Object.is): when we use triple equal to compare `objects` we never going to find out they are equal. Let us try this in `Console`. 

<img width="750" alt="object, array deep equal" src="https://user-images.githubusercontent.com/5876481/35201568-6f689fe2-fed1-11e7-9366-e463fee841e7.png">

```javascript

test('should setup remove expense action object', () => {
	const action = removeExpense({id: 5});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: 5
	})
});
```
Test: :white_check_mark:

## Dynamic data like uuid

action
```javascript
// ADD_EXPENSE
export const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),  // here ...
    description,
    note,
    amount,
    createdAt
  }
});
```
test
```javascript
test('should setup add expense action object with provided values', () => {
	const expenseDate = {
		description: 'Rent',
		note: 'This was last month rent.',
		amount: 1230000,
		createdAt: 1000
	};
	const action = addExpense(expenseDate);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseDate
		}
	})
});
```

<img width="1628" alt="uuid failer" src="https://user-images.githubusercontent.com/5876481/35202104-648a47ac-fed5-11e7-867e-cb2e436c7838.png">

The id changes every single time we run the test. So what we do about it? We can use `expect` method `expect.any(constructor)`. This allows us to just assert about the `type`. 

```javascript

test('should setup add expense action object with provided values', () => {
	const expenseDate = {
		description: 'Rent',
		note: 'This was last month rent.',
		amount: 1230000,
		createdAt: 1000
	};
	const action = addExpense(expenseDate);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseDate,
			id: expect.any(String)
		}
	})
});
```
Test: :white_check_mark:


