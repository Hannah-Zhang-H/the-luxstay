import supabase, { supabaseUrl } from "./supabase";

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

// ====================================================== updateCurrentUser() ==========================================

/*
This function is used to update the user's password or full name, and if the user uploads a new avatar,
it will save the avatar file to Supabase's storage and update the URL of the user's avatar.
This function is asynchronous, so it can handle time-consuming operations (such as network requests) without blocking program execution.
*/
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
