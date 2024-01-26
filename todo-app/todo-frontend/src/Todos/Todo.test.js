import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from './Todo'
test('renders text and status', () => {
    const todo = {
        text: 'example title',
        done: false
    }

    const { container } = render(<Todo todo={todo} />)

    //using css selector- container
    const div = container.querySelector('.todo')
    expect(div).toHaveTextContent('example title')
    expect(div).toHaveTextContent('This todo is not done')
    expect(div).toHaveTextContent('Delete')

})

test('after clicking done, status is changed', async () => {
    const todo = {
        text: 'example title',
        done: false
    }

    const { container } = render(<Todo todo={todo} completeTodo={jest.fn()} />)//jest.fn is mockhandler

    const button = screen.getByText('Set as done')
    userEvent.click(button)

    const div = container.querySelector('.todo')
    expect(div).toHaveTextContent('This todo is not done')
})

test('after clicking delete, todo is gone', async () => {
    const deleteMock = jest.fn()
    const todo = {
        text: 'example title',
        done: true
    }

    const { container } = render(<Todo todo={todo} deleteTodo={deleteMock} />)

    // Trigger the delete action
    userEvent.click(screen.getByText("Delete"));

    // Check if deleteMock was called
    expect(deleteMock).toHaveBeenCalledTimes(1);

})

