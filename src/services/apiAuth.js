import supabase from "./supabase";

// ============================== login ==============================
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

// ============================== getCurrentUser ==============================
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  // This means that there is currently no user logged in, so the function returns null directly
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}
