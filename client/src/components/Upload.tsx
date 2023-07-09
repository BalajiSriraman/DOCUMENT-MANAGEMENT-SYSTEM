import React, { useState } from "react";
import axios from "axios";

const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || fileName === "") {
      setErrorMessage("Please select a file and enter a folder name");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", fileName);

    try {
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
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
        <button type="submit" >Upload</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UploadFileForm;
