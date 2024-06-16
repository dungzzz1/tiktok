import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import slytes from './Button.module.scss';

const cx = classNames.bind(slytes);

function Button({
    to,
    href,
    fro,
    className,
    onClick,
    outline = false,
    text = false,
    smaill = false,
    big = false,
    letfIcon,
    children,
    user= false,
    primary = false,
    login= false,
    text1 = false,
    item,
    
    ...pass
}) {
    let Comp = 'button';
    const Props = {
        onClick,
        ...pass,
    };
    if (to) {
        Props.to = to;
        Comp = Link;
    } else if (href) {
        Props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        smaill,
        big,
        fro,
        text,
        user,
        login,
        text1,
        item,
    });
    return (
        <Comp  className={classes} {...Props} {...pass}>
            {letfIcon && <span className={cx('icon')} >{letfIcon}</span>}
            <span className={cx('title')} >{children}</span>
        </Comp>
    );
}

export default Button;
