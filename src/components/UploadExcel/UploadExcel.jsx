import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ExcelUpload() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [formData, setFormData] = useState(new FormData());

    const onDrop = React.useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const newFormData = new FormData();
            newFormData.append('file', file);
            setFormData(newFormData);
        });
    }, []);

    const onSubmit = () => {
        const url = `http://localhost:8000/upload/${year}/${month}`; // replace with the actual URL of your FastAPI server

        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="main">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="text-input">Drop some files here, or click to select files</p>
            </div>
            <input className="text-input" type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
            <input className="text-input" type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
            <button className="myButton" onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default ExcelUpload;