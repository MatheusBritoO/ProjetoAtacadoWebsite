$(document).ready(function(){
   AvaliarOperacao();

   $('#btnCANCELAR').click(function() {
    localStorage.removeItem('opercat');
    if ((operacao == 2) || (operacao == 3)){
        var operacao = localStorage.removeItem('opercatid')
    }
    window.location = 'categorias.html';
   });
}); 

function AvaliarOperacao(){
    var operacao = localStorage.getItem('opercat')
    if (operacao == 1){
        $('#lblOPERACAO').text('INCLUSAO');
    }
    else if (operacao == 2){
        $('#lblOPERACAO').text('ALTERAÇÃO');
        var id = localStorage.getItem('opercatid')
        CarregarCategoria(id);
    }
    else if (operacao == 3){
        $('#lblOPERACAO').text('EXCLUSÃO');
        var id = localStorage.getItem('opercatid')
        CarregarCategoria(id);
        PrepararExclusao();
    }
    else
    {
        alert('operação Inválida!!!');
    }
}

function CarregarCategoria(id){
    var urlServico = 'https://localhost:7281/api/Categoria/' + id;
    $.get(urlServico, function(retorno, status){
        if(retorno == ''){
            alert('Categoria não existe ('+ id +')!!!')
            return;
        }
        else{
            $('#txtID').val(retorno.codigo);
            $('#txtID').prop('readonly', true);
            
            $('#txtDESCRICAO').val(retorno.descricao);

            if (retorno.situacao == true){
                $('#radTRUE').prop('checked', true);
            }
            else{
                $('#radFALSE').prop('checked', true);
            }
        }
    });
}

    function PrepararExclusao() {
        $('#txtID').prop('readonly', true);
        $('#txtDESCRICAO').prop('readonly', true);
        $('#radTRUE').prop('disabled', true);
        $('#radFALSE').prop('disabled', true);
    }

    function Confirmar(){
        var operacao = localStorage.getItem('opercat')
        if (operacao == 1){
            AcionarInclusao();
        }
        else if (operacao == 2){

        }
        else if (operacao == 3){

        }
    }
    
 
    function AcionarInclusao(){
        var categoria = {
            codigo: 0,
            descricao: "string",
            situacao: true
        };
        categoria.descricao = $('#txtDESCRICAO').val();
        if ($('#radTRUE').val()== true){
            categoria.situacao = true;
        }
        else{
            categoria.situacao = false;
        }
        var urlServico = 'https://localhost:7281/api/Categoria/';
        $.post(urlServico, categoria, function(retorno, situacao){
            if (retorno == ""){
                alert('Ocorreu um erro ao executar a inclusão.');
            }
            else{
              if  (retorno.codigo != 0){
                alert('Inclusão realizada com sucesso.(ID: '+ retorno.codigo+').');
              }
                
            }

        });
    }

  