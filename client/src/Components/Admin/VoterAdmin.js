/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
var axios = require('axios');


const VoterCard=({data})=>{


    return(
        <div className="col-lg-4 my-3">
            <div className="rounded p-5 shadow ml-4 fs-6" style={{wordBreak:"break-all"}}>
                <p><span style={{fontWeight:"bold"}}>ID</span> : {data.user._id}</p>
                <p><span style={{fontWeight:"bold"}}>Voter Card Number</span> : {data.epic_no}</p>
                <p><span style={{fontWeight:"bold"}}>Name</span> : {data.name}</p>
                <p><span style={{fontWeight:"bold"}}>Locality</span> : {data.name_locality}</p>
                <p><span style={{fontWeight:"bold"}}>Gender</span> : {data.gender}</p>
                <p><span style={{fontWeight:"bold"}}>Date Of Birth</span> : {data.date_of_birth}</p>
                <p><span style={{fontWeight:"bold"}}>Relation</span> : {data.relation_father_husband}</p>
                <p><span style={{fontWeight:"bold"}}>Father</span> : {data.father_husband_name}</p>
                <p><span style={{fontWeight:"bold"}}>Father (Local Language)</span> : {data.father_husband_name_local_language}</p>
                <p><span style={{fontWeight:"bold"}}>Police Station</span> : {data.police_station}</p>
                <p><span style={{fontWeight:"bold"}}>Tahsil</span> : {data.tahshil}</p>
                <p><span style={{fontWeight:"bold"}}>Assembly</span> : {data.assembly}</p>
                <p><span style={{fontWeight:"bold"}}>Assembly (Local Language)</span> : {data.assembly_local_language}</p>
                <p><span style={{fontWeight:"bold"}}>Part Number</span> : {data.part_number}</p>
                <p><span style={{fontWeight:"bold"}}>Part Name</span> : {data.part_name}</p>
                <p><span style={{fontWeight:"bold"}}>Part Name (Local Language)</span> : {data.part_name_lacal_language}</p>
                <p><span style={{fontWeight:"bold"}}>Language</span> : {data.language}</p>
                <p><span style={{fontWeight:"bold"}}>Residential Address</span> : {data.address}</p>
                <p><span style={{fontWeight:"bold"}}>Work Address</span> : {data.address_local_language}</p>
            </div>
        </div>
    )

}

const VoterAdmin = ({token}) => {

  const [ogUsers,setOgUsers]=useState([])
  const [users, setUsers] = useState([])
  const [search,setSearch]=useState("")

    const getData = async () => {

        var config = {
          method: 'get',
          url: 'api/admin/voter',
          headers: { 
            'x-auth-token-admin': token
          }
        };
        
        axios(config)
        .then(function (response) {
        //  console.log(JSON.stringify(response.data));
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
        <div className="row" style={{width:"100%"}}>
            {users.length>0&&users.map((item)=>{return <VoterCard key={item._id} data={item}/>})}
            {users.length===0&&<h3>No Results</h3>}
        </div>
        </>
    )
}

export default VoterAdmin
