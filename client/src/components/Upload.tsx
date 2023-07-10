import { useDropzone } from "react-dropzone";

function Upload() {

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {

            const data = {
                name: "hello from client",
                // file: acceptedFiles[0].name
            }
            try {
                // console.log(data.file)
                const response = await fetch("http://localhost:1403/files", {
                    method: "POST",
                    body: data,
                });

                if (response.ok) {
                    console.log("Files uploaded successfully!");
                    console.log(response)
                    // Handle success
                } else {
                    console.error("Failed to upload files");
                    console.log(response)

                    // Handle error
                }
            } catch (error) {
                console.error("Error occurred while uploading files", error);
                // Handle error
            }
        }
        ,
        accept: {
            'pdf/file': ['.pdf']
        }
    });

    return (
        <div className="flex items-center justify-center w-full mt-20">
            <div className="flex items-center justify-center w-4/5" {...getRootProps()}>
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and
                            drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <div id="dropzone-file" className="hidden" {...getInputProps()} />
                </label>
            </div>
        </div>
    );
}

export default Upload;
