$(document).ready( function(){
    CarregarCategorias();

    $('#ddlCAT').change(function() {
        $('#tblPROT tbody').empty();
        var subid = $('#ddlCAT option:selected').val();
        CarregarSubcategoria(subid);
    });
    $('#ddlSUB').change(function() {
        var protid = $('#ddlSUB option:selected').val();
        CarregarProduto(protid);
    });
});
    
     function CarregarCategorias() {
        var urlServico = 'https://localhost:7281/api/Categoria';
        $.get(urlServico, function (retorno, status) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os dados.");
            }
            else {
               for (var i = 0; i <retorno.length; i++) {
                    var categoria = retorno[i];
                    var idCategoria = categoria.codigo;
                    var descricao = categoria.descricao;
                    var opcao = '<option value="' + idCategoria + '">'+ descricao +'</option>';
                        $('#ddlCAT').append(opcao);
                
                }
            }
        });
}

function CarregarSubcategoria(idsub) {
        var urlServico = 'https://localhost:7281/api/Subcategoria/PorCategoria/'+ idsub ;

        $.get(urlServico, function(retorno,status) {
            var keys = Object.keys(retorno);
            if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
            }
            else{
                for (var i = 0; i <retorno.length; i++){
                    var subcategoria = retorno[i];
                    var idSubcategoria = subcategoria.idSubcategoria;
                    var idCategoria = subcategoria.idCategoria;
                    var descricao = subcategoria.descricaoSubcategoria;
                    var situacao = subcategoria.situacao; 
                    var opcao = '<option value="' + idSubcategoria + '">'+ descricao +'</option>';
                    $('#ddlSUB').append(opcao);

                }
            }
        });
    }
    function CarregarProduto(idprot) {
        var urlServico = 'https://localhost:7281/api/Produto/PorSubcategoria/'+ idprot ;

        $.get(urlServico, function(retorno,status) {
            var keys = Object.keys(retorno);
            if (keys.lenght == 0) {
            alert("Erro ao obter os dados.");
            }
            else{
                for (var i = 0; i <retorno.length; i++){
                    var produto = retorno[i];
                    var idProduto = produto.idProduto;
                    var idSubcategoria = produto.idSubcategoria;
                    var idCategoria = produto.idCategoria;
                    var descricao = produto.descricaoProduto;

                    var linhaINI = "<tr>";
                    var colunaPROT =  "<td>"+ idProduto +"</td>";
                    var colunaIDSUB = "<td>"+ idSubcategoria +"</td>";
                    var colunaIDCAT = "<td>"+ idCategoria +"</td>";
                    var colunaDESCRICAO = "<td>"+ descricao +"</td>";
                    var linhaFIM = "</tr>";

                    var linha = linhaINI + colunaPROT + colunaIDCAT + colunaIDSUB + colunaDESCRICAO + linhaFIM;

                    $("#tblPROT tbody").append(linha);
                }
            }
        });
    }

