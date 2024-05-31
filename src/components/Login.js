import { useForm} from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import {useSelector, useDispatch} from "react-redux";
import {userLogin} from "./slices/userSlice";


function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);
    
    const isLoggedIn = localStorage.getItem('token');
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const onFormSubmit = (userCredentialsObject) => {
        dispatch(userLogin(userCredentialsObject));
      };
    
      useEffect(() => {
        if (isSuccess || isLoggedIn) {
          navigate("/todolist");
        }
        
      }, [isSuccess, isError]);

    return (
        <div className='container '>
            
            <div className="wraper p-5">

                <div className='row'>
                    <div className='col-12 col-sm-8 col-md-6 mx-auto'>
                        <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <h1 className="text-center text-black">Login</h1>
                            <Form.Group className='mt-3 mb-3'>
                                <Form.Label >Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    {...register("username", { required: true })}
                                />
                                {errors.username && (
                                    <p className='text-danger' >*Username is required</p>
                                )}
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter Password'
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <p className='text-danger'>*Password is required</p>
                                )}
                            </Form.Group>
                            <Button variant='secondary' id="a" type="submit" className="buton2">
                                Login <MdLogin />
                            </Button>
                        </Form>
                    </div>
                </div>
                
                <h1 className="h1-e">Not registered yet <Link to={{pathname : '/register'}}>sign up?</Link></h1>
            </div>
        </div>
    );
}

export default Login;