import { useState, useEffect, useRef } from 'react';
import HealessTippy from '@tippyjs/react/headless';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Account from '~/components/Account';
import classNames from 'classnames/bind';
import styles from '../Header/Header.module.scss';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Seach() {
    const [seachValue, setSeachValue] = useState('');
    const [seachresult, setseachresult] = useState([]);
    const [show, setshow] = useState(true);
    const [loading, setloading] = useState(false);
    const inputRef = useRef();
    const handleClear = () => {
        setSeachValue('');
        setseachresult([]);
        inputRef.current.focus();
    };
    const hanshoww = () => {
        setshow(false);
    };
    const handleSearch = async () => {
        setloading(true)
        try {
        const response = await axios.get(`/videos/search?q=${seachValue}`);
        setseachresult(response.data);
        setloading(false)
        } catch (error) {
        setloading(false)
        console.log(error);
        }
    };
    useEffect(() => {
        if (seachValue) {
        handleSearch();
        } else {
        setseachresult([]);
        }
    }, [seachValue]);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const history = useNavigate();
    const handleSearchh = () => {
        if (!isInputEmpty) {
          history(`/search?q=${seachValue}`);
        }
      };
      useEffect(() => {
        setIsInputEmpty(seachValue === '');
      }, [seachValue]);
    useEffect(() => {
        const handleKeyPress = (e) => {
          if (e.key === 'Enter' && inputRef.current === document.activeElement) {
            handleSearchh();
          }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleSearchh]);
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');
        setSeachValue(query || '');
    },[location]);
    const handleSelectSuggestion = (value) => {
        setSeachValue(value);
        handleSearchh();
    };
    return (
        <HealessTippy
            interactive
            visible={show && seachresult.length > 0}
            render={(attrs) => (
                <div className={cx('seach-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                    <ul>
                        {Array.isArray(seachresult) &&
                             seachresult.map((result) => (
                                <li
                                key={result.id}
                                onClick={() => handleSelectSuggestion(result.title)}
                                >
                                {result.title}
                            </li>
                        ))}
                    </ul>
                        <h5 className={cx('seach-td')}>Tài Khoản</h5>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={hanshoww}
        >
            <div className={cx('seach')}>
                <input
                    ref={inputRef}
                    value={seachValue}
                    placeholder=" Tìm Kiếm Tài Khoản Và Video "
                    onChange={(e) => setSeachValue(e.target.value)}
                    onFocus={() => setshow(true)}
                    spellCheck={false}
                />
                {!!seachValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button onClick={handleSearchh} className={cx('seach-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HealessTippy>
    );
}

export default Seach;
