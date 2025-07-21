import { BlogsArticle } from "../Data/data"

export const Blogs = () =>{
    return (
        <div className="container py-10">
            <div>
                <h1 className="text-xl font-semibold">Latest Articles</h1>
                <hr></hr>
                <div className="grid md:grid-cols-1 lg:grid-cols-2">
                    {
                        BlogsArticle.map((item,index)=>(
                            <div key={index}>
                                <img src={item.img} ></img>
                                <h1 className="font-bold text-xl lg:text-2xl cursor-pointer">{item.title}</h1>
                                <p className="text-xl py-2">{item.desc}</p>
                                </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}