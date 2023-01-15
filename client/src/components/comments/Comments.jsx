import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./comments.scss"
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from "axios"
import moment from "moment"
const Comments = ({postId}) =>{

    
    const {currentUser} = useContext(AuthContext);
    const [desc, setDesc] = useState("")

    const { isLoading, error, data } = useQuery(['comments', postId],  async () =>{
    
        const res = await axios.get("http://localhost:8800/api/comment/getcomment?postId=" + postId, {withCredentials:true})
        return res.data
        }) 

        const queryClient = useQueryClient()
        const mutation = useMutation((newComment)=>{
            return axios.post("http://localhost:8800/api/comment/addcomment", newComment, {withCredentials:true})    
        },
        {
            onSuccess: () => {
              // Invalidate and refetch
              queryClient.invalidateQueries(["comments"])
            },
          })

         const handleInput = (e) =>{
           setDesc(e.target.value)   
         }
         const handleSubmit = (e)=>{
            e.preventDefault()
            mutation.mutate({desc, postId})
            setDesc("") 
         } 

    return(
        <div className="comments">
            <div className="write">
                <img src={"/upload/"+currentUser.profilePic} />
                <input value={desc} type="text" placeholder="write a comment" onChange={handleInput} />
                <button onClick={handleSubmit} >Send</button>
            </div>
            
            { isLoading ? "loading" : data.map(comment=>(
                <div className="comment">
                    <img src={"/upload/"+ comment.profilePic} />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments;