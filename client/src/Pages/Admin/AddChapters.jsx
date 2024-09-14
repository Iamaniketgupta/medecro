import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/axiosConfig";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";

const AddChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [newChapter, setNewChapter] = useState({ title: "", content: "" });
  const [branchFields, setBranchFields] = useState({});
  const [selectedChapter, setSelectedChapter] = useState("");
  const [condition, setCondition] = useState("");
  const { storyId } = useParams();
  const [mainChapter, setmainChapter] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance(
          `/chapter/getChaptersByStoryId/${storyId}`
        );
        if (response.data) {
          setChapters(response.data.data);
        } else {
          setChapters([]);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChapters();
  }, [storyId]);

  const handleAddChapter = () => {
    setIsAddChapterModalOpen(true);
  };

  const handleAddChapterSubmit = async () => {
    try {
      await axiosInstance.post("/chapter/create", {
        ...newChapter,
        branches: branchFields,
        story: storyId,
      });
      toast.success("Chapter added successfully");
      setIsAddChapterModalOpen(false);
      setBranchFields({}); // Reset fields after submission
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast.error("Error while adding chapter");
    }
  };

  const handleAddBranch = () => {
    setIsAddBranchModalOpen(true);
  };

  const handleAddBranchSubmit = async () => {
    try {
      console.log({ condition, selectedChapter });
      const res = await axiosInstance.post("/branch/create", {
        fromChapter: mainChapter._id,
        toChapter: selectedChapter,
        condition,
      });
      if (res.data) {
        toast.success("Branch added successfully");
        setIsAddBranchModalOpen(false);
        setBranchFields({}); // Reset fields after submission
      }
    } catch (error) {
      console.log("error : ", error);
      toast.error("Error while adding branch");
    }
    if (condition && selectedChapter) {
      setBranchFields({
        ...branchFields,
        [condition]: selectedChapter,
      });
      setCondition(""); // Reset condition
      setSelectedChapter(""); // Reset chapter selection
      setIsAddBranchModalOpen(false);
    } else {
      toast.warning("Please provide a condition and select a chapter.");
    }
  };

  const handleFieldConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleFieldChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  const handleRemoveBranch = (conditionToRemove) => {
    const updatedBranches = { ...branchFields };
    delete updatedBranches[conditionToRemove];
    setBranchFields(updatedBranches);
  };

  return (
    <div className="relative p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {chapters.length === 0 ? (
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-gray-700 mb-6">
                Let’s Create a Chapter
              </h1>
              <button
                onClick={handleAddChapter}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
              >
                Add Chapter
              </button>
            </div>
          ) : (
            <>
              <div className="absolute top-6 right-6">
                <button
                  onClick={handleAddChapter}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Add Chapter
                </button>
              </div>
              <div className="mt-12 w-full">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                  Chapters
                </h2>
                <div className="grid w-full gap-4">
                  {chapters.map((chapter, idx) => (
                    <div
                      key={idx}
                      className="bg-white  p-6 shadow rounded-lg w-full sm:w-80 md:w-96 h-30 md:h-30 overflow-hidden relative"
                    >
                      <h3 className="text-lg w-full font-semibold mb-2 truncate">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-600 h-30 md:h-30 overflow-auto">
                        <div
                          dangerouslySetInnerHTML={{ __html: chapter.content }}
                        />
                      </p>
                      <button
                        onClick={() => {
                          setmainChapter(chapter); // Set the chapter to be used in the modal
                          setIsAddBranchModalOpen(true); // Open the modal
                        }}
                        className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                      >
                        Add Branch
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Add Chapter Modal */}
      {isAddChapterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Add New Chapter</h2>
            <input
              type="text"
              placeholder="Chapter Title"
              value={newChapter.title}
              onChange={(e) =>
                setNewChapter({ ...newChapter, title: e.target.value })
              }
              className="border p-3 w-full mb-4"
            />
            <div className="border p-3 w-full mb-4 h-[50vh] overflow-auto">
              <Editor
                apiKey="tj6awn6og8fco9e66juefrt64i72er37517bnb8nscp0o70t" // Replace with your TinyMCE API key
                value={newChapter.content}
                onEditorChange={(content) =>
                  setNewChapter({ ...newChapter, content })
                }
                init={{
                  height: 500,
                  menubar: false,
                  plugins: "link image code",
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddChapterSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsAddChapterModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Branch Modal */}
      {isAddBranchModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Add Branch</h2>
            <input
              type="text"
              placeholder="Condition"
              value={condition}
              onChange={handleFieldConditionChange}
              className="border p-3 w-full mb-4"
            />
            <select
              value={selectedChapter}
              onChange={handleFieldChapterChange}
              className="border p-3 w-full mb-4"
            >
              <option value="">Select Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter._id} value={chapter._id}>
                  {chapter.title}
                </option>
              ))}
            </select>
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAddBranchSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
              >
                Add Branch
              </button>
              <button
                onClick={() => setIsAddBranchModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Branches</h3>
              {Object.keys(branchFields).length === 0 ? (
                <p>No branches added yet.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {Object.entries(branchFields).map(([cond, id], index) => (
                    <li key={index} className="mb-2">
                      <span>Condition: {cond}</span>
                      <span> | Chapter ID: {id}</span>
                      <button
                        onClick={() => handleRemoveBranch(cond)}
                        className="text-red-500 ml-4"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddChapters;
