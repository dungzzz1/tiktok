import { FacebookIcon,Gmailcon,TwiterIcon,InstagamIcon, KakaotailIcon, LINEIcon } from '~/accset/icon';
import Button from '../Button';
import classNames from 'classnames/bind';
import slytes from './LoginTK.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '~/redux/UserSlice';
import { auth,provider } from '~/filebase/config';
import {signInWithPopup} from "firebase/auth"
const cx = classNames.bind(slytes);

function LoginTK({setopen}) {
    const dispatch = useDispatch()
      const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
          .then((result) => {
            axios
              .post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
              })
              .then((res) => {
                console.log(res)
                dispatch(loginSuccess(res.data));
                window.location.reload(); 
              });
          })
          .catch((error) => {
            dispatch(loginFailure());
          });
        setopen(false)
      };
    return (
        <>
            <div className={cx('hihi')}>
                <Button login text>
                    <div>
                        <div className={cx('hi')}>
                            <FacebookIcon />
                        </div>
                        <span>Tiếp Tục Với Facebook</span>
                    </div>
                </Button>
            </div>
            <div className={cx('hihi')}>
                <Button onClick={signInWithGoogle} login text>
                    <div>
                        <div className={cx('hi')}>
                           <Gmailcon /> 
                        </div>
                        <span>Tiếp Tục Với Google</span>
                    </div>
                </Button>
            </div>
            <div className={cx('hihi')}>
                <Button login text>
                    <div>
                        <div className={cx('hi')}>
                           <TwiterIcon />
                        </div>
                        <span>Tiếp Tục Với Twitter</span>
                    </div>
                </Button>
            </div>
            <div className={cx('hihi')}>
                <Button login text>
                    <div>
                        <div className={cx('hi')}>
                           <LINEIcon />
                        </div>
                        <span>Tiếp Tục Với LINE</span>
                    </div>
                </Button>
            </div>
            <div className={cx('hihi')}>
                <Button login text>
                    <div>
                        <div className={cx('hi')}>
                           <KakaotailIcon />
                        </div>
                        <span>Tiếp Tục Với KakaoTalk</span>
                    </div>
                </Button>
            </div>
            
            <div className={cx('hihi')}>
                <Button login text>
                    <div>
                        <div className={cx('hi')}>
                           <InstagamIcon />
                        </div>
                        <span>Tiếp Tục Với Instargram</span>
                    </div>
                </Button>
            </div>
        </>
    );
}

export default LoginTK;
