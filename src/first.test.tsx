import { render, screen } from '@testing-library/react';

import Button from '@/components/Buttons/Button';

describe('For Button Component', () => {
    it('should be a button element', () => {
        // console.log('lalala');
        render(<Button>bt</Button>);

        const buttonElement = screen.getByText('bt');

        expect(buttonElement.tagName).toEqual('BUTTON');
    });
});
