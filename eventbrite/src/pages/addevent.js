import React, { useState } from 'react';
import '../static/addevent.css';
import { useNavigate } from 'react-router-dom';
 import { useCookies } from 'react-cookie';
/// addding event by sending request to /api/addevent using fetch


const Addevent = () => {
    let navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies(['name']);
    const id = cookies.id //getting user id
    const [file, setSelectedFile] = useState(null);
    const [formdata, setFormData] = useState({
        event_name: "",
        date: "",
        time: "",
        location: "",
        user_id:id
    });

    const formd = new FormData() // creating data to be sent

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // selecting the file
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formdata, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        Object.entries(formdata).forEach(([key, value]) => {
            formd.append(key, value);
        });

        const img = new File([file], `${formdata.event_name}.jpg`, { type: file.type });
        formd.append('image', img)
        // console.log(formd)
       fetch('http://localhost:8000/api/addevent', {
            method: 'POST',
            body: formd
        }).then((res) => res.json()).then((res) => { navigate("/se/a") })
    };

    return (
        <div className='main'>
            <h1>Make an event</h1>
        <div className='container border rounded-sm  h-75 '>
            <form onSubmit={handleSubmit} className='h-100 w-100'>
                <div className="form-row ">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Name</label>
                        <input type="text" className="form-control m-1" id="inputEmail4" name="event_name" placeholder="Event name" onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">Date</label>
                        <input type="date" className="form-control m-1" name="date" id="inputPassword4" placeholder="13/7/2006" onChange={handleChange} />
                    </div>
                <div className="form-group col-md-2">
                    <label htmlFor="inputAddress">Time</label>
                    <input type="time" className="form-control m-1" id="inputAddress" name='time' placeholder="Time" onChange={handleChange} />
                </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputAddress2">Location</label>
                    <input type="text" className="form-control m-1" id="inputAddress2" name="location" placeholder="Apartment, studio, or floor" onChange={handleChange} />
                </div>
                <div className="form-group col-md-8">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Image</label>
                        <input type="file" className="form-control m-1" name="file" id="inputCity" onChange={handleFileChange} />
                    </div>
                </div>
                <button type="submit" className="col-md-4 btn btn-outline-success my-2 position-relative top-0 start-50 translate-middle-x">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default Addevent;
