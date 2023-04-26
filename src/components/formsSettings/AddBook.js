import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

export default function AddBook() {
  const context = useContext(Context);
  const nav = useNavigate();
  const [removeFilter, setRemoveFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const [removeValue, setRemoveValue] = useState("");

  const initialValues = {
    title: "",
    isbn: "",
    pageCount: "",
    thumbnailUrl: "",
    shortDescription: "",
    authors: "",
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
    context.setFilteredBookListData(context.bookListData);
  }, [context.bookListData]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      // console.log(values);
      context.setBookListData([
        ...context.bookListData,
        { ...values, id: uuidv4() },
      ]);
      // context.setFilteredBookListData(context.bookListData);
      setLoading(true);

      if (!context.isRemove) {
        notify();
        setTimeout(() => {
          nav("/settings");
          setLoading(false);
        }, 2000);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is Required";
      }
      if (!values.isbn) {
        errors.isbn = "ISBN is Required";
      }
      if (!values.pageCount) {
        errors.pageCount = "Page count is Required";
      }
      if (!values.shortDescription) {
        errors.shortDescription = "Short Description is Required";
      }
      if (!values.authors) {
        errors.authors = "Author is Required";
      }

      return errors;
    },
  });
  if (removeFilter.length > 0) {
    formik.values.isbn = removeFilter[0].isbn;
    formik.values.pageCount = removeFilter[0].pageCount;
    formik.values.thumbnailUrl = removeFilter[0].thumbnailUrl;
    formik.values.shortDescription = removeFilter[0].shortDescription;
    formik.values.authors = removeFilter[0]?.authors;
  }
  const optionChange = (e) => {
    setRemoveFilter(
      context.filteredbookListData.filter((a) => a?.id == e.target.value)
    );
  };

  return (
    <div className="projects-section addbookLine">
      <div className="projects-section-line ">
        <div className="projects-section-header">
          <p>{context.isRemove ? "Remove " : "Add "}Book</p>
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
                <Form.Label>Title</Form.Label>
                {context.isRemove ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setRemoveValue(e.target.value);
                      optionChange(e);
                    }}
                  >
                    <option defaultValue="Select Book">
                      Select Book to Remove
                    </option>
                    {context.filteredbookListData.map(({ title, id }) => {
                      return (
                        <option key={id} value={id}>
                          {title}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <Form.Control
                    required
                    name="title"
                    type="text"
                    placeholder="Enter Book Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                )}
                {!context.isRemove &&
                formik.touched.title &&
                formik.errors.title ? (
                  <div className="addbook-error">{formik.errors.title}</div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  required
                  name="isbn"
                  type="text"
                  placeholder="Enter ISBN"
                  onChange={formik.handleChange}
                  value={formik.values.isbn}
                  isInvalid={
                    !context.isRemove &&
                    formik.touched.isbn &&
                    formik.errors.isbn
                  }
                />
                {!context.isRemove &&
                formik.touched.isbn &&
                formik.errors.isbn ? (
                  <div className="addbook-error">{formik.errors.isbn}</div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Page Count</Form.Label>
                <Form.Control
                  required
                  name="pageCount"
                  type="tel"
                  placeholder="Page Count"
                  onChange={formik.handleChange}
                  value={formik.values.pageCount}
                  isInvalid={
                    !context.isRemove &&
                    formik.touched.pageCount &&
                    formik.errors.pageCount
                  }
                />
                {!context.isRemove &&
                formik.touched.pageCount &&
                formik.errors.pageCount ? (
                  <div className="addbook-error">{formik.errors.pageCount}</div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              name="authors"
              type="text"
              placeholder="Author"
              onChange={formik.handleChange}
              value={formik.values.authors}
              isInvalid={
                !context.isRemove &&
                formik.touched.authors &&
                formik.errors.authors
              }
            />
            {!context.isRemove &&
            formik.touched.authors &&
            formik.errors.authors ? (
              <div className="addbook-error">{formik.errors.authors}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Cover URL</Form.Label>
            <Form.Control
              required
              name="thumbnailUrl"
              type="text"
              placeholder="Cover URL"
              onChange={formik.handleChange}
              value={formik.values.thumbnailUrl}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              required
              name="shortDescription"
              type="text"
              placeholder="Short Description"
              onChange={formik.handleChange}
              value={formik.values.shortDescription}
              isInvalid={
                !context.isRemove &&
                formik.touched.shortDescription &&
                formik.errors.shortDescription
              }
            />
            {!context.isRemove &&
            formik.touched.shortDescription &&
            formik.errors.shortDescription ? (
              <div className="addbook-error">
                {formik.errors.shortDescription}
              </div>
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
                  removeValue != "Select Book to Remove" &&
                  removeValue != "" &&
                  context.isRemove
                ) {
                  setLoading(true);
                  notifyremoved();
                  setTimeout(() => {
                    nav("/settings");
                    setLoading(false);

                    let deletingbook = context.filteredbookListData.filter(
                      (a) => a?.id !== removeFilter[0].id
                    );
                    context.setBookListData(deletingbook);
                    context.setFilteredBookListData(context.bookListData);
                  }, 2000);
                }
              }}
              //
            >
              {!loading ? (
                context.isRemove ? (
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
