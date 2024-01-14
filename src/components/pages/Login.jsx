import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import * as Yup from 'yup'
import { AuthContext } from "../AppContext/AppContext";
// import { onAuthStateChanged } from "firebase/auth";
import {auth, onAuthStateChanged} from '../firebase/firebase'
import {useNavigate} from 'react-router-dom'


  export default function Login() {


const {signInWithGoogle, loginWithEmailAndPassword} = useContext(AuthContext)
const navigate = useNavigate()



useEffect(() => {
  onAuthStateChanged(auth,(user)=> {
    if(user) {
      navigate('/')
    }else{

    }
  })
},[navigate])


let initialValues = {
    email: "",
    password: ""
}



const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email adress").required("Required"),
    password: Yup.string().required("Required").min('6', "Must be at least 6 charachters long").matches(/^[a-zA-Z]+$/, 'Password can only contain letters'),
})

const handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = formik.values
    if(formik.isValid === true){
        loginWithEmailAndPassword({email, password})
    }else{
        alert('check your input fields')
    }
    console.log('formik', formik)
}

const formik = useFormik({initialValues, validationSchema, handleSubmit})

    return (
        <div className="font-roboto flex justify-center mx-auto h-screen items-center bg-slate-200">

      <Card className="w-96  ">
        <CardHeader
          variant="gradient"
          color="gray"
          className="bg-yellow-500 mb-10  grid h-28 place-items-center"
          >
          <Typography variant="h3"   color="blue">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleSubmit} className="mx-2">
                <div className="mb-2 mx-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="py-2 px-2 outline-none"
                    size="lg"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div className="mx-2">
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="mt-4 mb-2 mx-2">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="py-2 px-2 outline-none "
                    size="lg"
                    {...formik.getFieldProps("password")}
                  />
                  <div>
                    {formik.touched.password && formik.errors.password && (
                      <Typography variant="small" color="red">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </div>
                </div>
                <Button
                  variant="gradient"
                  
                  className="mb-4 px-2 py-5 mx-2 w-[96%] bg-yellow-500"
                  type="submit"

                >
                  Login
                </Button>
                <Button
                  onClick={signInWithGoogle}
                  variant="gradient"
                  
                  className="mb-4 px-2 py-5 mx-2 w-[96%] bg-yellow-500"
                  type="submit"

                >
                  Sign in with Google
                </Button>

              </form>
            </CardBody>
        <CardFooter className="pt-0 bg-">
          <Typography variant="small" className="mt-6 flex bg justify-center">
            Problem with account?
            <Typography
              as="a"
              href="#telegram"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              >
              <a href="tg://resolve?domain=daryanwa">Telegram</a>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
                </div>
    );
  }
  