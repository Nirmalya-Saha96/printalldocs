/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const Add = () => {

    const [mobile, setMobile] = useState("")
    const [name, setName] = useState("")
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const states = ["Andhra Pradesh",
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
        "Puducherry"
    ]

    const register = async () => {
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
            data: data
        };
        axios(config)
            .then(function (response) {
              //  console.log(JSON.stringify(response.data.token));
                toast.success("Successfully Registered", {
                    autoClose: 2000
                })
            }).catch(function (error) {
                const errors = error.response.data.errors
                if (errors) {
                    errors.forEach(error => toast.error(error.msg, {
                        autoClose: 3000
                    }))
                }
            });
    }

    return (
        <div className="row">
            <div className="bg-light m-4 p-5">
                <div className="mb-3 mt-4">
                    <label className="form-label text-secondary">Full Name</label>
                    <input type="email" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}}
                    placeholder="Please Enter Full Name" />
                </div>
                <div className="mb-4">
                    <label className="form-label text-secondary">State</label>
                    <select className="form-select" aria-label="Default select example" value={state}
                        onChange={(e)=>{setState(e.target.value)}}>
                        <option>Select State</option>
                        {states.map((item,index)=>{return <option value={item} key={index}>{item}</option>})}
                    </select>
                </div>
                <div className="mb-3 mt-4">
                    <label className="form-label text-secondary">Mobile</label>
                    <input type="text" className="form-control" value={mobile}
                        onChange={(e)=>{setMobile(e.target.value)}}
                    placeholder="Please enter exactly 10 digit mobile number" />
                </div>
                <div className="mb-4">
                    <label className="form-label text-secondary">Email Address</label>
                    <input type="email" className="form-control" value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="example@gmail.com" />
                </div>
                <div className="mb-4">
                    <label className="form-label text-secondary">Password</label>
                    <input type="password" className="form-control" value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="*****" />
                </div>
                <button type="button" className="btn btn-success" onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Add
