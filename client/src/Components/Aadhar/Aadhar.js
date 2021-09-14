/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const Aadhar = ({token}) => {

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

        const genders = ["Male","Female","Prefer not to tell"]

        const [aadhar, setAadhar] = useState("")
        const [name, setName] = useState("")
        const [father, setFather] = useState("")
        const [house, setHouse] = useState("")
        const [gali, setGali] = useState("")
        const [PO, setPO] = useState("")
        const [state, setState] = useState("")
        const [city, setCity] = useState("")
        const [dob, setDob] = useState("")
        const [dobLoc, setDobLoc] = useState("")
        const [gen, setGen] = useState("")
        const [genLoc, setGenLoc] = useState("")
        const [langLoc, setLangLoc] = useState("")
        const [PC, setPC] = useState("")
        const [addressLoc, setAddressLoc] = useState("")
        const [address, setAddress] = useState("")
        const [nameCH,setNameCH]=useState(false)
        const [addressCH,setAddressCH]=useState(false)
        const [photoCH,setPhotoCH]=useState(false)
        const [bioCH,setBioCH]=useState(false)

        const sendData = async () => {
            var data = JSON.stringify({
                "adhar_card_no": aadhar,
                "name": name,
                "father_name": father,
                "house_no": house,
                "gali_locality": gali,
                "post_office": PO,
                "state": state,
                "city": city,
                "pin_code": PC,
                "date_of_birth": dob,
                "date_of_birth_locality": dobLoc,
                "gender": gen,
                "gender_local": genLoc,
                "address": address,
                "local_language": langLoc,
                "address_local_language": addressLoc
            });
            var config = {
                method: 'post',
                url: 'api/adhar',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                   // console.log(JSON.stringify(response.data));
                    toast.success("Successfully Updated",{autoClose:2000})
                })
                .catch(function (error) {
                    const errors=error.response.data.errors
                   // console.log(JSON.stringify(error) )
                    if(error.message==="Request failed with status code 500")
                    {
                        toast.error("Aadhar Card Number is not valid",{autoClose:2000})
                    }
                    if(errors)
                    {
                     errors.forEach(error=>toast.error(error.msg,{autoClose:2000}))
                    }
                    
                });

        }
   
    return (
        <div className="row w-75 m-auto">
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Aadhar Card Number</label>
                <input type="text" className="form-control"  value={aadhar} onChange={(e)=>{setAadhar(e.target.value)}}/>
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Father's Name</label>
                <input type="text" className="form-control" value={father} onChange={(e)=>{setFather(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">House Number</label>
                <input type="text" className="form-control" value={house} onChange={(e)=>{setHouse(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Gali</label>
                <input type="text" className="form-control"  value={gali} onChange={(e)=>{setGali(e.target.value)}}/>
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Post Office</label>
                <input type="text" className="form-control" value={PO} onChange={(e)=>{setPO(e.target.value)}} />
            </div>
            <div className="mb-4 mt-4 col-md-4">
                          <label className="form-label text-secondary">State</label>
                          <select className="form-select" aria-label="Default select example" value={state} onChange={(e)=>{setState(e.target.value)}}>
                            <option>Select State</option>
                            {states.map((item,index)=>{return <option value={item} key={index}>{item}</option>})}
                          </select>
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">City</label>
                <input type="text" className="form-control" value={city} onChange={(e)=>{setCity(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Date of Birth</label>
                <input type="date" className="form-control" value={dob} onChange={(e)=>{setDob(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Date of Submission</label>
                <input type="date" className="form-control" value={dobLoc} onChange={(e)=>{setDobLoc(e.target.value)}} />
            </div>
            <div className="mb-4 mt-4 col-md-6">
                          <label className="form-label text-secondary">Gender</label>
                          <select className="form-select" aria-label="Default select example" value={gen} onChange={(e)=>{setGen(e.target.value)}}>
                            <option>Select Gender</option>
                            {genders.map((item,index)=>{return <option value={item} key={index}>{item}</option>})}
                          </select>
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Blood Group</label>
                <input type="text" className="form-control" value={genLoc} onChange={(e)=>{setGenLoc(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Local Langauge</label>
                <input type="text" className="form-control"  value={langLoc} onChange={(e)=>{setLangLoc(e.target.value)}}/>
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Pin Code</label>
                <input type="text" className="form-control"  value={PC} onChange={(e)=>{setPC(e.target.value)}}/>
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Residential Address</label>
                <input type="text" className="form-control" value={addressLoc} onChange={(e)=>{setAddressLoc(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-12">
                <label className="form-label text-secondary">Work Address</label>
                <input type="text" className="form-control"  value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
            </div>
            <div className="form-check col-md-3 col-6 mb-3 mt-4">
                 <input type="checkbox" className="form-check-input" checked={nameCH} onChange={() => {setNameCH(!nameCH)}}/>
                 <label className="form-check-label" >Name</label>
             </div>
             <div className="form-check col-md-3 col-6 mb-3 mt-4">
                 <input type="checkbox" className="form-check-input" checked={addressCH} onChange={(e) => {setAddressCH(!addressCH)}}/>
                 <label className="form-check-label" >Address</label>
             </div>
             <div className="form-check col-md-3 col-6 mb-3 mt-4">
                 <input type="checkbox" className="form-check-input" checked={photoCH} onChange={(e) => {setPhotoCH(!photoCH)}}/>
                 <label className="form-check-label" >Photo</label>
             </div>
             <div className="form-check col-md-3 col-6 mb-3 mt-4">
                 <input type="checkbox" className="form-check-input" checked={bioCH} onChange={(e) => {setBioCH(!bioCH)}}/>
                 <label className="form-check-label" >Biometric</label>
             </div>
            <button type="button" className="btn btn-success col-lg-4 mt-3 ml-1" onClick={sendData}>Submit</button>
        </div>
    )
}

export default Aadhar
