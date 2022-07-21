$(document).ready( function(){
    CarregarCategorias();

    $('#ddlCAT').change(function() {
        var idcat = $('#ddlCAT option:selected').val();
        CarregarSubcategorias(idcat);
    });

    $('#ddlSUB').change(function() {
        var idsub = $('#ddlSUB option:selected').val();
        CarregarProdutos(idsub);
    });

});

function CarregarCategorias() {
    var urlServico = 'https://localhost:7281/api/Categoria';
    $.get(urlServico, function (retorno, status) {
        var keys = Object.keys(retorno);
        if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else {
            for (var i = 0; i < retorno.length; i++) {
                var categoria = retorno[i];
                var id = categoria.codigo;
                var descricao = categoria.descricao;
                var opcao = '<option value="' + id + '">' + descricao + '</option>';
                $('#ddlCAT').append(opcao);
            }
        }
    });
}

function CarregarSubcategorias(idcat) {
    var urlServico = 'https://localhost:7281/api/Subcategoria/PorCategoria/' + idcat;
    $.get(urlServico, function (retorno, status) {
        var keys = Object.keys(retorno);
        if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else{
            for (var i = 0; i <retorno.length; i++){
                var subcategoria = retorno[i];
                var idSubcategoria = subcategoria.idSubcategoria;
                var descricao = subcategoria.descricaoSubcategoria;
                var opcao = '<option value="' + idSubcategoria+ '">' + descricao + '</option>';
                $('#ddlSUB').append(opcao);
            }
        }
    });
}
function CarregarProdutos(idsub) {
    var urlServico = 'https://localhost:7281/api/Produto/PorSubcategoria/' + idsub;
    $.get(urlServico, function (retorno, status) {
        var keys = Object.keys(retorno);
        if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
        }
        else{
            for (var i = 0; i <retorno.length; i++){
                var  produto = retorno[i];
                var idProduto = produto.idSubcategoria;
                var idSubcategoria = produto.descricaoSubcategoria;
                var idCategoria = produto.idCategoria;
                var Descricao = produto.descricaoProduto;
                

                var linhaINI = "<tr>";
                var colunaCODIGO = "<td>" + idProduto + "</td>";   
                var colunaSUB = "<td>" + idSubcategoria + "</td>";
                var colunaCAT = "<td>" + idCategoria + "</td>"; 
                var colunaDESCRICAO = "<td>" + descricaoProduto + "</td>";
                var linhaFIM = "</tr>";

                var linha = linhaINI + colunaCODIGO + colunaSUB + colunaCAT  +colunaDESCRICAO  + linhaFIM;

                $("#tblPRO tbody").append(linha);
            }
        }
    });    
}