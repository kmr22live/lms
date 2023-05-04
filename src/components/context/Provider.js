import Context from "./Context";
import books from "../booksdata";
import { useState,useEffect } from "react";
import members from "../members/membersdata";

export default function Provider(props) {
  const [bookListData, setBookListData] = useState(books);
  const [filteredbookListData, setFilteredBookListData] =
    useState(bookListData);
  const [isRemove, setIsRemove] = useState(false);

  const [memberData, setMemberData] = useState(members);
  const [filteredMemberData, setFilteredMemberData] = useState(memberData);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const [issuedBook, setissuedBook] = useState(0);
   useEffect(() => {
    setFilteredBookListData(bookListData);
  }, [bookListData]);
  
  useEffect(() => {
    setFilteredMemberData(memberData);
  }, [memberData]);

  return (
    <Context.Provider
      value={{
        bookListData,
        setBookListData,
        filteredbookListData,
        setFilteredBookListData,
        isRemove,
        setIsRemove,
        memberData,
        setMemberData,
        filteredMemberData,
        setFilteredMemberData,
        isRemoveMember,
        setIsRemoveMember,
        issuedBook,
        setissuedBook,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
