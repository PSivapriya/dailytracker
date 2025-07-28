import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const {setUser} =useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if(!emailRegex.test(formData.email)){
    //   alert("Please enter valid email address");
    //   return;
    // }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try{
      // const res = await fetch("http://localhost:5000/api/users/signup",{
       const res = await fetch("http://localhost:5000/api/users/signup",{
        method:"POST", headers:{"Content-Type": "application/json"}, 
        body: JSON.stringify({name: formData.name, email: formData.email,password: formData.password}),
        credentials:"include"
      });

      const data =await res.json();
      console.log("Signup response:",data);
      if(!res.ok){
        alert(data.message || "Signup failed");
        return;
      }
      if (res.ok && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          const decoded= jwtDecode(data.accessToken);
          setUser({id: decoded.id, name:decoded.name, email: decoded.email}, process.env.JWT_SECRET, { expiresIn: "1d" });

        alert("Signup successful");
        } else {
          alert("Signup failed");
        }
      // localStorage.setItem("token", data.token);

      // alert("Signup successful")
    }catch (error){
      console.error(error);
      alert("Something went wrong during signup");
    }
   // console.log("Form Submitted", formData);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 shadow-xl rounded-xl overflow-hidden bg-white">
        
        <div className="bg-secondary text-white p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Healthy Life Starts Here</h1>
          <p className="text-lg">Create an account to join our healthy lifestyle community.</p>
        </div>

        {/* Right Section - Form */}
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             
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

            <div className="form group">
              <input type="password" name="confirmpassword" className="field peer" placeholder=" " onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}  required/>
              <label htmlFor="confirmpassword" className="label">Confirm Password</label>
            </div>
           
            <button type="submit" className="bg-secondary text-white w-full py-2 rounded font-semibold hover:bg-third">
              Submit
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
