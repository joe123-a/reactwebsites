import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { nanoid } from "nanoid";

const Hero = () => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prevImages) => [
      ...prevImages,
      ...imageFiles.map((file) => ({ id: nanoid(), file })),
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleUpload = () => {
    setUploading(true);
    const progress = {};
    images.forEach((image) => {
      progress[image.id] = 0;
      // Simulate upload progress
      const interval = setInterval(() => {
        if (progress[image.id] < 100) {
          progress[image.id] += 10;
          setUploadProgress({ ...progress });
        } else {
          clearInterval(interval);
          if (Object.values(progress).every((val) => val === 100)) {
            setUploading(false);
            setMessage("Upload successful!");
          }
        }
      }, 500);
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border-4 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500 text-center py-40">
          Drag drop some files here, or click to select files
        </p>
      </div>
      <button
        onClick={handleUpload}
        className={`mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg transition duration-300 ${
          uploading && "opacity-50 cursor-not-allowed"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
      <div className="mt-6">
        {images.length > 0 && (
          <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">White Blood Count</th>
                <th className="py-3 px-6">Parasite Count</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Progress</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, index) => (
                <tr key={image.id} className="border-b border-gray-200">
                  <td className="py-4 px-6">{image.file.name}</td>
                  <td className="py-4 px-6">-</td>
                  <td className="py-4 px-6">-</td>
                  <td className="py-4 px-6">
                    <img
                      src={URL.createObjectURL(image.file)}
                      alt={image.file.name}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      onClick={() =>
                        window.open(URL.createObjectURL(image.file))
                      }
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full text-xs text-center text-white rounded-full"
                        style={{ width: `${uploadProgress[image.id] || 0}%` }}
                      >
                        {uploadProgress[image.id] || 0}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {message && <div className="mt-6 text-green-500">{message}</div>}
    </div>
  );
};

export default Hero;
