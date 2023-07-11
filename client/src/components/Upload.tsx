import React, { useState } from "react";
import axios from "axios";

const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFileName, setSelectedFilename] = useState<string>("");
  const [ defFileName, setdefFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setdefFileName(selectedFile?.name||"")
    setFile(selectedFile);
    setSelectedFilename(selectedFile?.name || "");
    };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilename(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || fileName === "") {
      setErrorMessage("Please select a file and enter a folder name");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", fileName);
    formData.append("fileName", selectedFileName);
    formData.append("orgfileName", defFileName);


    try {
      console.log(defFileName)
      await axios.post("http://localhost:1403/files", formData);
      console.log("File uploaded successfully");
    } catch (error) {
      console.log("420 error occurred while uploading the file:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="multiple_files"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required // added required attribute
        />

        <label className="block mt-2 mb -2 text-sm font-medium text-gray-900 dark:text-white">
          Set File Name:
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="text"
          defaultValue={selectedFileName}
          onChange={handleFileNameChange}
          required // added required attribute
        />
        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select folder
        </label>
        <input
          type="text"
          placeholder="Enter or choose folder name"
          value={fileName}
          onChange={handleNameChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required // added required attribute
        />
        <button
          type="submit"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UploadFileForm;
