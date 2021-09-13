/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
var axios = require('axios');


const PanCard=({data})=>{


   
    return(
        <div className="col-lg-4 my-3">
            <div className="rounded p-5 shadow ml-4 fs-6" style={{wordBreak:"break-all"}}>
            <p><span style={{fontWeight:"bold"}}>ID</span> : {data.user._id}</p>
                   <p><span style={{fontWeight:"bold"}}>Pan Card Number</span> : {data.pan_card_no}</p>
                   <p><span style={{fontWeight:"bold"}}>Name</span> : {data.name}</p>
                   <p><span style={{fontWeight:"bold"}}>Father's Name</span> : {data.father_name}</p>
                   <p><span style={{fontWeight:"bold"}}>Date of Birth</span> : {data.date_of_birth}</p>
            </div>   
        </div>
    )

}

const PanAdmin = ({token}) => {

    const [ogUsers,setOgUsers]=useState([])
    const [users, setUsers] = useState([])
    const [search,setSearch]=useState("")

    const getData = async () => {


                var config = {
                    method: 'get',
                    url: 'api/admin/pan',
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
            {users.length>0&&users.map((item)=>{return <PanCard key={item._id} data={item}/>})}
            {users.length===0&&<h3>No Results</h3>}
        </div>
        </>
    )
}

export default PanAdmin
