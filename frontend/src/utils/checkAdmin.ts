export function isAdmin() {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  return user && role === "admin";
}
