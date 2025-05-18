import { RefreshCcw, Download, Trash } from 'lucide-react'
import { useRef } from 'react';
import '../styles/database.css'

function Database(){
    const files = [
        {filename: "report_file_28042025_02052025_meta.csv", uploadedby: "Carlos Arevalo", uploadedon: "11.04.2025 10:00:00"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},
        {filename: "report_file_28042025_02052025_google.csv", uploadedby: "Ivan Ivanov", uploadedon: "12.04.2025 20:20:02"},

    ]
    const containerRef = useRef(null);

    const handleScroll = (e) => {
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    };

    return(
        <>
            <div className="manage-database-container">
                <h2 className="title-database">Last files uploaded</h2>
            </div>
            <div className="scrollable-content" onScroll={handleScroll} ref={containerRef}>
                {files.map((item)=>{
                    return(
                        <div className="database-container">
                            <div className="name-role-database-container">
                                <h4>{item.filename}</h4>
                                <h5>Uploaded by: {item.uploadedby}</h5>
                                <h5>Uploaded on: {item.uploadedon}</h5>
                            </div>
                            <div className="database-actions">
                                <button className="reprocess-database-button"><RefreshCcw size={15} />Reprocess File</button>
                                <button className="download-database-button"><Download size={15} />Download File</button>
                                <button className="delete-database-button"><Trash size={15}/>Delete File</button>
                            </div>
                            <hr className="line-users" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Database