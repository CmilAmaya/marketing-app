import { File, Check, X } from "lucide-react";
import { useState } from "react";
import '../styles/upload.css';

function Upload() {
  const [fileModal, setFileModal] = useState(false);
  const [file, setFile] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
      setFileModal(true);
    };
    reader.readAsText(file);
  };

  const processFile = () => {
    setLoading(true);
    console.log(fileContent);
    setFileModal(false);
    setFileContent("");
  }

  const closeModal = () => {
    setFileModal(false);
    setFileContent("");
  };

  return (
    <>
      <div className='upload-container'>
        <File size={90} className='icon-upload' />
        <h1 className='title-upload'>Click on the button or drag the .CSV file</h1>
        <label className="button-upload">
          {loading ? (
              <>
                Uploading file <span className="spinner" />
              </>
            ) : (
              'Upload file'
            )}
          <input
            type="file"
            accept=".csv"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {fileModal && (
        <div className='file-modal'>
          <div className="modal-content">
              <h2 className="modal-text">Do you want to process the file {file.name}?</h2>
              <div className='buttons-group'>
                <button onClick={processFile} className="process-file"><Check/></button>
                <button onClick={closeModal} className="close-modal"><X/></button>
              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Upload