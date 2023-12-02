

function validateForm() {
    var username = document.getElementById("id_username").value;
    var password1 = document.getElementById("id_password1").value;
    var password2 = document.getElementById("id_password2").value;
    
    var usernameError = document.getElementById("usernameError");
    var passwordError = document.getElementById("passwordError");
    var passwordConfirmError = document.getElementById("passwordConfirmError");
    
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";
    passwordConfirmError.innerHTML = "";

    var isValid = true;

    if(username.length < 4) {
        usernameError.innerHTML = "O nome de usuário deve ter pelo menos 4 caracteres.";
        isValid = false;
    }

    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password1.match(passwordRegex)) {
        passwordError.innerHTML = "A senha deve ter pelo menos 8 caracteres, incluindo números e letras.";
        isValid = false;
    }

    if(password1 !== password2) {
        passwordConfirmError.innerHTML = "As senhas não coincidem.";
        isValid = false;
    }

    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    if (messages){
        for (message in messages)
            var messageText = "{{ message }}";
            var messageType = "{{ message.tags }}"; // Adicionando tags das mensagens
            document.getElementById('popupMessage').innerText = messageText;
            var popup = document.getElementById('errorPopup');
            popup.style.display = 'flex';
            setTimeout(function(){
                popup.style.display = 'none';
                
                // Redirecionando se a mensagem for de sucesso
                if (messageType == "success") { // Checando pela tag da mensagem
                    window.location.href = "{% url 'login' %}";
                }
            }, 2000);
        { endfor }
    { endif }
        }
});
