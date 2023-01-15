import "./posts.scss";
import Post from "../post/Post"
import { useQuery } from 'react-query'
import axios from "axios"

function Posts({userId}) {

  const { isLoading, error, data } = useQuery('posts',  async () =>{
    const res = await axios.get('http://localhost:8800/api/post/getpost?userId='+ userId, {withCredentials:true})
    return res.data
    })       
  
  return (
    <div className="posts">
    {error ? "Something is wrong" : (isLoading ? "loading" : data.map(post=>(
      <Post post={post} key={post.id} />
    ))) }
    </div> 
  )
}

export default Posts