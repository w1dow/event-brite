import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {


  let navigate = useNavigate();

  const [formdata, setdata] = useState({
    username: "",
    password: "",
    email: ""
  })
  const [username, setuser] = useState(" ");
  const [email, setemail] = useState(" ");
  const [password, setpass] = useState(" ");
  const [msg, setmsg] = useState(" ");
  const form_submit = (e) => {
    e.preventDefault();
    const res = fetch('http://localhost:8000/api/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    }).then((res) => res.text()).then((res) => { if (res.length == 0) { navigate("/login") } else { setmsg(res) } })
  }

  const handlechange = (e) => {
    setdata({ ...formdata, [e.target.name]: e.target.value });
  }


  return (
    <div className='container border shadow p-10'>
      <div className="main  h-75">
        <h1>Join us </h1>
        <div className="signupform container">
          <form className='w-100 p-1' onSubmit={form_submit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username"> Username</label>
                <input type="text" className="form-control my-2" id="username" placeholder="Username" name="username" value={formdata.username} onChange={handlechange} />
              </div>
              <div className="form-group col-md-6 w-100">
                <label htmlFor="inputEmail4">Email ✉</label>
                <input type="email" className="form-control my-2 " id="inputEmail4" placeholder="Email" name="email" value={formdata.email} onChange={handlechange} />
              </div>
              <div className="form-group col-md-6 w-100 ">
                <label htmlFor="inputPassword4">Password  🔑</label>
                <input type="password" className="form-control my-2" id="inputPassword4" name="password" placeholder="Password" value={formdata.password} onChange={handlechange} />
              </div>
            </div>

            <button type="submit" className="w-20 btn btn-outline-primary my-4 position-relative bottom-0 start-50 translate-middle-x">Sign in</button>
            <p className="my-4 position-relative bottom-10 start-50 translate-middle-x">{msg}</p>
          </form >
        </div>
      </div >
    </div>
  )


}

export default SignupForm;