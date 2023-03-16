/* eslint-disable prettier/prettier */
import classnames from 'classnames';
import {
    ButtonHTMLAttributes,
    CSSProperties,
    FC,
    // FocusEventHandler,
    // HTMLProps,
    // MouseEventHandler,
    PropsWithChildren,
    ReactNode,
    useMemo,
} from 'react';

import styles from './button.module.scss';
/* 
    1. background color
    2. size
    3. Any type of Button styles
*/
interface IButtonBaseProps extends PropsWithChildren {
    size?: 'small' | 'default' | 'large' | 'x-large';
    type?: 'primary' | 'secondary' | 'tertiary';
    shape?: 'default' | 'pill';
    fontSize?: number;
    className?: string;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    // onClick?: MouseEventHandler;
    // onFocus?: FocusEventHandler;
    // onBlur?: FocusEventHandler;
}

type ButtonType = IButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonType> = ({
    size,
    type,
    fontSize,
    shape,
    children,
    className,
    ...props
}) => {
    const { btnType, btnSize, btnFontSize, btnShape, btnChildren } = useMemo(() => {
        return {
            btnSize: size || 'default',
            btnType: type || 'primary',
            btnChildren: children || 'Button',
            btnFontSize: `${fontSize || 16}px`,
            btnShape: shape || 'default',
        };
    }, [size, type, children, fontSize, shape]);

    const { sizeMap, typeMap, radiumMap } = useMemo(() => {
        return {
            sizeMap: {
                small: '0.35px',
                default: '0.5px',
                large: '0.65px',
                'x-large': '0.8px',
            } as { [key: string]: string },

            typeMap: {
                /* type?: 'primary' | 'secondary' | 'tertiary'; */
                primary: '#FD5E53',
                secondary: '#3C8FFD',
                tertiary: '#FFDE1E',
            } as { [key: string]: string },

            radiumMap: {
                default: '4px',
                pill: '1000px',
            },
        };
    }, []);

    const buttonStyles = {
        '--button_bkg-color': typeMap[btnType],
        '--button_size': sizeMap[btnSize],
        '--button_radium': radiumMap[btnShape],
        '--button_font-size': btnFontSize,
    } as CSSProperties;

    const baseButtonClasses = classnames(
        'button-wrapper',
        className,
        styles['base-button']
    );

    // const baseButtonContentClasses = classnames(
    //     'button-content',
    //     styles['base-button_content']
    // );

    return (
        <button style={buttonStyles} className={baseButtonClasses} {...props}>
            {btnChildren}
        </button>
    );
};
export default Button;
