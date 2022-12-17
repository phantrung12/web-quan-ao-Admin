import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftOutlined, ExclamationCircleOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { login } from '../../redux/actions/auth.actions';
import './Login.css';
import { Redirect } from 'react-router-dom';
const schema = yup.object().shape({
    email: yup.string().email(' Định dạng email chưa đúng').required(' Vui lòng nhập email !'),
    password: yup
        .string()
        .required(' Vui lòng nhập mật khẩu !')
        .min(4, ' Mật khẩu từ 4-20 ký tự !')
        .max(20, ' Mật khẩu từ 4-20 ký tự !'),
});
function Login() {
    const [hidePass, setHidePass] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState("");
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const userLogin = (data, e) => {
        e.preventDefault();
        dispatch(login(data));
    };

    if (auth.authenticate) {
        return <Redirect to="/" />;
    }

    console.log(auth);
    return (
        <div style={{ display: 'flex' }} className={'login'}>
            <div className="left">
                <div className="left-head">
                    <div className="icon-arrow">
                        <ArrowLeftOutlined />
                    </div>
                    <h3 className={'logo'}>LOGO</h3>
                </div>
                <div className="left-note">
                    <h1>
                        <span className="text1">Đăng nhập </span>
                        <span className="text2">vào tài khoản LOGO của bạn.</span>
                        <p>
                            Đăng nhập bằng tên tài khoản và mật khẩu của bạn để có thể mua sắm các sản phẩm chất lượng
                            của
                        </p>
                        <span className={'text1'}>LOGO</span>
                    </h1>
                </div>
            </div>
            <div className="right">
                <form onSubmit={handleSubmit(userLogin)} className={'form'}>
                    <label>E-mail</label>
                    <input
                        type={'email'}
                        name={'email'}
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email?.type !== undefined ? 'email-false' : 'email-true'}
                        {...register('email', { required: true })}
                    />
                    {errors.email?.type !== undefined && (
                        <p className="warning">
                            <ExclamationCircleOutlined />
                            {errors.email?.message}
                        </p>
                    )}
                    {/* {console.log(errors.email?.message, errors.email?.type)} */}
                    <label>Password</label>
                    <div className="pass">
                        <input
                            type={hidePass ? 'password' : 'text'}
                            name={'password'}
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={'password'}
                            {...register('password', { required: true })}
                        />
                        <div className="hide-pass" onClick={() => setHidePass(!hidePass)}>
                            {hidePass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </div>
                    </div>

                    {errors.password?.type !== undefined && (
                        <p className="warning">
                            <ExclamationCircleOutlined />
                            {errors.password?.message}
                        </p>
                    )}
                    <Link to={'/forgot-password'}>Bạn quên mật khẩu ?</Link>
                    <div style={{ display: 'flex', marginLeft: '-1%', marginTop: '5%' }}>
                        <input {...register('remember')} type={'checkbox'} />
                        <span style={{ marginTop: '2.5%', marginLeft: '2%' }}>Ghi nhớ đăng nhập</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input type={'submit'} value="Đăng nhập" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
