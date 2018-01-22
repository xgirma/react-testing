import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

test('should setup remove expense action object', () => {
	const action = removeExpense({id: 5});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: 5
	})
});

test('should setup edit expense action object', () => {
	const action = editExpense(5, { note: 'New note value'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 5,
		updates: { note: 'New note value'}
	})
});

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

test('should setup add expense action object with default values', () => {
	const expenseDefault = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	};
	const action = addExpense({});
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseDefault,
			id: expect.any(String)
		}
	})
});
