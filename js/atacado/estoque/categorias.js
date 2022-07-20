$(document).ready(function(){
    CarregarCategorias();
});             

function CarregarCategorias() {
    var urlServico = 'https://localhost:7281/api/Categoria';
    $.get(urlServico, function (retorno, status) {
        if (retorno.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else {
            for (var i = 0; i < retorno.length; i++) {
                var categoria = retorno[i];
                var id = categoria.codigo;
                var descricao = categoria.descricao;

                var linhaINI = "<tr>";
                var colunaID = "<td>" + id + "</td>";
                var colunaDescricao = "<td>" + descricao + "</td>";
                var linhaFIM = "</tr>";

                var linha = linhaINI + colunaID + colunaDescricao + linhaFIM;

                $("#tblCategorias tbody").append(linha);
            }
        }
    });
}