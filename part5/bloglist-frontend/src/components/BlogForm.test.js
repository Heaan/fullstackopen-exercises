import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('submit a new blog in the blog form', () => {
  const create = jest.fn();

  const component = render(<BlogForm create={create} />);

  const form = component.container.querySelector('form');

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  fireEvent.change(title, {
    target: { value: 'How to test with jest' },
  });
  fireEvent.change(author, {
    target: { value: 'Tom Tan' },
  });
  fireEvent.change(url, {
    target: { value: 'http://blog.org/how-to-test' },
  });

  fireEvent.submit(form);

  expect(create.mock.calls).toHaveLength(1);

  expect(create.mock.calls[0][0].title).toBe('How to test with jest');
  expect(create.mock.calls[0][0].author).toBe('Tom Tan');
  expect(create.mock.calls[0][0].url).toBe('http://blog.org/how-to-test');
});
