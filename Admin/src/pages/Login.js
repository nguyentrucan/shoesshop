import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
})

const Login = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state?.auth)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values))
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      window.location.href = "/admin";
    }
  }, [authState])

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='light' />
      <div className="py-5" style={{ background: 'linear-gradient(135deg, #f5a623, #f093fb)', minHeight: '100vh' }}>
        <div className='d-flex flex-column align-items-center justify-content-center h-100' style={{ marginTop: '200px' }}>
          <div className='login-card bg-white rounded-3 p-4 shadow-sm' style={{ maxWidth: '400px', width: '100%' }}>
            <h3 className='text-center mb-3' style={{ fontWeight: 'bold', color: '#333' }}>Login</h3>
            <p className='text-center mb-4' style={{ color: '#666' }}>Login to your account to continue.</p>
            <div className='error text-center text-danger mb-3'>
              {authState.message === "Not admin !" ? "You are not an Admin" : ""}
            </div>
            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <CustomInput
                type='text'
                name='email'
                label='Email Address'
                id='email'
                val={formik.values.email}
                onCh={formik.handleChange("email")}
                onBlr={formik.handleBlur("email")}
              />
              <div className='error text-danger mt-2'>
                {formik.touched.email && formik.errors.email}
              </div>
              {/* Password */}
              <CustomInput
                type='password'
                name='password'
                label='Password'
                id='pass'
                val={formik.values.password}
                onCh={formik.handleChange("password")}
                onBlr={formik.handleBlur("password")}
              />
              <div className='error text-danger mt-2'>
                {formik.touched.password && formik.errors.password}
              </div>
              <div className='mb-3 text-end'>
                <Link to='/forgot-password' className='text-decoration-none' style={{ color: '#f093fb' }}>
                  Forgot Password?
                </Link>
              </div>
              <button
                className='btn btn-primary w-100 py-2'
                style={{ backgroundColor: '#f093fb', borderColor: '#f093fb' }}
                type='submit'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
