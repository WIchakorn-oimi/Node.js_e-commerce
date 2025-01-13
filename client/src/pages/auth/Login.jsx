
import { useState } from "react"
import Swal from "sweetalert2"
import useEcomstore from "../../store/ecom-store"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

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
      const  role  = res.data.payload.role
      roleRedirect(role)
      Swal.fire({
        title: 'Success',
        text: 'Login successful!',
        icon: 'success',
        showConfirmButton: true,
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err,
        icon: 'error',
        showConfirmButton: 'OK',
      });
    }
  }

  const roleRedirect = (role)=> {
    if(role === 'admin'){
      navigate('/admin')
    }else{
      navigate('/user')
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
