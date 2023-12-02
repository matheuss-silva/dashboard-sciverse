<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

$(document).ready(function() {
    $('#search').on('keyup', function() {
        var query = $(this).val().toLowerCase();
        $.ajax({
            url: "{% url 'lista_orientadores' %}",
            data: { 'search': query },
            dataType: 'json',
            success: function(data) {
                var tbody = $('#orientadoresTable tbody');
                tbody.empty();
                $.each(data, function(index, orientador) {
                    tbody.append(`<tr>
                        <td>${index + 1}</td>
                        <td>${orientador.nome_orientador}</td>
                        <td>${orientador.cursos_orientados}</td>
                        <td>${orientador.quantidade_orientacoes}</td>
                        <td><a href="#" class="perfil-btn">Perfil Institucional</a></td>
                    </tr>`);
                });
            }
        });
    });
});
