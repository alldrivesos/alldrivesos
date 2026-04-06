import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getPostsByCategory } from "../../../services/api/blogApi";
import { useNavigate } from "react-router-dom";

interface Props{
    id: string;
}
const RelatedNews:FC<Props> = ({id}) => {
    const navigate = useNavigate()
    const {data} = useQuery({
        queryKey: ['post-by-category', id],
        queryFn: () => getPostsByCategory(id)
    })
    
  return (
    <div className="bg-blue-gray-50">
        <div className="bg-primary w-full p-3 text-white fw-600">Related News</div>
        <div className="mt-3 p-2 grid gap-3">
            {
                data && data?.data?.map((item:any, i:number) => (
                    <div className="flex items-center gap-x-3 cursor-pointer" key={i} onClick={() => navigate(`/blog/${item.id}`)}>
                        <img src={item.coverImage} alt="cover-image" className="w-[100px] h-[80px]" />
                        <div>
                            <p className="fs-400">{item.title}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedNews