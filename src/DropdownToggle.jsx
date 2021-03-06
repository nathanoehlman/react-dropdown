import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button } from '@trendmicro/react-buttons';
import styles from './index.styl';
import {
    DROPDOWN_TOGGLE_ROLE
} from './constants';

class DropdownToggle extends PureComponent {
    static propTypes = {
        // A custom element for this component.
        componentClass: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),

        // One of: 'lg', 'md', 'sm', 'xs'
        btnSize: Button.propTypes.btnSize,

        // One of: 'default', 'primary', 'emphasis', 'flat', 'link'
        btnStyle: Button.propTypes.btnStyle,

        // Whether to prevent a caret from being rendered next to the title.
        noCaret: PropTypes.bool,

        // Title content.
        title: PropTypes.string,

        // Dropdown
        disabled: PropTypes.bool,
        open: PropTypes.bool
    };
    static defaultProps = {
        dropdownRole: DROPDOWN_TOGGLE_ROLE, // Accessed by Dropdown
        componentClass: Button,
        noCaret: false,

        // Dropdown
        disabled: false,
        open: false
    };

    render() {
        const {
            componentClass: Component,
            noCaret,
            open,
            className,
            children,
            ...props
        } = this.props;

        delete props.dropdownRole; // Accessed by Dropdown

        if (Component === Button) {
            props.btnStyle = props.btnStyle || 'flat';
            props.btnSize = props.btnSize || Button.defaultProps.btnSize;
            props.dropdownToggle = true;
        }

        const useCaret = !noCaret;
        const empty = !children && !props.title;
        const dropdownToggleClasses = {
            [styles.dropdownToggle]: true,
            [styles.btnLink]: props.btnStyle === 'link', // CSS selector ".btn-link:hover .caret"
            [styles.btnLg]: props.btnSize === 'lg' || props.btnSize === 'large',
            [styles.btnMd]: props.btnSize === 'md' || props.btnSize === 'medium',
            [styles.btnSm]: props.btnSize === 'sm' || props.btnSize === 'small',
            [styles.btnXs]: props.btnSize === 'xs' || props.btnSize === 'extra-small',
            [styles.empty]: empty
        };
        const caretClasses = {
            [styles.caret]: true
        };

        return (
            <Component
                {...props}
                role="button"
                className={classNames(className, dropdownToggleClasses)}
                aria-haspopup
                aria-expanded={open}
            >
                {children || props.title}
                {useCaret && <span className={classNames(caretClasses)} />}
            </Component>
        );
    }
}

export default DropdownToggle;
