import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file: File): Promise<string> {

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
        folder: "events",
        resource_type: "image"
    });

    return result.secure_url;
}