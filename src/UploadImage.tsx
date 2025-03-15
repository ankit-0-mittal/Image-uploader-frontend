import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA5wJu7jZXmw1IDbp4G-Ke_MN63rgUxr1Y",
  authDomain: "image-uploader-51f18.firebaseapp.com",
  projectId: "image-uploader-51f18",
  storageBucket: "image-uploader-51f18.firebasestorage.app",
  messagingSenderId: "1054659636508",
  appId: "1:1054659636508:web:27dbd1da3eed7f876d9ed9",
  measurementId: "G-BVT1YM9WNM"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files![0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);

        const storageRef = ref(storage, `uploads/${selectedFile.name}`);
        try {
            await uploadBytes(storageRef, selectedFile);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload Image</h2>
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadImage;
