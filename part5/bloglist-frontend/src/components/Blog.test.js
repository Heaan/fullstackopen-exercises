import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

describe('Blog list rendering', () => {
  let component;
  let blog;
  beforeEach(() => {
    blog = {
      title: 'testing blog render',
      author: 'Someone',
      url: 'http://test.com/testing-blog-render',
      likes: '1',
      user: {
        name: 'Superuser',
      },
    };
  });
  test('when the `view` button is Not clicked', () => {
    component = render(<Blog blog={blog} />);

    expect(component.getByText('testing blog render Someone')).toBeDefined();

    expect(component.container).not.toHaveTextContent('http://test.com/testing-blog-render');
    expect(component.container.querySelector('.blog-item')).not.toHaveTextContent('likes');
  });

  test('when the `view` button is clicked', () => {
    component = render(<Blog blog={blog} />);

    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.getByText('http://test.com/testing-blog-render')).toBeDefined();
    expect(component.container.querySelector('.likes-num')).toHaveTextContent('1');
  });
});
