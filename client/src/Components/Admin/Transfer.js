/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');


const TransferCard=({id,email,name,state,mobile,token,points,getData})=>{

    const [point,setPoint]=useState(0)

    const transferPoints = async () => {

        var data = JSON.stringify({
            "points": Number(point)
          });
          
          var config = {
            method: 'post',
            url: `api/admin/transfer/${id}`,
            headers: { 
              'x-auth-token-admin': token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          //  console.log(JSON.stringify(response.data));
            toast.success("Successfully Transfered",{autoClose:2000})
            getData()
            setPoint(0)
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
            <div className="rounded p-5 shadow ml-4 fs-6">
                <p><span style={{fontWeight:"bold"}}>ID</span> : {id}</p>
                <p><span style={{fontWeight:"bold"}}>Name</span> : {name}</p>
                <p><span style={{fontWeight:"bold"}}>Points</span> : {points}</p>
                <p><span style={{fontWeight:"bold"}}>State</span> : {state}</p>
                <p><span style={{fontWeight:"bold"}}>Email</span> : {email}</p>
                <p><span style={{fontWeight:"bold"}}>Mobile</span> : {mobile}</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter points to transfer" value={point} onChange={(e)=>{setPoint(e.target.value)}}/>
                    <div className="input-group-append">
                        <button className="btn btn-success" type="button" onClick={transferPoints}>Transfer</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

const Transfer = ({token}) => {

    const [users, setUsers] = useState([])
    const [ogUsers,setOgUsers]=useState([])
    const [search,setSearch]=useState("")

    const getData = async () => {


                var config = {
                    method: 'get',
                    url: 'api/admin/addedusers',
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
            if(ogUsers[i].user.mobile.search(search)!==-1)
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
            <button className="btn btn-success" type="button" onClick={searchResults}>Search</button>
          </div>
        </div>
        <div className="row" style={{width:"100%"}}>
            {users.length>0&&users.map((item)=>{return <TransferCard key={item._id} id={item.user._id} name={item.user.name} state={item.user.state} email={item.user.email} mobile={item.user.mobile} token={token} points={item.points} getData={getData}/>})}
        </div>
        </>
    )
}

export default Transfer
