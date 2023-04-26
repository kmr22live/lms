import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

export default function AddMembers() {
  const context = useContext(Context);
  const nav = useNavigate();
  const [removeFilter, setRemoveFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const [removeValue, setRemoveValue] = useState("");

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    books: "",
  };
  const notify = () =>
    toast.success("Successfully Added!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyremoved = () =>
    toast.success("Successfully Removed!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  useEffect(() => {
    context.setFilteredMemberData(context.memberData);
  }, [context.memberData]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("im hereeeeeee");
      context.setMemberData([
        ...context.memberData,
        { ...values, id: uuidv4() },
      ]);

      setLoading(true);

      if (!context.isRemoveMember) {
        notify();
        setTimeout(() => {
          nav("/settings");
          setLoading(false);
        }, 2000);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is Required";
      }
      if (!values.email) {
        errors.email = "Email is Required";
      } else if (!values.email.includes("@")) {
        errors.email = "Enter valid Email address";
      } else if (!values.email.includes(".")) {
        errors.email = "Enter valid Email address";
      }
      if (!values.mobile) {
        errors.mobile = "Mobile No is Required";
      }
      if (!values.address) {
        errors.address = "Address is Required";
      }
      if (!values.books) {
        errors.books = "books is Required";
      }

      return errors;
    },
  });

  if (removeFilter.length > 0) {
    formik.values.name = removeFilter[0].name;
    formik.values.email = removeFilter[0].email;
    formik.values.mobile = removeFilter[0].mobile;
    formik.values.address = removeFilter[0].address;
  }

  const optionChange = (e) => {
    setRemoveFilter(
      context.filteredMemberData.filter((a) => a?.id == e.target.value)
    );
  };

  return (
    <div className="projects-section addbookLine">
      <div className="projects-section-line ">
        <div className="projects-section-header">
          <p>{context.isRemoveMember ? "Remove " : "Add "}Member</p>
        </div>
        <div className="view-actions">
          <button
            onClick={() => nav("/settings")}
            className="view-btn addbook-btn"
          >
            <i className="fa-solid fa-circle-arrow-left"></i>
          </button>
        </div>
      </div>
      <div className="addbook-form">
        <Form
          onSubmit={formik.handleSubmit}
          noValidate
          className="p-1 "
          style={{
            rowGap: "15px",
          }}
        >
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                {context.isRemoveMember ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setRemoveValue(e.target.value);
                      optionChange(e);
                    }}
                  >
                    <option defaultValue="Select Book">
                      Select Member to Remove
                    </option>
                    {context.filteredMemberData.map(({ name, id, mobile }) => {
                      return (
                        <option key={id} value={id}>
                          {name}, ({mobile})
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <Form.Control
                    required
                    name="name"
                    type="text"
                    placeholder="Enter Member Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    isInvalid={formik.touched.name && formik.errors.name}
                  />
                )}
                {!context.isRemoveMember &&
                formik.touched.name &&
                formik.errors.name ? (
                  <div className="addbook-error">{formik.errors.name}</div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              name="email"
              type="text"
              placeholder="Enter Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={
                !context.isRemoveMember &&
                formik.touched.email &&
                formik.errors.email
              }
            />
            {!context.isRemoveMember &&
            formik.touched.email &&
            formik.errors.email ? (
              <div className="addbook-error">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              required
              name="mobile"
              type="tel"
              placeholder="Enter Mobile No"
              onChange={formik.handleChange}
              value={formik.values.mobile}
              isInvalid={
                !context.isRemoveMember &&
                formik.touched.mobile &&
                formik.errors.mobile
              }
            />
            {!context.isRemoveMember &&
            formik.touched.mobile &&
            formik.errors.mobile ? (
              <div className="addbook-error">{formik.errors.mobile}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              name="address"
              type="text"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
              isInvalid={
                !context.isRemoveMember &&
                formik.touched.address &&
                formik.errors.address
              }
            />
            {!context.isRemoveMember &&
            formik.touched.address &&
            formik.errors.address ? (
              <div className="addbook-error">{formik.errors.address}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <div className="modal-btn">
            <Button
              className="addbook-add-btn"
              type="submit"
              onClick={() => {
                if (
                  removeValue != "Select Member to Remove" &&
                  removeValue != "" &&
                  context.isRemoveMember
                ) {
                  setLoading(true);
                  notifyremoved();
                  setTimeout(() => {
                    nav("/settings");
                    setLoading(false);
                    let deletingbook = context.filteredMemberData.filter(
                      (a) => a?.id !== removeFilter[0].id
                    );
                    context.setMemberData(deletingbook);
                    context.setFilteredMemberData(context.memberData);
                  }, 2000);
                }
                if (!context.isRemoveMember) {
                  console.log("im 12121212121");
                  context.setMemberData([
                    ...context.memberData,
                    { ...formik.values, id: uuidv4() },
                  ]);

                  setLoading(true);

                  if (!context.isRemoveMember) {
                    notify();
                    setTimeout(() => {
                      nav("/settings");
                      setLoading(false);
                    }, 2000);
                  }
                }
              }}
            >
              {!loading ? (
                context.isRemoveMember ? (
                  "Remove"
                ) : (
                  "Add"
                )
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </Button>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
