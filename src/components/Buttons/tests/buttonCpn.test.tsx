import { logDOM, render, screen } from '@testing-library/react';

import Button from '@/components/Buttons/Button';
import styles from '@/components/Buttons/button.module.scss';
import typography from '@/components/typography';

describe.skip('BUTTON', () => {
    describe('Default:', () => {
        it('should be a button element by default', () => {
            // console.log('lalala');
            render(<Button>bt</Button>);

            const buttonElement = screen.getByText('bt');
            expect(buttonElement.tagName).toEqual('BUTTON');
        });
        describe('Props:', () => {
            // it.todo(
            //     'should have expected className: "button-comp base-button"'
            // );
            it(`should have expected className: "button-comp $\{cssModuleStyles['base-button']}"`, () => {
                render(<Button>bt</Button>);

                const buttonElement = screen.getByText('bt');

                const classNameList =
                    buttonElement.className.split(' ');
                expect(classNameList).toContain('button-comp');
                expect(classNameList).toContain(
                    styles['base-button']
                );
            });
            it('should have prop "size": default', () => {
                const { baseElement } = render(
                    <Button size='default'>button</Button>
                );
                const buttonElement = screen.getByRole('button');
                
                // logDOM(buttonElement);
                console.log('buttonElement', buttonElement);
                // const paddingVert = 8;
                // const paddingHori = 12;
                // const { mFontSize, mLineHeight } = typography;
                // screen.debug();
                console.log(
                    'window.getComputedStyle(buttonElement)',
                    window.getComputedStyle(buttonElement)
                );
                // expect(baseElement).toHaveStyle('padding: 8px 12px ');
            });
            it.todo('should have prop "type": primary');
            it('should have prop "Children": "Button" (String)', () => {
                render(<Button></Button>);

                const buttonElement1 = screen.getByRole('button');

                expect(buttonElement1.textContent).toEqual<string>(
                    'Button'
                );
            });
            it.todo('should have prop "Shape": default');
            it.todo(
                'should not have prefix element (prefixElement = undefined)'
            );
            it.todo(
                'should not have suffix element (suffixElement = undefined)'
            );

            it.todo(
                'should not call the callback function when user click (do not fire the clickevent)'
            );
        });
    });

    describe.todo('With Prop "className"');
    describe.todo('With Prop "size"');
    describe.todo('With Prop "type"');
    describe.todo('With Prop "shape"');
    describe.todo('With Prop "children"');
    describe.todo('With Prop "prefixElement"');
    describe.todo('With Prop "suffixElement"');
    // describe.todo('With Prop: suffixElement');
});
