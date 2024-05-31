import { useEffect } from "react";
import {useForm} from 'react-hook-form';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register()
{
    const {register,handleSubmit,formState: {errors}} = useForm();
    const isLoggedIn = !!localStorage.getItem('token');
    let navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
          navigate("/todolist");
        }
    }, [isLoggedIn, navigate]);
    //form submission
    const onFormSubmit = (userObj) =>
    {
        const uniqObject = {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };
        //http post req
        axios.post('http://localhost:5000/user-api/create-user',userObj)
        .then(response=> {
            //if user created
            if(response.data.message==="New User created"){
                toast.success('New User created successfully', uniqObject);
                navigate("/login")
            } else {
                toast.error(response.data.message, uniqObject);
            }
            
        })
        .catch(error=>{
            console.log(error);
            toast.error("Something went wrong in creating user", uniqObject);
        })
    }
    return(
       <div className='row '>
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
            <form className="bg-warning m-5 p-5 new-form" onSubmit={handleSubmit(onFormSubmit)}>
                <h1 className=" text-center register">Register</h1>
                {/* username */}
                <div className="mb-3">
                    <label htmlFor='un'>Username</label>
                    <input type="text" id="un" placeholder="Enter your username here..."className="form-control" {...register("username",{required:true,minLength:4})}/>
                    {errors.username?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                    {errors.username?.type==='minLength' && <p className="text-danger">* Min length is 4 characters</p>}

                </div>
                {/* password */}
                <div className="mb-3">
                    <label htmlFor='pw1'>Password</label>
                    <input type="password" id="pw1" placeholder="Create a strong password" className="form-control" {...register("password",{required:true})}/>
                    {errors.password?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                </div>
                {/* Confirm password */}
                <div className="mb-3">
                    <label htmlFor='pw2'>Confirm Password</label>
                    <input type="password" id="pw2"  className="form-control" {...register("password",{required:true})}/>
                    {errors.password?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                </div>
                {/* email */}
                <div className="mb-3">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email"  className="form-control" {...register("email",{required:true})}/>
                    {errors.email?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                </div>
                {/* name */}
                <div className="mb-3">
                    <label htmlFor='name1'>Name</label>
                    <input type="text" id="name1"  placeholder="First" className="form-control" {...register("name1",{required:true})}/>
                    {errors.name1?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                    <input type="text" id="name2"  placeholder="Last" className="form-control" {...register("name2")}/>
                </div>
                {/* phone number */}
                <div className="mb-3">
                    <label htmlFor='phno'>Phone Number</label>
                    <input type="number" id="phno"  className="form-control " {...register("phno",{required:true,minLength:10,maxLength:10})}/>
                    {errors.phno?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                    {errors.phno?.type==='minLength' && <p className="text-danger">It should be 10 characters in length</p>}
                    {errors.phno?.type==='maxLength' && <p className="text-danger">It should be 10 characters in length</p>}
                </div>
                {/* date of birth */}
                <div className="mb-3">
                    <label htmlFor='dob'>Date of birth</label>
                    <input type="date" id="dob"  className="form-control " {...register("dob",{required:true})}/>
                    {errors.dob?.type==='required' && <p className="text-danger">* This field is mandatory</p>}
                </div>
                {/* Gender */}
                <div className="mb-3">
                    <label>Gender</label>
                    {/* male */}
                    <div className="form-check">
                        <input type="radio" id="male" className="form-check-input" {...register("gender")} value="male"/>
                        <label htmlFor="male" className="form-check-label">Male</label>
                    </div>
                    {/* female */}
                    <div className="form-check">
                        <input type="radio" id="female" className="form-check-input" {...register("gender")} value="female"/>
                        <label htmlFor="female" className="form-check-label">Female</label>
                    </div>
                    {/* other */}
                    <div className="form-check">
                        <input type="radio" id="other" className="form-check-input" {...register("gender")} value="other"/>
                        <label htmlFor="other" className="form-check-label">Other</label>
                    </div>
                    {/* address */}
                    <div className="mb-3">
                        <label htmlFor="address">Address</label>
                        <textarea id="address" rows="5" className="form-control" {...register("address")}></textarea>
                    </div>
                    {/* city */}
                    <div className="mb-3">
                        <label htmlFor="city">City</label>
                        <select id="city" className='form-select' {...register("city")}>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Bengaluru">Bengaluru</option>
                            <option value="Mumbai">Mumbai</option>
                        </select>
                    </div>
                    {/* submit button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-info m-5 bttn">Register</button>
                        
                    </div>
                    {/* Link to Login */}
                    <h1 className="h1-e"><Link to={{pathname : '/login'}}>Already have an account?</Link></h1>

                </div>
            </form>
        </div>

       </div>
     
    )    
}
export default Register