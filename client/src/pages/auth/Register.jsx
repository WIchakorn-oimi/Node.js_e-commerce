

import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"

const Register = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    ConfirmPassword: ""
  })


  const handleOnChang = (e) => {
    // console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (form.password !== form.ConfirmPassword) {
      return Swal.fire({
        title: 'error',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', form)
      console.log(res)
      Swal.fire({
        title: 'success',
        text: 'Form submitted successfully!',
        icon: 'success',
        timer: 1500,
      })
      console.log(form)
    } catch (err) {
      const errMsg = err.response?.data?.message
      console.log(err)

      Swal.fire({
        title: 'Error',
        text: errMsg,
        icon: 'error',
        showConfirmButton: 'OK',
      });
    }
  }

  return (
    <div>
      register
      <form onSubmit={handleSubmit}>
        Email
        <input className="border"
          onChange={handleOnChang}
          name="email"
          type="email"
        />

        Password
        <input className='border'
          type="text"
          onChange={handleOnChang}
          name="password"
        />

        ConfirmPassword
        <input type="text"
          onChange={handleOnChang}
          className="border"
          name="ConfirmPassword"
        />

        <button className=" bg-blue-600 rounded-md">
          Register
        </button>

      </form>
    </div>
  )
}

export default Register
