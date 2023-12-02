

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('loadingPopup').style.display = 'flex';
    setTimeout(function () {
        e.target.submit();
    }, 2000);
});

document.addEventListener("DOMContentLoaded", function(){
    if (messages) {
        for (message in messages)
            if("{{ message.tags }}" == "error"){
                document.getElementById('errorText').innerText = "{{ message }}";
                document.getElementById('errorPopup').style.display = 'flex';
                setTimeout(function () {
                    document.getElementById('errorPopup').style.display = 'none';
                }, 2000);
            }
        { endfor }
    { endif }
        }
});
