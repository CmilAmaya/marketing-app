import { File, Check, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFile } from "../hooks/useFile";
import { uploadFileApi } from "../api/api";
import '../styles/upload.css';

function Upload() {
  const { file, content, loading, error, handleFileChange, reset } = useFile();
  const [fileModal, setFileModal] = useState(false);

  // Mostrar modal cuando se carga un archivo
  const handleInputChange = (e) => {
    handleFileChange(e);
    setFileModal(true);
  };

  const processFile = async () => {
    if (!file) return;
    setFileModal(false);
    try {
      await uploadFileApi(file);
      reset();
      // Aquí podrías mostrar un toast de éxito
    } catch (err) {
      alert('Error uploading file');
      console.log(err);
    }
  };

  const closeModal = () => {
    setFileModal(false);
    reset();
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {fileModal && file && (
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