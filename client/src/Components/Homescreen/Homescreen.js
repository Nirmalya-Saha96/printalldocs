/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-distracting-elements */
import React,{useEffect,useState} from 'react'
var axios = require('axios');

const Homescreen = ({token}) => {

    const [name,setName]=useState("")
    const [mobile,setMobile]=useState("")
    const [state,setState]=useState("")
    const [email,setEmail]=useState("")
    const [point,setPoint]=useState(0)

    const getData =async ()=>{
        var config = {
            method: 'get',
            url: 'api/auth',
            headers: { 
              'x-auth-token': token
            }
          };
          
          await axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            setName(response.data.name)
            setMobile(response.data.mobile)
            setState(response.data.state)
            setEmail(response.data.email)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getPointData = async () =>{
        var config = {
          method: 'get',
          url: 'api/home',
          headers: { 
            'x-auth-token': token
          }
        };
        await axios(config)
        .then(function (response) {
         // console.log(JSON.stringify(response.data));
          if(response.data)
          {
            setPoint(response.data.points)
          }
          else
          {
            setPoint(0)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    useEffect(()=>{
        getData()
        getPointData()
    },[])
    return (
        <div>
            <marquee className="mar">Contact helpdesk for support. Please contact : 90735 + (69044/69385/68790)</marquee>
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
                           <td style={{fontWeight:"bold"}}>State</td>
                           <td style={{wordBreak:"break-all"}}>{state}</td>
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
                            <div className=" col-9 fs-4 pl-3 text-center">
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
