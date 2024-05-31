import axios from'axios'
import {useState,useEffect} from 'react';

function UseEffectDemo() {
    let [albums,setAlbums] = useState([])
    let [err,setErr] = useState("")
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/albums')
        .then((res)=>res.json)
        .then(data=>setAlbums(data))
        .catch(err=>console.log(err))
    },[])
  
    return (
      <div>
        <table className="table text-center">
            <thead>
                <tr>
                    <th>UserID</th>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {
                    albums.map((albumObj)=><tr >
                        
                        <td>{albumObj.id}</td>
                        <td>{albumObj.title}</td>
                    </tr>)
                }

            </tbody>   
        </table>
      </div>
    )
  }
  
  export default UseEffectDemo;