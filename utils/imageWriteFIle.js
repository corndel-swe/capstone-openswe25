import fs from "fs";
import path from "path";
const imageWriteFile = (imageURL) => {
    const base64Data = imageURL.split(";base64,").pop();


    const filename = `${Date.now()}.png`;
    const filePath = path.join("public", "uploads", filename);


    fs.writeFileSync(filePath, base64Data, { encoding: "base64" });


    return `/uploads/${filename}`;
}
export default imageWriteFile