import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext,  useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const Share = () => {

  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const {currentUser} = useContext(AuthContext)
  
  const upload = async ()=>{
    try{
      const formdata = new FormData()
      formdata.append("file", file) 
      const res = await axios.post("http://localhost:8800/api/upload", formdata)
      return res.data
    }
    catch(err){
      console.log(err)      
    } 
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return axios.post("http://localhost:8800/api/post/addpost", newPost, {withCredentials:true});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDesc = (e) =>{
    setDesc(e.target.value)
  }
  
  const handleFile = (e)=>{
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    let imgUrl = ""
    if (file) imgUrl = await upload()
    mutation.mutate({ desc, img:imgUrl });
    setDesc("")
    setFile(null)

  }
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={"/upload/"+currentUser.profilePic}
              alt=""
            />
            <input name="desc" type="text" value={desc} placeholder={`What's on your mind ${currentUser.name}?`} onChange={handleDesc} />
          </div>
          <div className="right">
            {file && <img className="file" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input name="file" type="file" id="file" style={{display:"none"}} onChange={handleFile}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleSubmit} >Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;