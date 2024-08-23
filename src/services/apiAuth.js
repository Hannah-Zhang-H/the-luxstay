import supabase from "./supabase";

// ====================================================== signup(data) ==========================================
export async function signup({ fullName, email, password }) {
  // The other data need to be written in optoins obj
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avator: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

// ============================================================ login ==========================================
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

// ====================================================== getCurrentUser ==========================================
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  // This means that there is currently no user logged in, so the function returns null directly
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

// ====================================================== logout ==========================================
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
