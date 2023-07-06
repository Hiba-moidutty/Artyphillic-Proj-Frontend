import * as React from "react";
import "./EventBooking.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import axios from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { tokenlist, bookingdata } from "../../../utils/Constants";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import moment from "moment";
import useRazorpay from "react-razorpay";

function EventBooking() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [token, setToken] = useState([]);
  const [bookingtoken, setBookingToken] = useState();
  const [date, setDate] = useState();
  const [address, setAddress] = useState();
  const [fee, setFee] = useState();
  const [transactionId, setTrancationId] = useState();
  const { id } = useParams();
  const user_id = Cookies.get("id");
  const navigate = useNavigate();

  const tokenList = () => {
    axios.get(`${tokenlist}/${id}`).then((response) => {
      setToken(response.data[0].tokens);
    });
  };
  const doctorDetails = () => {
    axios.get(`${tokenlist}/${id}`).then((response) => {
      setFee(response.data[0].fee);
    });
  };

  function handleToken(t) {
    setBookingToken(t);
  }

  useEffect(() => {
    tokenList();
    doctorDetails();
  }, []);

  const Razorpay = useRazorpay();
  const amount = fee;
  const handlePayment = () => {
    const options = {
      key: "rzp_test_xn7GLnYrhQV1kd",
      amount: amount * 100,
      currency: "INR",
      name: "easyDoc",
      description: "Booking Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          // setTrancationId(response.razorpay_payment_id);
          booking();
        } else {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        }
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const booking = () => {
    const data = JSON.stringify({
      name,
      age,
      phone,
      bookingtoken,
      date,
      address,
      id,
      user_id,
    });
    axios
      .post(bookingdata, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        Swal.fire("Booked");
        navigate("/confirmation");
      });
  };

  return (
    <>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="card">
              <h5 className="text-center mb-4">Booking Details</h5>
              <form className="form-card" onSubmit={booking}>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-8 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      name="fname"
                      placeholder="Enter patient full name"
                      onblur="validate(1)"
                    />
                  </div>
                  <div className="form-group col-sm-4 flex-column d-flex">
                    <label className="form-control-label px-3">Age</label>
                    <input
                      type="text"
                      id="lname"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      name="lname"
                      placeholder="Enter patient age"
                      onblur="validate(2)"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-4 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      name="email"
                      placeholder="Contact Number"
                      onblur="validate(3)"
                    />
                  </div>
                  <div className="form-group col-sm-4 flex-column d-flex">
                    <label className="form-control-label px-3">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      min={moment().format("YYYY-MM-DD")}
                      placeholder="Select appointment date"
                    />
                  </div>
                  <div className="form-group col-sm-4 flex-column d-flex">
                    <label className="form-control-label px-3">Token</label>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        id="dropdown-basic"
                        className="colorgray"
                      >
                        Available Tokens
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {token.map((t) => (
                          <Dropdown.Item onClick={() => handleToken(t)}>
                            Token {t}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <label className="form-control-label px-3">Address</label>
                    <input
                      type="text"
                      id="ans"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      name="ans"
                      placeholder="Enter patient address"
                      onblur="validate(6)"
                    />
                  </div>
                </div>

                <div className="row">
                  <Button
                    type="button"
                    className="btn btn-secondary mt-3 colorgray"
                    onClick={handlePayment}
                  >
                    Pay & Book 
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventBooking;