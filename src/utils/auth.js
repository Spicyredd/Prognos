// // src/utils/auth.js

// export const isAuthenticated = () => {
//     return !!localStorage.getItem("token");
//   };
  
//   export const saveToken = (token) => {
//     localStorage.setItem("token", token);
//   };
  
//   export const logout = () => {
//     localStorage.removeItem("token");
//   };
  
//   export const getToken = () => {
//     return localStorage.getItem("token");
//   };
  

// Demo
// utils/auth.js

export function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  export function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  
  export function logoutUser() {
    localStorage.removeItem("user");
  }
  
  // src/utils/auth.js

export function isAuthenticated() {
    return !!localStorage.getItem("user");
  }
  