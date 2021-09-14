import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const PanPrint = ({token}) => {

    const [data,setData]=useState()
    const [number,setNumber]=useState("")

    const getData = async () => {

       

        var config = {
            method: 'get',
            url: 'api/pan',
            headers: {
                'x-auth-token': token
            }
        };

        axios(config)
            .then(function (response) {
               // console.log(JSON.stringify(response.data));
                if(number===response.data.pan_card_no)
                    setData(response.data)
                else
                    toast.error("Wrong Pan Card Number",{autoClose:2000})
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
            <label className="form-label text-secondary">Enter Pan Card Number</label>
            <input type="email" className="form-control" value={number} onChange={(e)=>{setNumber(e.target.value)}} />
        </div>
        <button type="button" className="btn btn-success col-md-4 mt-3 ml-1" onClick={getData}>Print</button>
        {/* {data&&<div style={{marginTop:"40px"}}>
                   <h1>Your Details</h1>
                   <h5>Pan Card Number : {data.pan_card_no}</h5>
                   <h5>Name : {data.name}</h5>
                   <h5>Father's Name : {data.father_name}</h5>
                   <h5>Date of Birth : {data.date_of_birth}</h5>
               </div>} */}
               {data&&<table className="table mt-5 table-striped">
                   <thead>
                       <tr>
                           <th scope="col" className="fs-3">Pan Card Details</th>
                           <th scope="col" className="fs-3"></th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Pan Card Number</td>
                           <td style={{wordBreak:"break-all"}}>{data.pan_card_no}</td>
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
                           <td style={{fontWeight:"bold"}}>Date of Birth</td>
                           <td style={{wordBreak:"break-all"}}>{data.date_of_birth}</td>
                       </tr>
                   </tbody>
               </table>}
    </div>
    )
}

export default PanPrint
