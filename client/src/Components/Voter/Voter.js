/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const Voter = ({token}) => {
    const genders = ["Male","Female","Prefer not to tell"]

    const [voter, setVoter] = useState("")
    const [name, setName] = useState("")
    const [locality, setLocality] = useState("")
    const [gen, setGen] = useState("")
    const [dob, setDob] = useState("")
    const [relation, setRelation] = useState("")
    const [father, setFather] = useState("")
    const [fatherLoc, setFatherLoc] = useState("")
    const [PS, setPS] = useState("")
    const [tahsil, setTahsil] = useState("")
    const [assembly, setAssembly] = useState("")
    const [assemblyLoc, setAssemblyLoc] = useState("")
    const [partNumber, setPartnumber] = useState("")
    const [partName, setPartName] = useState("")
    const [partNameLoc, setPartNameLoc] = useState("")
    const [lang, setLang] = useState("")
    const [address, setAddress] = useState("")
    const [addressLoc, setAddressLoc] = useState("")

    const sendData = async () => {


        var data = JSON.stringify({
            "epic_no": voter,
            "name": name,
            "name_locality": locality,
            "gender": gen,
            "date_of_birth": dob,
            "relation_father_husband": relation,
            "father_husband_name": father,
            "father_husband_name_local_language": fatherLoc,
            "police_station": PS,
            "tahshil": tahsil,
            "assembly": assembly,
            "assembly_local_language": assemblyLoc,
            "part_number": partNumber,
            "part_name": partName,
            "part_name_lacal_language": partNameLoc,
            "language": lang,
            "address": address,
            "address_local_language": addressLoc
        });

        var config = {
            method: 'post',
            url: 'api/voter',
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
                console.log(error.status)
            if(errors)
            {
             errors.forEach(error=>toast.error(error.msg,{autoClose:2000}))
            }
            });
    }


    return (
        <div className="row w-75 m-auto">
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Voter Card Number</label>
                <input type="text" className="form-control" value={voter} onChange={(e)=>{setVoter(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Locality</label>
                <input type="text" className="form-control" value={locality} onChange={(e)=>{setLocality(e.target.value)}}  />
            </div>
            <div className="mb-4 mt-4 col-md-4">
                          <label className="form-label text-secondary">Gender</label>
                          <select className="form-select" aria-label="Default select example" value={gen} onChange={(e)=>{setGen(e.target.value)}}>
                            <option>Select Gender</option>
                            {genders.map((item,index)=>{return <option value={item} key={index}>{item}</option>})}
                          </select>
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Date of Birth</label>
                <input type="date" className="form-control" value={dob} onChange={(e)=>{setDob(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Relation</label>
                <input type="text" className="form-control" value={relation} onChange={(e)=>{setRelation(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Father/Husband Name</label>
                <input type="text" className="form-control" value={father} onChange={(e)=>{setFather(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Father/Husband Name ( Local Language )</label>
                <input type="text" className="form-control" value={fatherLoc} onChange={(e)=>{setFatherLoc(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Police Station</label>
                <input type="text" className="form-control" value={PS} onChange={(e)=>{setPS(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Tahshil</label>
                <input type="text" className="form-control" value={tahsil} onChange={(e)=>{setTahsil(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Assembly</label>
                <input type="text" className="form-control" value={assembly} onChange={(e)=>{setAssembly(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-4">
                <label className="form-label text-secondary">Assembly ( Local Language )</label>
                <input type="text" className="form-control" value={assemblyLoc} onChange={(e)=>{setAssemblyLoc(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Part Number</label>
                <input type="text" className="form-control" value={partNumber} onChange={(e)=>{setPartnumber(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Part Name</label>
                <input type="text" className="form-control"  value={partName} onChange={(e)=>{setPartName(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Part Name ( Local Language )</label>
                <input type="text" className="form-control" value={partNameLoc} onChange={(e)=>{setPartNameLoc(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-md-6">
                <label className="form-label text-secondary">Langauge</label>
                <input type="text" className="form-control" value={lang} onChange={(e)=>{setLang(e.target.value)}}  />
            </div>
            <div className="mb-3 mt-4 col-12">
                <label className="form-label text-secondary">Residential Address</label>
                <input type="text" className="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
            </div>
            <div className="mb-3 mt-4 col-12">
                <label className="form-label text-secondary">Work Address</label>
                <input type="text" className="form-control" value={addressLoc} onChange={(e)=>{setAddressLoc(e.target.value)}}  />
            </div>
            <button type="button" className="btn btn-success col-md-4 mt-3 ml-1" onClick={sendData}>Submit</button>
        </div>
    )
}

export default Voter
