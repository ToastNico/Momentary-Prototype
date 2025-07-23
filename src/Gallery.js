import React, { useEffect, useState } from "react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage, auth } from "./firebase";

function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!auth.currentUser) return;

      const userId = auth.currentUser.uid;
      const folderRef = ref(storage, `photos/${userId}`);

      try {
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setPhotos(urls.reverse()); // latest photo first
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📁 My Photos</h2>
      {photos.length === 0 ? (
        <p>No photos yet.</p>
      ) : (
        photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Photo ${index}`}
            width="300"
            style={{ margin: "10px" }}
          />
        ))
      )}
    </div>
  );
}

export default Gallery;