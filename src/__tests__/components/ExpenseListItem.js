import React from 'react';
import { shallow } from 'enzyme'
import ExpenseListItem  from "../../components/ExpenseListItem";
import expenses from '../../fixtures/expenses';

test('should render ExpenseListItem correctly', () => {
	const expense = {
		amount:expenses[0].amount,
		createdAt:expenses[0].createdAt,
		description:expenses[0].description,
		id:expenses[0].id,
	};
	const wrapper = shallow(<ExpenseListItem {...expense}/>);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListItem correctly', () => {
	const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
	expect(wrapper).toMatchSnapshot();
});
