/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
var axios = require('axios');


const LinkCard=({data})=>{

    return(
        <div className="col-lg-4 my-3">
            <div className="rounded p-5 shadow ml-4 fs-6" style={{wordBreak:"break-all"}}>
                   <p><span style={{fontWeight:"bold"}}>ID</span> : {data.user._id}</p>
                   <p><span style={{fontWeight:"bold"}}>Name</span> : {data.user.name}</p>
                   <p><span style={{fontWeight:"bold"}}>Mobile Number</span> : {data.user.mobile}</p>
                   <p><span style={{fontWeight:"bold"}}>Aadhar Card Number</span> : {data.adhar_card_no}</p>
                   <p><span style={{fontWeight:"bold"}}>Voter Card Number</span> : {data.voter_card_no}</p>
                   <p><span style={{fontWeight:"bold"}}>Pan Card Number</span> : {data.pan_card_no}</p>
                   <p><span style={{fontWeight:"bold"}}>Name</span> : {data.name}</p>
                   <p><span style={{fontWeight:"bold"}}>Father's Name</span> : {data.father_name}</p>
                   <p><span style={{fontWeight:"bold"}}>Gali</span> : {data.gali_locality}</p>
                   <p><span style={{fontWeight:"bold"}}>House Number</span> : {data.house_no}</p>
                   <p><span style={{fontWeight:"bold"}}>Post Office</span> : {data.post_office}</p>
                   <p><span style={{fontWeight:"bold"}}>State</span> : {data.state}</p>
                   <p><span style={{fontWeight:"bold"}}>City</span> : {data.city}</p>
                   <p><span style={{fontWeight:"bold"}}>Pin Code</span> : {data.pin_code}</p>
                   <p><span style={{fontWeight:"bold"}}>Date Of Birth</span> : {data.date_of_birth}</p>
                   <p><span style={{fontWeight:"bold"}}>Date Of Submission</span> : {data.date_of_birth_locality}</p>
                   <p><span style={{fontWeight:"bold"}}>Gender</span> : {data.gender}</p>
                   <p><span style={{fontWeight:"bold"}}>Blood Group</span> : {data.gender_local}</p>
                   <p><span style={{fontWeight:"bold"}}>Local Language</span> : {data.local_language}</p>
                   <p><span style={{fontWeight:"bold"}}>Residential Address</span> : {data.address}</p>
                   <p><span style={{fontWeight:"bold"}}>Work Address</span> : {data.address_local_language}</p>
                   <p><span style={{fontWeight:"bold"}}>Aadhar Card Check</span> : Done</p>
                   <p><span style={{fontWeight:"bold"}}>Addres Check</span> : Done</p>
                   <p><span style={{fontWeight:"bold"}}>Photo Check</span> : Done</p>
                   <p><span style={{fontWeight:"bold"}}>Biometric Check</span> : Done</p>
            </div>   
        </div>
    )

}


const LinkAdmin = ({token}) => {

    const [ogUsers,setOgUsers]=useState([])
    const [users, setUsers] = useState([])
    const [search,setSearch]=useState("")

    const getData = async () => {

        var config = {
            method: 'get',
            url: 'api/admin/link',
            headers: {
                'x-auth-token-admin': token
            }
        };
        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                setUsers(response.data)
                setOgUsers(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
}

const searchResults = async () =>{
    if(!search)
    {
      await getData()
    }
    else
    {
      let a=[]
      for(let i=0;i<ogUsers.length;i++)
      {
        if(ogUsers[i].user._id.search(search)!==-1)
        {
          a.push(ogUsers[i])
        }
      }
      setUsers(a)
    }
  }

useEffect(() => {
    getData()
}, [])

    return (
       <>
        <div className="input-group mb-3 w-75">
          <input type="text" className="form-control" placeholder="Search by ID" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
          <div className="input-group-append">
            <button className="btn btn-success" type="button" onClick={searchResults}>Search</button>
          </div>
        </div>
        <div className="row">
            {users.length>0&&users.map((item)=>{return <LinkCard key={item._id} data={item}/>})}
            {users.length===0&&<h3>No Results</h3>}
        </div>
       </>
    )
}

export default LinkAdmin
