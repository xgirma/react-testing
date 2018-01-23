import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../../../src/components/Header';

// assertions
test('should render Header correctly', () => {
	const wrapper = shallow(<Header/>);
	expect(wrapper.find('h1').length).toBe(1);
	expect(wrapper.find('h1').text()).toBe("Expensify");
});

// snapshot testing
test('should render Header correctly', () => {
	const wrapper = shallow(<Header/>);
	expect(wrapper).toMatchSnapshot();
});

// using enzyme-to-json
test('should render Header correctly', () => {
	const wrapper = shallow(<Header/>);
	expect(toJson(wrapper)).toMatchSnapshot();
});

test('should render Header correctly2', () => {
	const wrapper = shallow(<Header/>);
	expect(toJson(wrapper)).toMatchSnapshot();
});