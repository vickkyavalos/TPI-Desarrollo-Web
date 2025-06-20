export async function loginAuth(usuario, contrasena) {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usuario, 
                password: contrasena,
            }),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login correcto');
            return data; 
        } else {
            console.error('Login fallido');
            return false;
        }
    } catch (error) {
        console.error('Error en el login:', error);
        return false;
    }
}


//access token y guardar en el localstorage
sessionStorage.setItem('accessToken', data.token);

fetch('https://dummyjson.com/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`, 
  }, 
  credentials: 'include' 
})
.then(res => res.json())
.then(console.log);

