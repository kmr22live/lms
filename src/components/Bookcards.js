import { useEffect, useState, useContext } from "react";
import Context from "./context/Context";
import { useNavigate, Link } from "react-router-dom";

export default function Bookscards() {
  const context = useContext(Context);
  const nav = useNavigate();
  const [inputData, setInputData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [gridswitch, setGridswitch] = useState("active");
  const [projectswitch, setProjectswitch] = useState("jsListView");
  useEffect(() => {
    const onPageLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  return (
    <>
      <div className="projects-section">
        <div className="projects-section-line">
          <div className="search-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              value={inputData}
              onChange={handleChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-search"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
          <div className="view-actions">
            <button
              className={`view-btn grid-view ${gridswitch}`}
              id="grid-view"
              title="Grid View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-grid"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`project-boxes row ${projectswitch}`}
          id="project-boxes"
        >
          {!isLoaded
            ? Array(10)
                .fill("")
                .map((e, index) => (
                  <div
                    className="project-box-wrapper col-sm-6 col-md-4 col-lg-4 col-xl-3"
                    key={index + 5000}
                  >
                    <div className="project-box">
                      <div className=" card shimmerBG"></div>
                    </div>
                    <div className="bookbtn ">
                      <button className=" book_btn shimmerBG">Issue</button>
                    </div>
                  </div>
                ))
            : context.filteredbookListData
                .filter((a) =>
                  a?.title?.toLowerCase().includes(inputData.toLowerCase())
                )
                .map((b) => {
                  return (
                    <div
                      className="project-box-wrapper col-sm-6 col-md-4 col-lg-4 col-xl-3"
                      key={b.id}
                    >
                      <div className="project-box">
                        <div className="card">
                          <img src={b.thumbnailUrl} alt="" />
                          <div className="descriptions">
                            <h1>{b.title}</h1>
                            <p>
                              {b.shortDescription
                                ? b.shortDescription
                                : "Description Not available"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bookbtn">
                        <button
                          className=" book_btn"
                          id={b.id}
                          onClick={(e) => nav("/bookissue/" + e.target.id)}
                        >
                          Issue
                        </button>
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>
    </>
  );
}
