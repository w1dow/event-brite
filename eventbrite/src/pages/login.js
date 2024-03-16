import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Login = ()=>{
    let navigate = useNavigate(); /// useNavigate to go to other pages
    // const [username,setusername]=useState(" ");
    // const [password,setpass]=useState(" ");
    const [cookies, setCookie] = useCookies(['name']); //getting and setting cookies
    const [msg,setmsg] = useState(" ");
    const[formdata,setform]= useState({
        username:"",
        password:""
    })
const submit_login= (e)=> {
    e.preventDefault();

    //ON Submitting it fetchs /api/login and sends username and password and the backend handles the login

 fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formdata)
  }).then((res)=>res.json()).then((res)=>{
    if(res.message==="Success"){
        setCookie("id",res['id']);
        setCookie("name",res['username']);
        navigate("/")
        window.location.reload();
    }else{
        setmsg(res.message)
    }
  })
}

const onchange = (e)=>{
    setform({ ...formdata, [e.target.name]: e.target.value });
}
    return (
        <div className="main">
            <h1>Login wit your username</h1>
            <div className="container">
                <form onSubmit={submit_login} className='border p-5  shadow'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1"> Username    </label>
                        <input type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="email" name="username" placeholder="Enter Username" value={formdata.username} onChange={onchange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                        placeholder="Password" value={formdata.password} onChange={onchange}/>
                    </div>
                    <button type="submit" className="btn btn-outline-success my-2 position-relative top-0 start-50 translate-middle-x">Submit</button>
                    <p>{msg}</p>
                </form>
            </div>
        </div>
    )
}
export default Login;