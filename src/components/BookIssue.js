import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Context from "./context/Context";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function BookIssue() {
  const { id } = useParams();
  const context = useContext(Context);
  const nav = useNavigate();
  const [removeFilter, setRemoveFilter] = useState({});
  const [loadingissue, setLoadingissue] = useState(false);
  const [removeValue, setRemoveValue] = useState("");

  const [issuingBook, setIssuingBook] = useState({});

  const initialValues = {
    title: "",
    isbn: "",
    pageCount: "",
    thumbnailUrl: "",
    shortDescription: "",
    authors: "",
  };

  const notifyremoved = () =>
    toast.success("Successfully Issued !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    setIssuingBook(context.filteredbookListData.filter((a) => a?.id == id));
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {},
    validate: (values) => {
      const errors = {};
      return errors;
    },
  });

  const optionChange = (e) => {
    setRemoveFilter(
      context.filteredMemberData.filter((a) => a?.id == e.target.value)
    );
  };
  if (issuingBook.length > 0) {
    formik.values.title = issuingBook[0].title;
    formik.values.authors = issuingBook[0]?.authors;
  }

  return (
    <div className="projects-section addbookLine">
      <div className="projects-section-line ">
        <div className="projects-section-header">
          <p>Book Issue</p>
        </div>
        <div className="view-actions">
          <button
            onClick={() => nav("/bookcard")}
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
          <Form.Group>
            <Form.Label>Member</Form.Label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setRemoveValue(e.target.value);
                optionChange(e);
              }}
            >
              <option defaultValue="Select Book">
                Select Member to Issue Book
              </option>
              {context.filteredMemberData.map(({ name, id, mobile }) => {
                return (
                  <option key={id} value={id}>
                    {name}, ({mobile})
                  </option>
                );
              })}
            </select>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Book Title</Form.Label>

                <Form.Control
                  disabled
                  name="title"
                  type="text"
                  placeholder="Enter Book Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              disabled
              name="authors"
              type="text"
              placeholder="Author"
              onChange={formik.handleChange}
              value={formik.values.authors}
            />
          </Form.Group>

          <div className="modal-btn">
            <Button
              className="addbook-add-btn"
              type="submit"
              onClick={() => {
                if (
                  removeValue != "Select Member to Issue Book" &&
                  removeValue != ""
                ) {
                  setLoadingissue(true);
                  notifyremoved();
                  setTimeout(() => {
                    nav("/bookcard");
                    setLoadingissue(false);

                    removeFilter[0].books = issuingBook[0].title;

                    context.setMemberData(
                      context.memberData.map((el) =>
                        el.id === removeFilter[0].id
                          ? { ...el, books: issuingBook[0].title }
                          : el
                      )
                    );
                    context.setissuedBook(context.issuedBook + 1);
                  }, 3000);
                }
              }}
            >
              {!loadingissue ? (
                "Issue"
              ) : (
                <Spinner animation="border" size="sm" />
              )}
            </Button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
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
