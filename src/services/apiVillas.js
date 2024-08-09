import supabase from "./supabase";

export async function getVillas() {
  const { data, error } = await supabase.from("villas").select("*");

  if (error) {
    console.error(error);
    throw new Error("villas cound not be loaded");
  }

  return data;
}
