import React,{useState} from 'react'
import { toast } from 'react-toastify';
var axios = require('axios');

const Pan = ({token}) => {


    const [pan, setPan] = useState("")
    const [name, setName] = useState("")
    const [father, setFather] = useState("")
    const [dob, setDob] = useState("")

    const sendData = async () => {

        var data = JSON.stringify({
            "pan_card_no": pan,
            "name": name,
            "father_name": father,
            "date_of_birth": dob
        });

        var config = {
            method: 'post',
            url: 'api/pan',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
              //  console.log(JSON.stringify(response.data));
                toast.success("Successfully Updated",{autoClose:2000})
            })
            .catch(function (error) {
                const errors=error.response.data.errors
                console.log(error.status)
            if(errors)
            {
             errors.forEach(error=>toast.error(error.msg,{autoClose:2000}))
            }
            });
    }

    return (
        <div className="row w-75 m-auto">
        <div className="mb-3 mt-4 col-12">
            <label className="form-label text-secondary">Pan Card No.</label>
            <input type="text" className="form-control" value={pan} onChange={(e)=>{setPan(e.target.value)}} />
        </div>
        <div className="mb-3 mt-4 col-12">
            <label className="form-label text-secondary">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className="mb-3 mt-4 col-md-6">
            <label className="form-label text-secondary">Father's Name</label>
            <input type="text" className="form-control" value={father} onChange={(e)=>{setFather(e.target.value)}} />
        </div>
        <div className="mb-3 mt-4 col-md-6">
            <label className="form-label text-secondary">Date of Birth</label>
            <input type="date" className="form-control" value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
        </div>
       
        <button type="button" className="btn btn-success col-md-4 mt-3 ml-1" onClick={sendData}>Submit</button>
    </div>
    )
}

export default Pan
