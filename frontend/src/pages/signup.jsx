import Header from "../components/header"
import Form from "../components/form"
import Fotter from "../components/fotter"

export default function Signup(){
    return (
        <div className="bg-gray-300 h-screen w-screen flex justify-center items-center ">
            <div className="bg-white h-auto w-[300px] rounded-lg shadow-sm shadow-black p-5">
             <Header label={'Sign Up'} subLabel={'Please enter your information to create an account'}></Header>

             <Form type={'signup'} buttonText={'Sign up'}></Form>
             <Fotter label={'Already have an account? '} buttonText={'Sign in'} to={'/signin'}></Fotter>
            </div>
             
        </div>
    )
}

              
