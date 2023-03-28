import { render, screen } from '@testing-library/react';

import Button from '@/components/Buttons/Button';
import typography from '@/components/typography';

it('Should be a button element by default', () => {
    // console.log('lalala');
    render(<Button>bt</Button>);

    const buttonElement = screen.getByText('bt');
    expect(buttonElement.tagName).toEqual('BUTTON');
});

describe('Default (without any props):', () => {
    beforeEach(() => {
        render(<Button />);
    });

    it('Should have expected className: "button-comp base-button"', () => {
        const buttonElement = screen.getByRole('button');

        expect(
            buttonElement.classList.contains('button-comp')
        ).toBeTruthy();
        expect(
            buttonElement.classList.contains('base-button')
        ).toBeTruthy();
        expect(buttonElement.classList.length).toBe(2);
    });

    it('Should have prop "size": default, and work on css variables', () => {
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
            buttonElement.style.getPropertyValue('--button_font_size')
        ).toBe<string>(`${mFontSize}px`);
        expect(
            buttonElement.style.getPropertyValue(
                '--button_line_height'
            )
        ).toBe<string>(`${mLineHeight}px`);
    });

    it.todo(
        'Should have prop "type": primary, and work on css variables'
    );

    it('Should have prop "Children": "Button" (String)', () => {
        const buttonElement1 = screen.getByRole('button');

        expect(buttonElement1.textContent).toEqual<string>('Button');
    });

    it('Should have prop "Shape": default', () => {
        const buttonElement = screen.getByRole('button');

        expect(
            buttonElement.style.getPropertyValue('--button_radium')
        ).toBe<string>('4px');
    });

    it('Should not have prefix element (prefixElement = undefined)', () => {
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

    it('Should not have suffix element (suffixElement = undefined)', () => {
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

it('Should contain new class name(s) when work with a non-empty Prop "className"', () => {
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

it('Should have new size when it work with a new explicit prop "size"', () => {
    render(<Button size='large' />);

    const buttonElement = screen.getByRole('button');

    const { lFontSize, lLineHeight } = typography;
    expect(
        buttonElement.style.getPropertyValue('--button_padding_vert')
    ).toBe<string>('8px');
    expect(
        buttonElement.style.getPropertyValue('--button_padding_hori')
    ).toBe<string>('16px');
    expect(
        buttonElement.style.getPropertyValue('--button_font_size')
    ).toBe<string>(`${lFontSize}px`);
    expect(
        buttonElement.style.getPropertyValue('--button_line_height')
    ).toBe<string>(`${lLineHeight}px`);
});

describe.todo('With Prop "type"');

describe('Should have a new shape (radius) when it work with a explicit prop "shape"', () => {
    it('With prop "shape": "pill"', () => {
        render(<Button shape='pill' />);
        const buttonElement = screen.getByRole('button');
        expect(
            buttonElement.style.getPropertyValue('--button_radium')
        ).toBe<string>('1000px');
    });
});

describe('Should have a children when it has been set a explicit prop "children"', () => {
    it('With prop "children": "New Button"', () => {
        render(<Button>New Button</Button>);
        const buttonElement = screen.getByRole('button');

        expect(buttonElement.textContent).toBe<string>('New Button');
    });
    it('With prop "children": <div><span>Today is a sunny day</span></div>', () => {
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
describe('Should have a prefixElement when it has been set a explicit prop "prefixElement"', () => {
    it('With Prop "prefixElement": "lalala" (string)', () => {
        render(<Button prefixElement={'lalala'} />);

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).not.toHaveAttribute('prefixElement');

        const prefixEle = screen.queryByTestId('prefix');
        expect(prefixEle).not.toBeNull();
        expect(buttonElement).toContainElement(prefixEle);

        expect(
            prefixEle,
            'prefix element "lalala" should be found but missed'
        ).toHaveTextContent('lalala');
    });
    it('With Prop "prefixElement": <div data-testid="prefix-element" ><span>Today is a sunny day</span></div>', () => {
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
describe('Should have a suffixElement when it has been set a explicit prop "suffixElement"', () => {
    it('With Prop "suffixElement": "lalala" (string)', () => {
        render(<Button suffixElement={'lalala'} />);

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).not.toHaveAttribute('suffixElement');

        const suffixEle = screen.queryByTestId('suffix');
        expect(suffixEle).not.toBeNull();
        expect(buttonElement).toContainElement(suffixEle);

        expect(
            suffixEle,
            'suffix element "lalala" should be found but missed'
        ).toHaveTextContent('lalala');
    });

    it('Should have a suffixElement when it has been set a explicit prop "suffixElement": <div data-testid="suffix-element" ><span>Today is a sunny day</span></div>', () => {
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
