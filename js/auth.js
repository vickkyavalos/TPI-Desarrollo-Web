export async function login(usuario, contrasena) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usuario,
        password: contrasena,
      }),
      
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
     
      console.log("Login correcto");
      return data;
    } else {
      console.error("Login fallido");
      return false;
    }
  } catch (error) {
    console.error("Error en el login:", error);
    return false;
  }
}

export async function obtenerUsuario(token) {
  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.json();
    console.log("Usuario recibido:", user);
    sessionStorage.setItem("userData", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}


