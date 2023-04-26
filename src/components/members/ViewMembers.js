import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default function ViewMembers() {
  const context = useContext(Context);
  const [inputData, setInputData] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleReturn = (e) => {

    context.setMemberData(
      context.memberData.map((el) =>
        el.id == e.target.value ? { ...el, books: "" } : el
      )
    );
    context.setissuedBook(context.issuedBook - 1);
  };

  useEffect(() => {
    context.setFilteredMemberData(context.memberData);
  }, [context.memberData]);

  return (
    <div className="projects-section">
      <div className="projects-section-line ">
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
        <div className="view-action tabletmembers">
          <button
            onClick={() => nav("/settings")}
            className="view-btn addbook-btn"
          >
            <i className="fa-solid fa-circle-arrow-left"></i>
          </button>
        </div>
      </div>
      <div className="addbook-form">
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
            {context.filteredMemberData
              .filter((a) =>
                a?.name?.toLowerCase().includes(inputData.toLowerCase())
              )
              .map((data, index) => {
                return (
                  <tr key={index + 1000}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.mobile}</td>
                    <td>{data.address}</td>
                    <td>
                      {data.books.length > 0 ? (
                        <div>
                          <div>{data.books}</div>
                          <div onClick={(e) => handleReturn(e)}>
                            <button
                              value={data.id}
                              className="book-assigned-btn"
                            >
                              Return
                            </button>
                          </div>
                        </div>
                      ) : (
                        "Nil"
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
