$(document).ready( function(){
    CarregarCategorias();

    $('#ddlCAT').change(function() {
        //console.log( $('#ddlCAT option:selected').val());
        var subid = $('#ddlCAT option:selected').val();
        CarregarSubcategoria(subid);
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


                    var linhaINI = "<tr>";
                    var colunaIDSUB = "<td>"+ idSubcategoria +"</td>";
                    var colunaIDCAT = "<td>"+ idCategoria +"</td>";
                    var colunaDESCRICAO = "<td>"+ descricao +"</td>";

                    var linhaFIM = "</tr>";

                    var linha = linhaINI + colunaIDCAT + colunaIDSUB + colunaDESCRICAO +linhaFIM;

                    $("#tblSUB tbody").append(linha);
                }
            }
        });
    }