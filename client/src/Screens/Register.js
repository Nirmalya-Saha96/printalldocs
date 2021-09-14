/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { useHistory, } from 'react-router-dom'
import { toast } from 'react-toastify';
var axios = require('axios');





const Register = () => {

    const [mobile,setMobile]=useState("")
    const [name,setName]=useState("")
    const [state,setState]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [mobileLog,setMobileLog]=useState("")
    const [passwordLog,setPasswordLog]=useState("")

    const [showRegister,setShowRegister]=useState(false)

    const history = useHistory ();

    const states = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]


    const register = async () =>{

        var data = JSON.stringify({
            "name": name,
            "state": state,
            "mobile": mobile,
            "email": email,
            "password": password
          });
          
          var config = {
            method: 'post',
            url: 'api/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
           // console.log(JSON.stringify(response.data.token));
            toast.success("Successfully Registered",{autoClose:2000})
            history.push({pathname:'/homepage',state:{token:response.data.token,admin:false}})
          }).catch(function (error) {
            const errors=error.response.data.errors
            if(errors)
            {
             errors.forEach(error=>toast.error(error.msg,{autoClose:3000}))
            }
          });
    }

    const login = async () =>{

     // history.push({pathname:'/homepage'})

        var data = JSON.stringify({
            "mobile": mobileLog,
            "password": passwordLog
          });
          
          var config = {
            method: 'post',
            url: `api/auth`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
           // console.log(JSON.stringify(response.data.token));
            toast.success("Successfully Logged in",{autoClose:2000})
            history.push({pathname:'/homepage',state:{token:response.data.token,admin:false}})
          })
          .catch(function (error) {
            const errors=error.response.data.errors
            if(errors)
            {
             errors.forEach(error=>toast.error(error.msg,{autoClose:2000}))
            }
          });

    }

    return (
        <div style={{height:"100vh",overflowX: "hidden"}}>
            <div className="nav text-uppercase d-flex justify-content-end align-items-center">
                <h5 className="text-light py-4 px-3 cp"><i className="fas fa-home"></i> Home</h5>
                <h5 className="text-light py-4 px-3 cp" onClick={()=>{setShowRegister(false)}}><i className="fas fa-sign-in-alt"></i> Login</h5>
                <h5 className="text-light py-4 px-3 cp" onClick={()=>{setShowRegister(true)}}><i className="fas fa-user"></i> New Registration</h5>
            </div>
            <div className="reg-screen">
                <div className="row justify-content-center">
                    {!showRegister&&<div className="col-md-4 col-8 bg-light m-4 box p-5">
                        <h3 className="text-uppercase">Log In To Portal</h3>
                        <div className="mb-3 mt-4">
                            <label  className="form-label text-secondary">Mobile</label>
                            <input type="email" className="form-control"  value={mobileLog} onChange={(e)=>{setMobileLog(e.target.value)}}
                                placeholder="UserID" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-secondary">Password</label>
                            <input type="password" className="form-control"  value={passwordLog} onChange={(e)=>{setPasswordLog(e.target.value)}}
                                placeholder="*****" />
                        </div>
                        {/* <Link to="/homepage">
                        <button type="button" className="btn btn-success">Click Here To Login</button>
                        </Link> */}
                         <button type="button" className="btn btn-success" onClick={login}>Click Here To Login</button>
                        <h5 className="mt-5 mb-4">Contact : 90735 + (69044/69385/68790)</h5>
                        <h5 style={{fontSize:"18px",fontWeight:"bold"}}>Email : PRINTALLDOCS@GMAIL.COM</h5>
                    </div>}
                    {showRegister&&<div className="col-md-4 col-8 bg-light m-4 box p-5">
                    <h3 className="text-uppercase text-warning">Register An Account</h3>
                        <div className="mb-3 mt-4">
                            <label  className="form-label text-secondary">Full Name</label>
                            <input type="email" className="form-control"  value={name} onChange={(e)=>{setName(e.target.value)}}
                                placeholder="Please Enter Full Name" />
                        </div>
                        <div className="mb-4">
                          <label className="form-label text-secondary">State</label>
                          <select className="form-select" aria-label="Default select example" value={state} onChange={(e)=>{setState(e.target.value)}}>
                            <option>Select State</option>
                            {states.map((item,index)=>{return <option value={item} key={index}>{item}</option>})}
                          </select>
                        </div>
                        <div className="mb-3 mt-4">
                            <label  className="form-label text-secondary">Mobile</label>
                            <input type="text" className="form-control"  value={mobile} onChange={(e)=>{setMobile(e.target.value)}}
                                placeholder="Please enter exactly 10 digit mobile number" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-secondary">Email Address</label>
                            <input type="email" className="form-control"  value={email} onChange={(e)=>{setEmail(e.target.value)}}
                                placeholder="example@gmail.com" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-secondary">Password</label>
                            <input type="password" className="form-control"  value={password} onChange={(e)=>{setPassword(e.target.value)}}
                                placeholder="*****" />
                        </div>
                        {/* <Link to="/homepage">
                        <button type="button" className="btn btn-success">Register</button>
                        </Link> */}
                         <button type="button" className="btn btn-success" onClick={register}>Register</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Register
