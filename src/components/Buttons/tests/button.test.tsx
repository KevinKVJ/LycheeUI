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
            beforeEach(() => {
                render(<Button />);
            });

            it('should have expected className: "button-comp base-button"', () => {
                const buttonElement = screen.getByRole('button');

                expect(
                    buttonElement.classList.contains('button-comp')
                ).toBeTruthy();
                expect(
                    buttonElement.classList.contains('base-button')
                ).toBeTruthy();
            });

            it('should have prop "size": default, and work on css variables', () => {
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
                const buttonElement1 = screen.getByRole('button');

                expect(buttonElement1.textContent).toEqual<string>(
                    'Button'
                );
            });

            it('should have prop "Shape": default', () => {
                const buttonElement = screen.getByRole('button');

                expect(
                    buttonElement.style.getPropertyValue(
                        '--button_radium'
                    )
                ).toBe<string>('4px');
            });

            it('should not have prefix element (prefixElement = undefined)', () => {
                const buttonElement = screen.getByRole('button');

                const prefixElement = screen.queryByTestId('prefix');

                expect(
                    prefixElement,
                    'prefixElement should be found but missed!'
                ).not.toBeNull();
                expect(
                    buttonElement,
                    'button should contain prefixElement!'
                ).toContainElement(prefixElement);
                expect(
                    prefixElement,
                    'prefixElement should be inside the button but contain nothing by default!'
                ).toBeEmptyDOMElement();
            });

            it('should not have suffix element (suffixElement = undefined)', () => {
                const buttonElement = screen.getByRole('button');

                const suffixElement = screen.queryByTestId('suffix');

                expect(
                    suffixElement,
                    'suffixElement should be found but missed!'
                ).not.toBeNull();
                expect(
                    buttonElement,
                    'button should contain suffixElement!'
                ).toContainElement(suffixElement);
                expect(
                    suffixElement,
                    'suffixElement should be inside the button but contain nothing by default!'
                ).toBeEmptyDOMElement();
            });
        });
    });

    it('should not call the callback function when user click (do not fire the clickevent)', () => {
        const fnInstance = vi.fn();
        render(<Button onClick={fnInstance} />);

        const buttonElement = screen.getByRole('button');

        fireEvent.click(buttonElement);
        expect(fnInstance).toBeCalled();
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
    describe('With Prop "prefixElement"', () => {
        it('should have a prefixElement when it has been set a explicit prop "prefixElement": "lalala" (string)', () => {
            render(<Button prefixElement={'lalala'} />);

            const buttonElement = screen.getByRole('button');

            expect(buttonElement).not.toHaveAttribute(
                'prefixElement'
            );

            const prefixEle = screen.queryByTestId('prefix');
            expect(prefixEle).not.toBeNull();
            expect(buttonElement).toContainElement(prefixEle);

            expect(
                prefixEle,
                'prefix element "lalala" should be found but missed'
            ).toHaveTextContent('lalala');
        });
        it('should have a prefixElement when it has been set a explicit prop "prefixElement": <div data-testid="prefix-element" ><span>Today is a sunny day</span></div>', () => {
            render(
                <Button
                    prefixElement={
                        <div data-testid='prefix-element-props-pass-in'>
                            <span>Today is a sunny day</span>
                        </div>
                    }
                />
            );

            const buttonElement = screen.getByRole('button');
            const prefixEle = screen.queryByTestId('prefix');
            expect(
                prefixEle,
                'prefix element should be found but missed'
            ).not.toBeNull();
            expect(
                buttonElement,
                'PrefixElement should be inside the <Button />'
            ).toContainElement(prefixEle);

            const passedInPrefixChild = screen.queryByTestId(
                'prefix-element-props-pass-in'
            );
            expect(passedInPrefixChild).not.toBeNull();
            expect(prefixEle).toContainElement(passedInPrefixChild);
        });
    });
    describe('With Prop "suffixElement"', () => {
        it('should have a suffixElement when it has been set a explicit prop "suffixElement": "lalala" (string)', () => {
            render(<Button suffixElement={'lalala'} />);

            const buttonElement = screen.getByRole('button');

            expect(buttonElement).not.toHaveAttribute(
                'suffixElement'
            );

            const suffixEle = screen.queryByTestId('suffix');
            expect(suffixEle).not.toBeNull();
            expect(buttonElement).toContainElement(suffixEle);

            expect(
                suffixEle,
                'suffix element "lalala" should be found but missed'
            ).toHaveTextContent('lalala');
        });

        it('should have a suffixElement when it has been set a explicit prop "suffixElement": <div data-testid="suffix-element" ><span>Today is a sunny day</span></div>', () => {
            render(
                <Button
                    suffixElement={
                        <div data-testid='suffix-element-props-pass-in'>
                            <span>Today is a sunny day</span>
                        </div>
                    }
                />
            );

            const buttonElement = screen.getByRole('button');
            const suffixEle = screen.queryByTestId('suffix');
            expect(
                suffixEle,
                'suffix element should be found but missed'
            ).not.toBeNull();
            expect(
                buttonElement,
                'suffixElement should be inside the <Button />'
            ).toContainElement(suffixEle);

            const passedInsuffixChild = screen.queryByTestId(
                'suffix-element-props-pass-in'
            );
            expect(passedInsuffixChild).not.toBeNull();
            expect(suffixEle).toContainElement(passedInsuffixChild);
        });
    });
});
