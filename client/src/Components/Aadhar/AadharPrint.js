import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const AadharPrint = ({token}) => {

  
    const [data,setData]=useState()
    const [number,setNumber]=useState("")


    const getData = async () => {

               

                var config = {
                    method: 'get',
                    url: 'api/adhar',
                    headers: {
                        'x-auth-token': token
                    }
                };

                axios(config)
                    .then(function (response) {
                       // console.log(JSON.stringify(response.data));
                        if(number===response.data.adhar_card_no)
                          setData(response.data)
                        else
                          toast.error("Wrong Aadhar Card Number",{autoClose:2000})

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
                   <label className="form-label text-secondary">Enter Aadhar Card Number</label>
                   <input type="email" className="form-control" value={number} onChange={(e)=>{setNumber(e.target.value)}} />
               </div>
               <button type="button" className="btn btn-success col-md-4 mt-3 ml-1" onClick={getData}>Print</button>
                {/* {data&&<div style={{marginTop:"40px"}} className="shadow">
                   <h1>Your Details</h1>
                   <h5>Aadhar Card Number : {data.adhar_card_no}</h5>
                   <h5>Name : {data.name}</h5>
                   <h5>Father's Name : {data.father_name}</h5>
                   <h5>Gali : {data.gali_locality}</h5>
                   <h5>House Number : {data.house_no}</h5>
                   <h5>Post Office : {data.post_office}</h5>
                   <h5>State : {data.state}</h5>
                   <h5>City : {data.city}</h5>
                   <h5>Pin Code : {data.pin_code}</h5>
                   <h5>Date Of Birth : {data.date_of_birth}</h5>
                   <h5>Date Of Birth (Local Language) : {data.date_of_birth_locality}</h5>
                   <h5>Gender : {data.gender}</h5>
                   <h5>Gender (Local Language) : {data.gender_local}</h5>
                   <h5>Local Language : {data.local_language}</h5>
                   <h5>Address : {data.address}</h5>
                   <h5>Address (Local Language) : {data.address_local_language}</h5>
               </div>}  */}
               {data&&<table className="table mt-5 table-striped">
                   <thead>
                       <tr>
                           <th scope="col" className="fs-3">Aadhar Card Details</th>
                           <th scope="col" className="fs-3"></th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Aadhar Card Number</td>
                           <td style={{wordBreak:"break-all"}}>{data.adhar_card_no}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Name</td>
                           <td style={{wordBreak:"break-all"}}>{data.name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Father's Name</td>
                           <td style={{wordBreak:"break-all"}}>{data.father_name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Gali</td>
                           <td style={{wordBreak:"break-all"}}>{data.gali_locality}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>House Number</td>
                           <td style={{wordBreak:"break-all"}}>{data.house_no}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Post Office</td>
                           <td style={{wordBreak:"break-all"}}>{data.post_office}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>State</td>
                           <td style={{wordBreak:"break-all"}}>{data.state}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>City</td>
                           <td style={{wordBreak:"break-all"}}>{data.city}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Pin Code</td>
                           <td style={{wordBreak:"break-all"}}>{data.pin_code}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Date Of Birth</td>
                           <td style={{wordBreak:"break-all"}}>{data.date_of_birth}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Date Of Submission</td>
                           <td style={{wordBreak:"break-all"}}>{data.date_of_birth_locality}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Gender</td>
                           <td style={{wordBreak:"break-all"}}>{data.gender}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Blood Group</td>
                           <td style={{wordBreak:"break-all"}}>{data.gender_local}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Local Language</td>
                           <td style={{wordBreak:"break-all"}}>{data.local_language}</td>
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

export default AadharPrint
