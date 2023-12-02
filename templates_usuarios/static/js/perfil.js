// Função para ativar a edição do perfil
function enableEditing() {
    var fields = [
      'full-name', 'email', 'phone', 'course', 'bio-text',
      'linkedin-url', 'github-url', 'instagram-url', 'profile-picture-input'
    ];
    fields.forEach(function(field) {
      document.getElementById(field).disabled = false;
    });
    document.getElementById('save-button').disabled = false;
    document.getElementById('profile-picture-input').disabled = false;
  }
  
  // Função para obter o CSRF token
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  // Esperar pelo carregamento completo do DOM
  document.addEventListener("DOMContentLoaded", function() {
    
    // Função para disparar o upload de arquivo ao clicar na imagem do perfil
    function triggerFileUpload() {
      document.getElementById('profile-picture-input').click();
    }
  
    // Selecionar a imagem do perfil e adicionar evento de clique
    var profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
      profilePicture.addEventListener('click', triggerFileUpload);
    }
  
    // Adicionar evento de clique para o botão de salvar
    var saveButton = document.getElementById('save-button');
    if (saveButton) {
      saveButton.addEventListener('click', function() {
        var formData = new FormData(document.getElementById('profile-form'));
        // Adicionar os outros campos ao formData
        formData.append('full_name', document.getElementById('full-name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('course', document.getElementById('course').value);
        formData.append('bio', document.getElementById('bio-text').value);
        formData.append('linkedin_url', document.getElementById('linkedin-url').value);
        formData.append('github_url', document.getElementById('github-url').value);
        formData.append('instagram_url', document.getElementById('instagram-url').value);
  
        // Fazer a requisição fetch para o endpoint de perfil
        fetch('/auth/perfil/', {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRFToken': getCookie('csrftoken')  // CSRF token
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // ou response.text() se a resposta for texto
        })
        .then(data => {
          alert("Informações salvas com sucesso!");
          // Desabilitar campos e botão salvar após salvar
          fields.forEach(function(field) {
            document.getElementById(field).disabled = true;
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  
    // Evento de submissão do formulário
    var profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        // Aqui você pode chamar a função para salvar os dados ou outra lógica
        saveButton.click();  // Se você quer acionar o clique do botão de salvar
      });
    }
  });
  