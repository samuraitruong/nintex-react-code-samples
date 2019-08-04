/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/common/app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App />, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
