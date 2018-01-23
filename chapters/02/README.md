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

## Enzyme
Testing complex interaction with `react-test-renderer` is hard, so we will be using `Enzyme`.

    npm i enzyme -D
    
    npm i enzyme-adapter-react-16 -D
    
    npm i raf -D 
    
Create a setup file. `setupTest.js` will be used to configure the environement we are running in. 

```javascript
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new Adapter()
});
```
## Configuration

Configuring Jest [here](https://facebook.github.io/jest/docs/en/configuration.html)

Configuring Enzyme [here](http://airbnb.io/enzyme/)

Creating a `jest.config.json` file on the root of the project. 

```json
{
  "setupFiles": [
    "raf/polyfill",
    "<rootDir>/src/__tests__/setupTests.js"
  ]
}
```

Now update the `test` srcipt inside the `package.json` file. 

```json
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack",
    "dev-server": "webpack-dev-server",
    "test": "jest --config=jest.config.json"
  },
```

Now we are setup with Jest and Enzyme. 

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/components/Header';

test('should render Header correctly', () => {
	const wrapper = shallow(<Header/>);
	expect(wrapper.find('h1').length).toBe(1);
	expect(wrapper.find('h1').text()).toBe("Expensify");
});
```

Now to jestify the switch from `` to `Enzyme` let us use Enzyme for `snapshot` testing. 

```javascript
test('should render Header correctly', () => {
	const wrapper = shallow(<Header/>);
	expect(wrapper).toMatchSnapshot();
});
```

The resulting snapshot is too large, i.e the `instances` of the shallow render.  
```diff
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render Header correctly 1`] = `
ShallowWrapper {
  "length": 1,
  Symbol(enzyme.__root__): [Circular],
  Symbol(enzyme.__unrendered__): <Header />,
  Symbol(enzyme.__renderer__): Object {
    "batchedUpdates": [Function],
    "getNode": [Function],
    "render": [Function],
    "simulateEvent": [Function],
    "unmount": [Function],
  },
  Symbol(enzyme.__node__): Object {
    "instance": null,
    "key": undefined,
    "nodeType": "host",
    "props": Object {
      "children": Array [
        <h1>
          Expensify
        </h1>,
        <NavLink
          activeClassName="is-active"
          ariaCurrent="true"
          exact={true}
          to="/"
        >
          Dashboard
        </NavLink>,
        <NavLink
          activeClas={true}
          activeClassName="active"
          ariaCurrent="true"
          sName="is-active"
          to="/create"
        >
          Create Expense
        </NavLink>,
        <NavLink
          activeClassName="is-active"
          ariaCurrent="true"
          to="/help"
        >
          Help
        </NavLink>,
      ],
    },
    "ref": null,
    "rendered": Array [
      Object {
        "instance": null,
        "key": undefined,
        "nodeType": "host",
        "props": Object {
          "children": "Expensify",
        },
        "ref": null,
        "rendered": "Expensify",
        "type": "h1",
      },
      Object {
        "instance": null,
        "key": undefined,
        "nodeType": "function",
        "props": Object {
          "activeClassName": "is-active",
          "ariaCurrent": "true",
          "children": "Dashboard",
          "exact": true,
          "to": "/",
        },
        "ref": null,
        "rendered": "Dashboard",
        "type": [Function],
      },
      Object {
        "instance": null,
        "key": undefined,
        "nodeType": "function",
        "props": Object {
          "activeClas": true,
          "activeClassName": "active",
          "ariaCurrent": "true",
          "children": "Create Expense",
          "sName": "is-active",
          "to": "/create",
        },
        "ref": null,
        "rendered": "Create Expense",
        "type": [Function],
      },
      Object {
        "instance": null,
        "key": undefined,
        "nodeType": "function",
        "props": Object {
          "activeClassName": "is-active",
          "ariaCurrent": "true",
          "children": "Help",
          "to": "/help",
        },
        "ref": null,
        "rendered": "Help",
        "type": [Function],
      },
    ],
    "type": "header",
  },
  Symbol(enzyme.__nodes__): Array [
    Object {
      "instance": null,
      "key": undefined,
      "nodeType": "host",
      "props": Object {
        "children": Array [
          <h1>
            Expensify
          </h1>,
          <NavLink
            activeClassName="is-active"
            ariaCurrent="true"
            exact={true}
            to="/"
          >
            Dashboard
          </NavLink>,
          <NavLink
            activeClas={true}
            activeClassName="active"
            ariaCurrent="true"
            sName="is-active"
            to="/create"
          >
            Create Expense
          </NavLink>,
          <NavLink
            activeClassName="is-active"
            ariaCurrent="true"
            to="/help"
          >
            Help
          </NavLink>,
        ],
      },
      "ref": null,
      "rendered": Array [
        Object {
          "instance": null,
          "key": undefined,
          "nodeType": "host",
          "props": Object {
            "children": "Expensify",
          },
          "ref": null,
          "rendered": "Expensify",
          "type": "h1",
        },
        Object {
          "instance": null,
          "key": undefined,
          "nodeType": "function",
          "props": Object {
            "activeClassName": "is-active",
            "ariaCurrent": "true",
            "children": "Dashboard",
            "exact": true,
            "to": "/",
          },
          "ref": null,
          "rendered": "Dashboard",
          "type": [Function],
        },
        Object {
          "instance": null,
          "key": undefined,
          "nodeType": "function",
          "props": Object {
            "activeClas": true,
            "activeClassName": "active",
            "ariaCurrent": "true",
            "children": "Create Expense",
            "sName": "is-active",
            "to": "/create",
          },
          "ref": null,
          "rendered": "Create Expense",
          "type": [Function],
        },
        Object {
          "instance": null,
          "key": undefined,
          "nodeType": "function",
          "props": Object {
            "activeClassName": "is-active",
            "ariaCurrent": "true",
            "children": "Help",
            "to": "/help",
          },
          "ref": null,
          "rendered": "Help",
          "type": [Function],
        },
      ],
      "type": "header",
    },
  ],
  Symbol(enzyme.__options__): Object {
    "adapter": ReactSixteenAdapter {
      "options": Object {
        "enableComponentDidUpdateOnSetState": true,
      },
    },
  },
}
`;
```

    npm i enzyme-to-json -D
    
Convert `Enzyme` wrappers to a format compatible with `Jest snapshot` testing.

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../../../src/components/Header';

test('should render Header correctly', () => {
	const wrapper = shallow(<Header/>);
	expect(toJson(wrapper)).toMatchSnapshot();
});
```

Now the snapshot gets smaller. `enzyme-to-json` extract the meaningful stuff only. 

```diff
exports[`should render Header correctly 2`] = `
<header>
  <h1>
    Expensify
  </h1>
  <NavLink
    activeClassName="is-active"
    ariaCurrent="true"
    exact={true}
    to="/"
  >
    Dashboard
  </NavLink>
  <NavLink
    activeClas={true}
    activeClassName="active"
    ariaCurrent="true"
    sName="is-active"
    to="/create"
  >
    Create Expense
  </NavLink>
  <NavLink
    activeClassName="is-active"
    ariaCurrent="true"
    to="/help"
  >
    Help
  </NavLink>
</header>
`;
```

## Make enzyme-to-josn work automatically

update `jest.config.json`

```diff
{
  "setupFiles": [
    "raf/polyfill",
    "<rootDir>/src/setupTests.js"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
+  "snapshotSerializers": ["enzyme-to-json/serializer"]
}
```

```diff
import React from 'react';
import { shallow } from 'enzyme';
- import toJson from 'enzyme-to-json';
import Header from '../../../src/components/Header';

// 
test('should render Header correctly2', () => {
	const wrapper = shallow(<Header/>);
-	expect(toJson(wrapper)).toMatchSnapshot();
+	expect(wrapper).toMatchSnapshot();
});
```
