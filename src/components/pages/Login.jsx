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
import * as Yup from 'yup'

  export default function Login() {


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
        alert('good')
    }else{
        alert('check input fields')
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
          className="bg-yellow-500 mb-4 grid h-28 place-items-center"
          >
          <Typography variant="h3"   color="blue">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Password"
                    size="lg"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div>
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
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
                  fullWidth
                  className="mb-4 bg-yellow-500"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardBody>
        <CardFooter className="pt-0 bg-">
          <Typography variant="small" className="mt-6 flex bg justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
                </div>
    );
  }
  