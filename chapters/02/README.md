# Testing React Components

Testing React component is very different from testing `actions` and `reducers`. 

    testing what renderes under what condition?
    
    we also test how the component react to user interactions?
    
    if i change a filter is the state of the component actually changing?
    
## Snapshot testing

using the `<Header />` component. We need to find a way to virtually render our component, because we are not going to view it in Browser, instead we are going to access it via code. 

    react-test-renderer 
    
`react-test-renderer` allows us to render our component inside a regular JavaScript code. It has `shallow` and `full DOM` rendering. For the <Header /> component we will be using the shallow rendering since we are not concerned about user interaction. 
    
```javascript
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../../src/components/Header';

test('should render Header correctly', () => {
	const renderer = new ReactShallowRenderer();
	renderer.render(<Header/>);
	console.log(renderer.getRenderOutput());
});
```

<img width="1624" alt="renderer" src="https://user-images.githubusercontent.com/5876481/35260659-8b69b0f0-ffc1-11e7-99ce-6ffda5d5f0e2.png">

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClas sName="is-active">Create Expense</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
  </header>
);

export default Header;
```

Snapshot: [`toMatchSnapshot(optionalString)`](https://facebook.github.io/jest/docs/en/expect.html#tomatchsnapshotoptionalstring) is the single command we need from expect.  

The first time the test runs test will pass, Jest will go ahead and create the `snapshot` file. The second time we run the test it will compare if it is the same. 

```javascript
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../../src/components/Header';

test('should render Header correctly', () => {
	const renderer = new ReactShallowRenderer();
	renderer.render(<Header/>);
	expect(renderer.getRenderOutput()).toMatchSnapshot();
	console.log(renderer.getRenderOutput());
});
```

<img width="1619" alt="screen shot 2018-01-22 at 10 21 11 pm" src="https://user-images.githubusercontent.com/5876481/35260905-9a617650-ffc2-11e7-8511-c7b7c2d0efd0.png">

<img width="1666" alt="screen shot 2018-01-22 at 10 22 08 pm" src="https://user-images.githubusercontent.com/5876481/35260935-c662800a-ffc2-11e7-96be-f3963f29229f.png">
