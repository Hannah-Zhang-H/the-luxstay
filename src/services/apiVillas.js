// Import supabase instance and the supabaseUrl from the configuration file
import supabase, { supabaseUrl } from "./supabase";

// ================================== getVillas() ===================================
// Fetches all villas from the "villas" table
export async function getVillas() {
  // Query the database to select all columns from the "villas" table
  const { data, error } = await supabase.from("villas").select("*");

  // Handle any errors during the fetch
  if (error) {
    console.error(error);
    throw new Error("villas could not be loaded"); // Throw a custom error message
  }

  // Return the retrieved data (villas)
  return data;
}

// ================================== createOrEditVilla() ===================================
// Function to either create a new villa or edit an existing one
export async function createOrEditVilla(newVilla, id) {
  // Check if the image is already uploaded (i.e., the image path starts with supabaseUrl)
  const hasImagePath = newVilla.image?.startsWith?.(supabaseUrl);
  let imagePath = newVilla.image;

  // If the image is a file and not a pre-existing path, it indicates a new image upload
  if (!hasImagePath) {
    // Generate a random image name to avoid file path conflicts
    const imageName = `${Math.random()}-${newVilla.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/villa-images/${imageName}`;

    // Upload the new image to the Supabase storage bucket "villa-images"
    const { error: storageError } = await supabase.storage
      .from("villa-images")
      .upload(imageName, newVilla.image);

    // Handle any errors during image upload
    if (storageError) {
      console.error(storageError);
      throw new Error("Villa image upload failed, no new villa created.");
    }
  }

  // Prepare the query to either insert a new villa or update an existing one
  let query = supabase.from("villas");

  // Insert a new villa if no id is provided
  if (!id) {
    query = query.insert([{ ...newVilla, image: imagePath }]); // Insert new villa with the image path
  } else {
    // Update the existing villa if an id is provided
    query = query.update({ ...newVilla, image: imagePath }).eq("id", id); // Update existing villa with the new data and image path
  }

  // Execute the query and return the result (single row)
  const { data, error } = await query.select().single();

  // Handle any errors during the creation/update process
  if (error) {
    console.error(error);
    throw new Error("Villa could not be created/updated.");
  }

  // Return the newly created or updated villa data
  return data;
}

// ================================== deleteVilla() ===================================
// Function to delete a villa from the "villas" table by its id
export async function deleteVilla(id) {
  // Execute the deletion of the villa where id matches the provided value
  const { error } = await supabase.from("villas").delete().eq("id", id);

  // Handle any errors during the deletion
  if (error) {
    console.error(error);
    throw new Error("Villa could not be deleted.");
  }
}
