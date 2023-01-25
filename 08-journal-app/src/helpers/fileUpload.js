const cloudId = 'dnfs4zxek';
const presetName = 'curso-react-journal';

export const fileUpload = async (file) => {
  if (!file) {
    throw new Error(`Not file attached`);
  }

  const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudId}/upload`;
  const formData = new FormData();
  formData.append('upload_preset', presetName);
  formData.append('file', file);

  try {
    const response = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error("The image couldn't be uploaded");
    }
    
    const cloudResponse = await response.json();
    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
