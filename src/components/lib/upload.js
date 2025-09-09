export const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "ml_default"); // replace with your preset
  data.append("cloud_name", "dzye00uul"); // replace with your Cloudinary cloud name

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dzye00uul/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();

    if (json.secure_url) {
      return json.secure_url; // return hosted image URL
    } else {
      throw new Error("Upload failed: " + JSON.stringify(json));
    }
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};
