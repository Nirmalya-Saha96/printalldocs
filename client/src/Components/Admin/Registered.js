/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');


const RegisteredCard=({id,email,name,state,mobile,token})=>{


    const addUsers = async () => {

        var config = {
            method: 'post',
            url: `api/admin/addusers/${id}`,
            headers: {
                'x-auth-token-admin': token
            }
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                toast.success("Successfully Added",{autoClose:2000})
            })
            .catch(function (error) {
                const errors=error.response.data.errors
                if(errors)
                {
                 errors.forEach(error=>toast.error(error.msg,{autoClose:3000}))
                }
            });
    }

    return(
        <div className="col-lg-4 my-3">
            <div className="rounded p-5 shadow ml-4 fs-6" style={{wordBreak:"break-all"}}>
            <p><span style={{fontWeight:"bold"}}>ID</span> : {id}</p>
            <p><span style={{fontWeight:"bold"}}>Name</span> : {name}</p>
            <p><span style={{fontWeight:"bold"}}>State</span> : {state}</p>
            <p><span style={{fontWeight:"bold"}}>Email</span> : {email}</p>
            <p><span style={{fontWeight:"bold"}}>Mobile</span> : {mobile}</p>
            <button type="button" className="btn btn-success" onClick={addUsers}>Add User</button>
            </div>   
        </div>
    )

}

const Registered = ({token}) => {

    const [users, setUsers] = useState([])
    const [ogUsers,setOgUsers]=useState([])
    const [search,setSearch]=useState("")

    const getData = async () => {


                var config = {
                    method: 'get',
                    url: 'api/admin/registeruser',
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
            if(ogUsers[i].mobile.search(search)!==-1)
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
          <input type="text" className="form-control" placeholder="Search by Mobile" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
          <div className="input-group-append">
            <button className="btn btn-success" type="button" onClick={searchResults} >Search</button>
          </div>
        </div>
        <div className="row" >
            {users.length>0&&users.map((item)=>{return <RegisteredCard key={item._id} id={item._id} name={item.name} state={item.state} email={item.email} mobile={item.mobile} token={token}/>})}
        </div>
        </>
    )
}

export default Registered
