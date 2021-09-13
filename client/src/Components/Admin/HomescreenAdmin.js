/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-distracting-elements */
import React,{useEffect,useState} from 'react'
var axios = require('axios');

const Homescreen = ({token}) => {

    const [name,setName]=useState("")
    const [mobile,setMobile]=useState("")
    const [email,setEmail]=useState("")
    const [point,setPoint]=useState(0)

    const getData =async ()=>{
        var config = {
            method: 'get',
            url: 'api/admin',
            headers: { 
              'x-auth-token-admin': token
            }
          };
          
          await axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            setName(response.data.name)
            setMobile(response.data.mobile)
            setEmail(response.data.email)
            setPoint(response.data.points)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  
    useEffect(()=>{
        getData()
    },[])
    return (
        <div>
            <marquee className="mar">For Enquiry Call Rohan : 90735 + (69044/69385/68790)</marquee>
            <marquee behavior="alternate" className="mar2">Aadhar/VoterID/Pan Correction Available
            </marquee>
            <div className="row">
                <div className="col-md-6 pt-4 d-flex justify-content-center">
                <table className="table table-striped">
                   <thead>
                       <tr>
                           <th scope="col" className="fs-3">My Details</th>
                           <th scope="col" className="fs-3"></th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Name</td>
                           <td style={{wordBreak:"break-all"}}>{name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Mobile</td>
                           <td style={{wordBreak:"break-all"}}>{mobile}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:"bold"}}>Email</td>
                           <td style={{wordBreak:"break-all"}}>{email}</td>
                       </tr>
                   </tbody>
               </table>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <div className="mt-5">
                    <div className="points mt-4">
                        <div className="row">
                            <div className="col-3">
                                <i className="fas fa-rupee-sign rp"></i>
                            </div>
                            <div className="col-9 fs-4 pl-3 text-center">
                                <p>Total Points</p>
                                <p>{point}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homescreen
