async function handleLogin(event){
    event.preventDefault();


    const LoginForm = event.target;

    const username = LoginForm.username.value;

    const password = LoginForm.password.value;

    const loginDate ={
        username,password
    }

    try {
        const response = await fetch('/index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
    if(response.ok){
        window.location.href = 'login.html';
    }else{
      const errorMessage = await response.json();
    }
    

} catch (e) {
    console.error('login fail',e);
    alert('login fail, please check again' );
  }


}

document.getElementById('loginForm').addEventListener('submit', handleLogin);
