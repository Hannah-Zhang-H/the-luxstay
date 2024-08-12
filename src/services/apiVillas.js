import supabase, { supabaseUrl } from "./supabase";

// ================================== getVillas() ===================================
export async function getVillas() {
  const { data, error } = await supabase.from("villas").select("*");

  if (error) {
    console.error(error);
    throw new Error("villas could not be loaded");
  }
  return data;
}

// ================================== createOrEditVilla() ===================================
// Insertion or Update
export async function createOrEditVilla(newVilla, id) {
  // Check if the villa's images is uploaded
  const hasImagePath = newVilla.image?.startsWith?.(supabaseUrl);
  let imagePath = newVilla.image;

  // If the image is a file (not a string), it means the user uploaded a new image
  if (!hasImagePath) {
    const imageName = `${Math.random()}-${newVilla.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/villa-images/${imageName}`;

    // Upload the new image
    const { error: storageError } = await supabase.storage
      .from("villa-images")
      .upload(imageName, newVilla.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Villa image upload failed, no new villa created.");
    }
  }

  // Now create or update the villa
  let query = supabase.from("villas");

  // Create a new villa if no ID is provided
  if (!id) {
    query = query.insert([{ ...newVilla, image: imagePath }]);
  } else {
    // Update the existing villa
    query = query.update({ ...newVilla, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Villa could not be created/updated.");
  }

  return data;
}

// ================================== deleteVilla() ===================================
export async function deleteVilla(id) {
  const { error } = await supabase.from("villas").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Villa could not be deleted.");
  }
}
