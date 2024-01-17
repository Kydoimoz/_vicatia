// utils/imageUtils.js

import axios from 'axios'; // Install axios using npm or yarn

// Function to upload an image to the server
export const uploadImage = async (file) => {
    try {
        // Erstellen Sie ein FormData-Objekt
        const formData = new FormData();
        formData.append('image', file);

        // Senden Sie eine POST-Anfrage an Ihren Server oder eine andere geeignete Image-Upload-API
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Überprüfen Sie, ob die Anfrage erfolgreich war (Statuscode 200)
        if (!response.ok) {
            throw new Error('Fehler beim Hochladen des Bildes');
        }

        // Extrahieren Sie das Bild-URL aus der Serverantwort
        const imageData = await response.json();
        return imageData.url; // Der genaue Pfad oder die URL hängt von Ihrer Serverimplementierung ab
    } catch (error) {
        console.error('Fehler beim Hochladen des Bildes:', error);
        throw new Error('Fehler beim Hochladen des Bildes');
    }
};

// Function to convert image data to a format suitable for MongoDB
export const convertToMongoDBFormat = (imageDataUrl) => {
    // Depending on your needs, you may need to further process the image data
    // For simplicity, let's assume imageDataUrl is directly suitable for MongoDB
    return {
        imageUrl: imageDataUrl,
        uploadedAt: new Date(),
        // Add any other necessary metadata
    };
};