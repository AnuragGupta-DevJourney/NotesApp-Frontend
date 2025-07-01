import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import RateLimit from "../components/RateLimit";
import axios from "axios";
import { data, Link } from "react-router-dom";
import Loader from "../components/Loader";
import formateCreatedDate from "../util/formatCreatedDate";
import toast, { Toaster } from "react-hot-toast";
import axiosBaseURL from "../util/axiosBaseURL";
import NotesNotFound from "../components/NotesNotFound";

function HomePage() {
  const [isRateLimitExceed, setIsRateLimitExceed] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotesData = async () => {
    try {
      const response = await axiosBaseURL.get(`/notes`);
      const data = await response.data;
      setNotesData(data);
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      if (error.status === 429) {
        setIsRateLimitExceed(true);
        setIsLoading(false);
        setNotesData([]);
      } else {
        console.log("Error in fetching data", error.message);
      }
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  const handleDeleteNote = async (id) => {
    // console.log(id)
    try {
      const response = await axiosBaseURL.delete(`/notes/${id}`);
      // console.log("delet response",response)
      toast.success("Note Deleted Successfully", {
        position: "top-right",
        duration : 800
      });

      fetchNotesData();
    } catch (error) {
      console.log("failde to delete notes", error);
      toast.error("Failed to delete Note");
    }
  };

  return (
    <>
      <Navbar />

      {isRateLimitExceed && <RateLimit />}

      {isLoading && <Loader />}

      <div className="flex gap-4 m-4 justify-evenly flex-wrap items-center h-full ">
        {notesData.length === 0 && isRateLimitExceed === false ? (
          <NotesNotFound/>
        ) : (
          notesData.map((note) => {
            return (
              <div
                className="bg-[#181212] basis-80 grow h-fit rounded-md border-l-8 border-blue-500 text-white py-6 px-4"
                key={note._id}
              >
                <h2 className="text-2xl font-semibold capitalize font-poppins">
                  {" "}
                  {note.title}{" "}
                </h2>
                <p className="text-gray-300"> {note.description} </p>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    {/* <p>CreateadAt : May 13,2025</p> */}
                    <p className="text-sm text-gray-400">
                      {" "}
                      {formateCreatedDate(note.updatedAt)}{" "}
                    </p>
                  </div>
                  <div className="flex gap-1.5 items-center justify-center">
                    <Link
                      to={`/edit/${note._id}`}
                      className=" cursor-pointer text-2xl text-green-400"
                    >
                      <BiSolidEdit fontWeight={900} />
                    </Link>
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className=" cursor-pointer text-2xl text-red-500"
                    >
                      <RiDeleteBinFill fontWeight={900} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <Toaster />
      </div>
    </>
  );
}

export default HomePage;
