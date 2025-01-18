"use client";

export default async function createGoogleUser(session) {
  try {
    const res = await fetch("/api/auth/google_register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        password: "undefined",
        googleUserId: session.user.id,
        googleProfileImage: session.user.image,
      }),
    });
  } catch (error) {}
}
