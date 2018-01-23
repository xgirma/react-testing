import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/components/Header';

// using global configuration
// "snapshotSerializers": ["enzyme-to-json/serializer"]
test('should render Header correctly2', () => {
	const wrapper = shallow(<Header/>);
	expect(wrapper).toMatchSnapshot();
});