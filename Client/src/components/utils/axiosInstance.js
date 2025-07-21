import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
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
                return new Promise(function(resolve,reject){
                    failed.push({resolve,reject});
                })
                .then((token)=>{
                    originalRequest.headers.Authorization='Bearer '+token;
                    return axiosInstance(originalRequest);
                })
                .catch((error)=>Promise.reject(error));
            }

            isRefreshing=true;
            const refreshToken = localStorage.getItem('refreshToken');

            try{
                // const RefreshToken=localStorage.getItem("refreshToken");
                const res = await axios.post("http://localhost:5000/api/refresh",{refreshToken});
                const {accessToken, refreshToken:newRefreshToken} =res.data;

                localStorage.setItem("accessToken",res.data.accessToken);
                localStorage.setItem("refreshToken",res.data.refreshToken);
                axiosInstance.defaults.headers.common["Authorization"] =`Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] =`Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            }catch (error){
                processQueue(error,null)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }finally{
                isRefreshing=false;
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;