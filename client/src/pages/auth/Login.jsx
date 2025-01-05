

import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import useEcomstore from "../../store/ecom-store"

const Login = () => {

  const actionLogin = useEcomstore((state) => state.actionLogin)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })


  const handleOnChang = (e) => {
    // console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      console.log(res)
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err,
        icon: 'error',
        showConfirmButton: 'OK',
      });
    }

  }

  return (
    <div>
      Login
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

        <button className=" bg-blue-600 rounded-md">
          Login
        </button>

      </form>
    </div>
  )
}

export default Login
