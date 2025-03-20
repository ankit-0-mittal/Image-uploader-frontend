import React, { useState, useEffect } from 'react';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [files, setFiles] = useState<{ filename: string; url: string }[]>([]);

    useEffect(() => {
        // Fetch uploaded files when the component mounts
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://67f9-2405-201-6800-700e-3832-34ae-6085-3ccf.ngrok-free.app/images/list',{
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                const data = await response.json();
                if (response.ok) {
                    setFiles(data.images); // Assuming { images: [...] } from API
                } else {
                    console.error('Error fetching files:', data.message);
                }
            } catch (error) {
                console.error('Server error:', error);
            }
        };

        fetchFiles();
    }, []); // Runs only on mount

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile); // 🟢 Flask expects "file"

        try {
            const response = await fetch('https://67f9-2405-201-6800-700e-3832-34ae-6085-3ccf.ngrok-free.app/images/upload', {
                method: 'POST',
                body: formData,
                headers: { "ngrok-skip-browser-warning": "true" }
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'File uploaded successfully!');
                setFiles((prevFiles) => [...prevFiles, { filename: selectedFile.name, url: data.url }]);
            } else {
                alert(data.message || 'Error uploading file!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Server error! Please try again later.');
        }
    };

    // 🟢 Helper function to check file type
    const getFileType = (filename: string) => {
        const extension = filename.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
        if (['mp4', 'mov', 'avi', 'webm'].includes(extension || '')) return 'video';
        if (['pdf'].includes(extension || '')) return 'pdf';
        return 'other';
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Upload File</h2>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>

            <h3>Uploaded Files</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {files.map((file, index) => {
                    const fileType = getFileType(file.filename);
                    return (
                        <div key={index} style={{ textAlign: 'center' }}>
                            {fileType === 'image' ? (
                                <img src={file.url} alt={file.filename} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            ) : fileType === 'video' ? (
                                <video width="150" height="100" controls>
                                    <source src={file.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : fileType === 'pdf' ? (
                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    📄 View PDF
                                </a>
                            ) : (
                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    📁 Download File
                                </a>
                            )}
                            <p>{file.filename}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UploadImage;
