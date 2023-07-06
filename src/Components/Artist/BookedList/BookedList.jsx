// import Cookies from "js-cookie";
// import { useEffect } from "react";
// import { useState } from "react";
import DataTable from "react-data-table-component";
// import axios from "../../../utils/axios";
// import { bookinglist } from "../../../utils/Constants";



function BookedList() {
  useEffect(()=>{
    bookingList();
},[]);

const [booking,setBooking] = useState([])
const id = Cookies.get('hospital_id')

const bookingList =()=>{
    axios.get(`${bookinglist}/${id}`).then((response)=>{
    const data = response.data.map((b,index)=>({
        slno:index+1,
        name:b.name,
        age:b.age,
        doctor_id:b.doctor_id,
        token:b.token,
        date:b.date,
    }));
    setBooking(data)
    });
};

const columns = [
{
  name: "SL.No",
  selector: (row) => row.slno,
  sortable: true,
},
{
  name: "Patient Name",
  selector: (row) => row.name,
  sortable: true,
},
{
  name: "Age",
  selector: (row) => row.age,
},
// {
//   name: "Doctor",
//   selector: (row) => row.doctor_id,
// },
{
  name: "Token",
  selector: (row) => row.token,
},
{
  name: "Date",
  selector: (row) => row.date,
  sortable:true,
},
];


return (
  <div className="container-fluid mt-5">
    <div className="row">
      <div className="col-md-10">
        {/* <div className="text-end">
          <input
            type="text"
            placeholder="Search User"
          />
        </div> */}
        <DataTable columns={columns} data={booking} pagination />
      </div>
    </div>
  </div>
);
}

export default BookedList;