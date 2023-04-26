import { Link } from "react-router-dom";
import "../assets/settings.css";
import { useContext } from "react";
import Context from "./context/Context";
import { ToastContainer, toast } from "react-toastify";

export default function Settings() {
  const context = useContext(Context);
  const notify = () =>
    toast.info("Reports.... coiming soon!", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <>
      <div className="projects-section settings-page">
        <div className="ag-format-container">
          <div className="ag-courses_box">
            <div className="ag-courses_item">
              <Link to={"/viewmembers"} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <i className="fa-solid fa-people-roof settings_logo ag-courses-item_title"></i>

                <div className="ag-courses-item_title">View Members</div>
              </Link>
            </div>
            <div className="ag-courses_item">
              <Link
                to={"/addmembers"}
                onClick={() => context.setIsRemoveMember(false)}
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg"></div>

                <i className=" fa-solid fa-person-circle-plus settings_logo ag-courses-item_title"></i>

                <div className="ag-courses-item_title">Add Member</div>
              </Link>
            </div>
            <div className="ag-courses_item">
              <Link
                to={"/removemembers"}
                onClick={() => context.setIsRemoveMember(true)}
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg"></div>

                <i className="fa-solid fa-person-circle-minus settings_logo ag-courses-item_title"></i>

                <div className="ag-courses-item_title">Remove Member</div>
              </Link>
            </div>
            <div className="ag-courses_item">
              <Link
                to={"/addbook"}
                onClick={() => context.setIsRemove(false)}
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg"></div>

                <i className="fa-solid fa-book-medical settings_logo ag-courses-item_title"></i>

                <div className="ag-courses-item_title">Add Book</div>
              </Link>
            </div>
            <div className="ag-courses_item">
              <Link
                to={"/removebook"}
                onClick={() => context.setIsRemove(true)}
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg"></div>

                <i className="fa-solid fa-book settings_logo ag-courses-item_title"></i>

                <div className="ag-courses-item_title">Remove Book</div>
              </Link>
            </div>
            <div className="ag-courses_item" onClick={() => notify()}>
              <a className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <i className="fa-solid fa-print settings_logo ag-courses-item_title"></i>

                <div className="ag-courses-item_title">Reports</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
