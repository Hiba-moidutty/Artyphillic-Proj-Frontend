import React,{ useState } from "react";
import "./UserList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "../../utils/axios";
import {  Post_List } from "../../utils/Constants";
import { useNavigate, Link } from "react-router-dom";

function PostList(){
  const [posts,setPosts] = useState([])

  const getPostList = () => {
    axios.get(Post_List).then((response)=>{
      setPosts(response.data);
    }).catch((error)=>
    {console.log('errrrrorrrr')});
  }

  useEffect(()=>{
    getPostList();
  },[]);
  
  const deletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${AdminPost_Delete}/${id}`)
          .then((res) => {
            getPosttList();
            toast.success("Deleted", {
              autoClose: 40000,
            });
          })
          .catch((err) => {
            toast.error("Not Deleted", {
              autoClose: 40000,
            });
          });
      }
    });
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Sl.No</TableCell>
            <TableCell className="tableCell">Post </TableCell>
            <TableCell className="tableCell">Artist Name</TableCell>
            <TableCell className="tableCell">Base Price</TableCell>
            <TableCell className="tableCell">Shipping Price</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((posts) => (
            <TableRow key={posts.id}>
              <TableCell className="tableCell">{posts.id}</TableCell>

              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}

              <TableCell className="tableCell">{posts.art_content}</TableCell>
              <TableCell className="tableCell">{posts.artist_name}</TableCell>
              <TableCell className="tableCell">{posts.base_price}</TableCell>
              <TableCell className="tableCell">{posts.shipping_price}</TableCell>
              <TableCell className="tableCell">
              <Link>
                      <div
                        onClick={() => deletePost(posts.id)}
                        className="post_delete"
                      >
                      </div>
                    DELETE
                    </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostList;