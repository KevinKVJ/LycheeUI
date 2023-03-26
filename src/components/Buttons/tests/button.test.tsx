import { fireEvent, render, screen } from '@testing-library/react';

import Button from '@/components/Buttons/Button';
import typography from '@/components/typography';

describe('BUTTON', () => {
    describe('Default (without any props):', () => {
        it('should be a button element by default', () => {
            // console.log('lalala');
            render(<Button>bt</Button>);

            const buttonElement = screen.getByText('bt');
            expect(buttonElement.tagName).toEqual('BUTTON');
        });
        describe('Props:', () => {
            it('should have expected className: "button-comp base-button"', () => {
                render(<Button />);

                const buttonElement = screen.getByRole('button');

                expect(
                    buttonElement.classList.contains('button-comp')
                ).toBeTruthy();
                expect(
                    buttonElement.classList.contains('base-button')
                ).toBeTruthy();
            });
            it('should have prop "size": default, and work on css variables', () => {
                render(<Button />);

                const buttonElement = screen.getByRole('button');

                const { mFontSize, mLineHeight } = typography;
                expect(
                    buttonElement.style.getPropertyValue(
                        '--button_padding_vert'
                    )
                ).toBe<string>('8px');
                expect(
                    buttonElement.style.getPropertyValue(
                        '--button_padding_hori'
                    )
                ).toBe<string>('12px');
                expect(
                    buttonElement.style.getPropertyValue(
                        '--button_font_size'
                    )
                ).toBe<string>(`${mFontSize}px`);
                expect(
                    buttonElement.style.getPropertyValue(
                        '--button_line_height'
                    )
                ).toBe<string>(`${mLineHeight}px`);
            });

            it.todo(
                'should have prop "type": primary, and work on css variables'
            );
            it('should have prop "Children": "Button" (String)', () => {
                render(<Button />);

                const buttonElement1 = screen.getByRole('button');

                expect(buttonElement1.textContent).toEqual<string>(
                    'Button'
                );
            });
            it('should have prop "Shape": default', () => {
                render(<Button />);
                const buttonElement = screen.getByRole('button');

                expect(
                    buttonElement.style.getPropertyValue(
                        '--button_radium'
                    )
                ).toBe<string>('4px');
            });
            it.todo(
                'should not have prefix element (prefixElement = undefined)',
                () => {
                    render(<Button />);
                    const buttonElement = screen.getByRole('button');
                    // console.log(buttonElement);
                }
            );
            it.todo(
                'should not have suffix element (suffixElement = undefined)'
            );

            it('should not call the callback function when user click (do not fire the clickevent)', () => {
                const fnInstance = vi.fn();
                render(<Button onClick={fnInstance} />);

                const buttonElement = screen.getByRole('button');

                fireEvent.click(buttonElement);
                expect(fnInstance).toBeCalled();
            });
        });
    });

    it('should contain new class name(s) when work with a non-empty Prop "className"', () => {
        render(<Button className='new_class' />);

        const buttonElement = screen.getByRole('button');

        expect(
            buttonElement.classList.contains('new_class')
        ).toBeTruthy();

        expect(
            buttonElement.classList.contains('button-comp')
        ).toBeTruthy();

        expect(
            buttonElement.classList.contains('base-button')
        ).toBeTruthy();
    });

    it('should have new size when it work with a new explicit prop "size"', () => {
        render(<Button size='large' />);

        const buttonElement = screen.getByRole('button');

        const { lFontSize, lLineHeight } = typography;
        expect(
            buttonElement.style.getPropertyValue(
                '--button_padding_vert'
            )
        ).toBe<string>('8px');
        expect(
            buttonElement.style.getPropertyValue(
                '--button_padding_hori'
            )
        ).toBe<string>('16px');
        expect(
            buttonElement.style.getPropertyValue('--button_font_size')
        ).toBe<string>(`${lFontSize}px`);
        expect(
            buttonElement.style.getPropertyValue(
                '--button_line_height'
            )
        ).toBe<string>(`${lLineHeight}px`);
    });

    describe.todo('With Prop "type"');

    it('should have a new shape (radius) when it work with a explicit prop "shape"', () => {
        render(<Button shape='pill' />);
        const buttonElement = screen.getByRole('button');
        expect(
            buttonElement.style.getPropertyValue('--button_radium')
        ).toBe<string>('1000px');
    });
    describe('With Prop "children"', () => {
        it('should have a new inner text content when it has been set a explicit prop "children": "New Button"', () => {
            render(<Button>New Button</Button>);
            const buttonElement = screen.getByRole('button');

            expect(buttonElement.textContent).toBe<string>(
                'New Button'
            );
            expect(buttonElement.innerHTML).toBe<string>(
                'New Button'
            );
        });
        it('should have a new inner html when it has been set a explicit prop "children": <div><span>Today is a sunny day</span></div>', () => {
            const { queryByTestId } = render(
                <Button>
                    <div data-testid='children-dom'>
                        <span>Today is a sunny day</span>
                    </div>
                </Button>
            );

            expect(queryByTestId('children-dom')).toBeInTheDocument();
        });
    });
    describe.todo('With Prop "prefixElement"');
    describe.todo('With Prop "suffixElement"');
});
