import axios from "axios";
import { useContext, useState } from "react"
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = ({setShowLogin}) =>{
    const [formData, setFormData] = useState({name:"",email:"",password:""});
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);
    //console.log('AuthContext:', useContext(AuthContext));
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:5000/api/users/login",{
            // name: formData.name,
            email:formData.email,
            password: formData.password,
            },{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            });
             console.log("Login response:", res.data); 
            if(res.data.accessToken){
                localStorage.setItem("accessToken", res.data.accessToken);
                //localStorage.setItem("refreshToken", res.data.refreshToken);
                setUser({
                    id: res.data.user._id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                });
                alert("Login Successfully");
                if(setShowLogin)
                    setShowLogin(false);
                navigate("/user")
                //setShowLogin(false);
            } else {
            alert("Login failed: " + res.data.message);
            }
        }catch (error){
            alert("Login failed" + (error.response?.data?.message || error.message || "unknown error"));
        }
        console.log("Form Submited",formData);
    }

    return (
        <div className="p-4">
           <h2 className="text-center font-semibold text-lg">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form group">
                    <input type="text" name="name" id="name" className="field peer" placeholder=" " onChange={(e) => setFormData({ ...formData, name: e.target.value })} required/>
                    <label htmlFor="name" className="label"> Name </label>
                </div>

                <div className="form group">
                    <input type="email" id="email" name="email" className="field peer" placeholder=" " onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <label htmlFor="email" className="label">Email</label>
                </div>

                <div className="form group">
                    <input type="password" id="password" name="password" className="field peer" placeholder=" " onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
                    <label htmlFor="password" className="label">Password</label>
                </div>
                <div className="p-4">
                    <button className="bg-secondary text-white w-full py-2 rounded font-semibold hover:bg-third">Submit</button>
                    <p className="text-sm text-center">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">SignUp</a></p>
                </div>
            </form>
        </div>
    )
}