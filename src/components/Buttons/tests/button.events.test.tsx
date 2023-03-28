import { fireEvent, render, screen } from '@testing-library/react';

import Button from '../Button';

it('Should not call the callback function when user click (do not fire the clickevent)', () => {
    const fnInstance = vi.fn();
    render(<Button onClick={fnInstance} />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);
    expect(fnInstance).toBeCalled();
});
