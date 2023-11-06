import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NoteContext from "./NoteContext";

const Store = (props) => {
  const [notes, setNotes] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("tokenNotebook")) {
      getMyNotes();
      loggedUser();
    }
    // eslint-disable-next-line
  }, []);

  //success msg alert
  const successAlert = (success) => {
    toast.success(success, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      className: "toast--message",
    });
  };

  //error alert
  const errorAlert = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      className: "toast--message",
    });
  };

  //fetch notes from mongodb;
  const getMyNotes = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("tokenNotebook")),
          },
        }
      );
      const data = await response.json();
      if (data.notes) {
        setNotes(data.notes);
      } else {
        errorAlert(data.msg);
      }
    } catch (error) {
      const data = "server error!";
      errorAlert(data);
    }
  };

  //add notes in database
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch("http://localhost:4000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("tokenNotebook")),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const data = await response.json();
      if (data.success) {
        setNotes(notes.concat(data.savedNote));
        successAlert(data.success);
      } else {
        errorAlert(data.msg);
      }
    } catch (error) {
      const data = "server error!";
      errorAlert(data);
    }
  };

  // delete notes from database!
  const deleteNote = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/notes/deletenote/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("tokenNotebook")),
          },
        }
      );
      let result = await response.json();
      if (result.success) {
        const newNotes = notes.filter((note) => {
          return note._id !== id;
        });
        setNotes(newNotes);
        successAlert(result.success);
      } else {
        errorAlert(result.msg);
      }
    } catch (error) {
      const data = "server error!";
      errorAlert(data);
    }
  };

  // edit note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/notes/updatenote/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("tokenNotebook")),
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );
      const data = await response.json();
      if (data.success) {
        getMyNotes();
        successAlert(data.success);
      } else {
        errorAlert(data.msg);
      }
    } catch (error) {
      const data = "server error!";
      errorAlert(data);
    }
  };

  // get logged in user details
  const loggedUser = async () => {
    const response = await fetch("http://localhost:4000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("tokenNotebook")),
      },
    });
    const data = await response.json();

    if (data.success) {
      setUserDetails(data.user);
    } else {
      console.log(data.msg);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getMyNotes,
        deleteNote,
        addNote,
        editNote,
        loggedUser,
        userDetails,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default Store;
