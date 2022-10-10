import React from 'react';
import renderer from "react-test-renderer";
import {PlatformMessage} from './PlatformMessage';

it('renders correctly when there are no tasks', () => {
  const tree = renderer.create(<PlatformMessage messageContent="Success" />).toJSON()
  expect(tree).toMatchSnapshot()
})