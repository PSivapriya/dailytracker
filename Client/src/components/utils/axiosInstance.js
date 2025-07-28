import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers:{"Content-Type":"application/json"},
});

axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failed =[];

const processQueue = (error, token =null)=>{
    failed.forEach((pro)=>{
        if(error){
            pro.reject(error);
        }else{
            pro.resolve(token);
        }
    });
    failed=[];
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry =true;

            if(isRefreshing){
                //return new Promise(function(resolve,reject){
                return new Promise((resolve,reject)=>{
                    failed.push({resolve,reject});
                })
                .then((token)=>{
                    originalRequest.headers.Authorization=`Bearer ${token}`;
                    return axiosInstance(originalRequest);
                })
                .catch((error)=>Promise.reject(error));
            }

            isRefreshing=true;
           // const refreshToken = localStorage.getItem('refreshToken');

            try{
                const refreshToken=localStorage.getItem("refreshToken");
                const res = await axios.post("http://localhost:5000/api/refresh",{refreshToken},{withCredentials: true});
                //const {accessToken, refreshToken:newRefreshToken} =res.data;
                //const {accessToken} = res.data;
                const newToken = res.data.accessToken;
                // localStorage.setItem("accessToken",res.data.accessToken);
                // localStorage.setItem("refreshToken",res.data.refreshToken);
                localStorage.setItem("accessToken",newToken);
                axiosInstance.defaults.headers.common["Authorization"] =`Bearer ${newToken}`;
                originalRequest.headers["Authorization"] =`Bearer ${newToken}`;
                processQueue(null, newToken);
                return axiosInstance(originalRequest);
            }catch (error){
                processQueue(error,null)
                localStorage.removeItem("accessToken");
               // processQueue(error,null);
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }finally{
                isRefreshing=false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;