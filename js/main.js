document.getElementById('form').addEventListener('submit', pesquisarFilmes);

function pesquisarFilmes(e){
	var filme = document.getElementById("filme").value;
	buscarFilmes(filme);
	console.log(e);
	e.preventDefault();
}

function buscarFilmes(filme){
	
	axios.get('https://api.themoviedb.org/3/search/movie?api_key=5417af578f487448df0d4932bc0cc1a5&query='+filme).then(function(response){
		console.log(response);
		var filmePesquisado  =  response.data.results;
		var mostraFilmes = '';
		console.log(filmePesquisado);

		for (var i = 0; i < filmePesquisado.length; i++) {
			mostraFilmes += '<div class="col-md-4">';
			//mostraFilmes += '<span>#'+filmePesquisado[i].id+'</span>';
			mostraFilmes += '<img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/'+filmePesquisado[i].poster_path+'">';
			mostraFilmes += '<br/><br/>';
			mostraFilmes += '<h6 class="text-muted">'+filmePesquisado[i].title+'</h6><br/>';
			mostraFilmes += '<button type="button" class="btn btn-primary" id="detalhes" onclick="info('+filmePesquisado[i].id+');">Detalhes</button>';
			mostraFilmes += '<br/><br/>';

			//mostraFilmes += '<p><h4 class="">'+filmePesquisado[i].title+'</h4></p>';
			//mostraFilmes += '<span>'+filmePesquisado[i].release_date+'</span>'
			//mostraFilmes += '<p>' + filmePesquisado[i].overview + '</p></div>';			
			mostraFilmes += '</div>';

			console.log(filmePesquisado[i].title);			
		}
		
		document.getElementById('c2').innerHTML = mostraFilmes;			

		
	}).catch(function (error){
		console.log(error);
	});
}

function info(id){	//var mostraDetalhes = '';
	//alert(id);
	sessionStorage.setItem('idFilme', id);
	window.location = 'detalhes.html';
	return false;
}

function exibirFilme(){
	var idFilme = sessionStorage.getItem('idFilme'); 

	axios.get('https://api.themoviedb.org/3/movie/'+idFilme+'?api_key=5417af578f487448df0d4932bc0cc1a5')
	.then(function(response){
		var filmeDetalhado = response;
		console.log(filmeDetalhado);
		
		var mostraDetalhes = '';
		mostraDetalhes += '<div class="row">';
		mostraDetalhes += '<div class="col-md-6"><ul class="list-group"># '+filmeDetalhado.data.id+'';
		mostraDetalhes += '<li class="list-group-item"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/'+filmeDetalhado.data.poster_path+'"></li>';
		mostraDetalhes += '<li class="list-group-item">Título: '+filmeDetalhado.data.original_title+'</li>';
		mostraDetalhes += '<li class="list-group-item">Gênero: '+ filmeDetalhado.data.genres[0].name+'</li>';
		mostraDetalhes += '</div>';
		mostraDetalhes += '<div class="col-md-6">';
		mostraDetalhes += '<li class="list-group-item">Sinopse: '+filmeDetalhado.data.overview+'</li>';
		mostraDetalhes += '</div>';
		mostraDetalhes += '</div>';
		

		document.getElementById('detalhes').innerHTML = mostraDetalhes;
	}).catch(function(error){
		console.log(error);
	});
}
