'use client';
import { useEffect, useState } from 'react';
import { CldUploadWidget } from "next-cloudinary";
import {Button } from "@/components/ui/button";

const  UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const onUpload = (result:any) => {
    setImageUrl(result.info.secure_url);
  };
  return (
    <div className= "mt-4">
      <CldUploadWidget
        uploadPreset="va56608s"
        onUpload={onUpload}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
            type="button" 
            // disabled={disabled} 
            variant="destructive" 
            onClick={onClick}
          >
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded Content" />
          <p className ="p-4">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}

export default UploadImage;