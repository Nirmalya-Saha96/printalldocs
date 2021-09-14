import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const VoterPrint = ({token}) => {

    const [data,setData]=useState()
    const [number,setNumber]=useState("")

    const getData = async () => {


        var config = {
            method: 'get',
            url: 'api/voter',
            headers: {
                'x-auth-token': token
            }
        };

        axios(config)
            .then(function (response) {
               // console.log(JSON.stringify(response.data));
                if(number===response.data.epic_no)
                    setData(response.data)
                else
                    toast.error("Wrong Voter Card Number",{autoClose:2000})
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
        <div className="row w-75 m-auto">
        <div className="col-12 mb-3 mt-4">
            <label className="form-label text-secondary">Enter Voter Card Number</label>
            <input type="email" className="form-control" value={number} onChange={(e)=>{setNumber(e.target.value)}} />
        </div>
        <button type="button" className="btn btn-success col-md-4 mt-3 ml-1" onClick={getData}>Print</button>
        {/* {data&&<div style={{marginTop:"40px"}} className="shadow">
                   <h1>Your Details</h1>
                   <h5>Voter Card Number : {data.epic_no}</h5>
                   <h5>Name : {data.name}</h5>
                   <h5>Locality : {data.name_locality}</h5>
                   <h5>Gender : {data.gender}</h5>
                   <h5>Date Of Birth : {data.date_of_birth}</h5>
                   <h5>Relation : {data.relation_father_husband}</h5>
                   <h5>Father : {data.father_husband_name}</h5>
                   <h5>Father (Local Language) : {data.father_husband_name_local_language}</h5>
                   <h5>Police Station : {data.police_station}</h5>
                   <h5>Tahsil : {data.tahshil}</h5>
                   <h5>Assembly : {data.assembly}</h5>
                   <h5>Assembly (Local Language) : {data.assembly_local_language}</h5>
                   <h5>Part Number : {data.part_number}</h5>
                   <h5>Part Name : {data.part_name}</h5>
                   <h5>Part Name (Local Language) : {data.part_name_lacal_language}</h5>
                   <h5>Language : {data.language}</h5>
                   <h5>Address : {data.address}</h5>
                   <h5>Address (Local Language) : {data.address_local_language}</h5>
               </div>} */}
               {data&&<table className="table mt-5 table-striped">
                   <thead>
                       <tr>
                           <th scope="col" className="fs-3">Voter Card Details</th>
                           <th scope="col" className="fs-3"></th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Voter Card Number</td>
                           <td style={{wordBreak:"break-all"}}>{data.epic_no}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Name</td>
                           <td style={{wordBreak:"break-all"}}>{data.name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Locality</td>
                           <td style={{wordBreak:"break-all"}}>{data.name_locality}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Gender</td>
                           <td style={{wordBreak:"break-all"}}>{data.gender}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Date Of Birth</td>
                           <td style={{wordBreak:"break-all"}}>{data.date_of_birth}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Relation</td>
                           <td style={{wordBreak:"break-all"}}>{data.relation_father_husband}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Father</td>
                           <td style={{wordBreak:"break-all"}}>{data.father_husband_name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Father (Local Language)</td>
                           <td style={{wordBreak:"break-all"}}>{data.father_husband_name_local_language}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Police Station</td>
                           <td style={{wordBreak:"break-all"}}>{data.police_station}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Tahsil</td>
                           <td style={{wordBreak:"break-all"}}>{data.tahshil}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Assembly</td>
                           <td style={{wordBreak:"break-all"}}>{data.assembly}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Assembly (Local Language)</td>
                           <td style={{wordBreak:"break-all"}}>{data.assembly_local_language}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Part Number</td>
                           <td style={{wordBreak:"break-all"}}>{data.part_number}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Part Name</td>
                           <td style={{wordBreak:"break-all"}}>{data.part_name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Part Name (Local Language)</td>
                           <td style={{wordBreak:"break-all"}}>{data.part_name_lacal_language}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Language</td>
                           <td style={{wordBreak:"break-all"}}>{data.language}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Residential Address</td>
                           <td style={{wordBreak:"break-all"}}>{data.address}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Work Address</td>
                           <td style={{wordBreak:"break-all"}}>{data.address_local_language}</td>
                       </tr>
                   </tbody>
               </table>}
    </div>
    )
}

export default VoterPrint
