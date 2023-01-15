import { useState } from "react"
import "./update.scss"
import axios from "axios"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "react-query";

function Update({setOpenUpdate, user}) {

    const [cover, setCover] = useState(null)
    const [profile, setProfile ] = useState(null)
    const [text, setText] = useState({
        name:"",
        website:"",
        city:""
    })

    const upload = async (file)=>{
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
        (user) => {
        return axios.put("http://localhost:8800/api/user/updateUser", user, {withCredentials:true});
        },
        {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["user"]);
        },
        }
    );


    const handleChange = (e) =>{
        setText((prev)=>{
            return({...prev, [e.target.name]:e.target.value})
        })
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let coverUrl = cover ? await upload(cover) : user.coverPic
        let profileUrl = profile ? await upload(profile) : user.profilePic
        mutation.mutate({...text, coverPic:coverUrl, profilePic:profileUrl})
        setOpenUpdate(false)
    }

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={text.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={text.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={text.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={text.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={text.website}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Update