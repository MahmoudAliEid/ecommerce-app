 import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import MetaData from '../layouts/MetaData'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'

const Register = () => {
    const history=useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        images:{picture:""}
    })

    const { name, email, password ,images } = user;

    // const [avatar, setAvatar] = useState('')
   


    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history('/')
        }

        if (error) {
        toast.error(`${error}`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('picture', images.picture);

        dispatch(register(formData))
    }

    // const onChange = e => {
    //     if (e.target.name === 'avatar') {

    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setAvatarPreview(reader.result)
    //                 setAvatar(reader.result)
    //             }
    //         }

    //         reader.readAsDataURL(e.target.files[0])

    //     } else {
    //         setUser({ ...user, [e.target.name]: e.target.value })
    //     }
    // }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                            onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                name: e.target.value
                            }));
                        }}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                email: e.target.value
                            }));
                        }}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                password: e.target.value
                            }));
                        }}

                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src="https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg"
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={(event) => {
                                            const theImage = {
                                                picture: event.target.files[0],
                                            };
                                            setUser({
                                                ...user,
                                                images: theImage,
                                            });
                                            }}

                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register
