semaforo = 0;

function handler()
{
	$("#errorURL").hide();
	$("#barra_").val("0");
	try
	{
		var url = $("#url").val();

		if(url.indexOf("https://www.facebook.com/") != 0)
		{
			$("#errorURL").show();
			$("#errorURL").find("span").text("Protocollo o dominio non validi!");
			return;
		}

		var id = "";
		for(var i = 25; i < url.length && url[i] != '/'; i++)
			id = id.concat(url[i]);

		FB.api('/'+id, function(e)
			{
				if(typeof e.error != "undefined")
				{
					$("#errorURL").show();
					$("#errorURL").find("span").text("la pagina FB non esiste!");
					return;
				}

			});

		$("#barra_").val("5");


		$(".button").addClass("is-loading");
		// Inzio
		setTimeout(calcoloFrequenza, 0,id, ++semaforo);
		setTimeout(calcoloInfo, 0,id, ++semaforo);
	}
	catch(e)
	{
		console.error(e.toString());
	}

	return false;
}

var globalCount = 0;
var globalLikeCount = 0;
var globalNumber = 0;
var globalProf = new Interazioni();
function calcoloFrequenza(id)
{
	FB.api("/"+id+"?fields=posts.limit(1250){created_time,id}", function(e)
		{
			// Variabili
			var date = new Array(e.posts.data.length);
			var distanze = new Array(date.length);
			var pubblicazioni = [0, 0, 0, 0, 0, 0, 0];
			var pubblicazioniMensili = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


			// Controllo numero commenti
			// Ogni post viene su di un thread separato per ovvi motivi
			globalCount = 0;
			globalLikeCount = 0;
			globalNumber = date.length;
			globalProf = new Interazioni();
			for(var i = 0; i < date.length; i++)
				setTimeout(function(i)
				{
					FB.api('/'+e.posts.data[i].id+"?fields=comments.limit(1500){id,from.fields(id)},likes.limit(1500){id}", function(e)
						{
							try
							{
								if(typeof e.comments != "undefined")
									globalCount+=e.comments.data.length;
									
								if(typeof e.likes != "undefined")
									globalLikeCount+=e.likes.data.length;

								// Profilazione delle Persone
								
								if(typeof e.comments != "undefined")
									for(var i = 0; i < e.comments.data.length; i++)	
									{
										try
										{
												globalProf.pushComment(e.comments.data[i].from.id,undefined, e.comments.data[i].id )
										}
										catch(pr)
										{
											console.warn("Non è stato possibile computare questo commento\n" + pr.toString())
										}
									}
								if(typeof e.likes != "undefined")
									for(var i = 0; i < e.likes.data.length; i++)	
									{
										try
										{
												globalProf.pushLike(e.likes.data[i].id,undefined, null )
										}
										catch(pr)
										{
											console.warn("Non è stato possibile computare questo mi piace!\n" + pr.toString())
										}
									}
								

							}
							catch(err)
							{
								console.warn("Too big to fail!\n"+err.toString());
								globalNumber--;
							}

							if(--semaforo == 0)
								activeDownload();
						})
				}, 0, i, ++semaforo);

			// Creazione delle date
			for(var i = 0; i < date.length; i++)
				date[i] = new Date(e.posts.data[i].created_time);

			// Computazione della frequenza
			for(var i = 0; i < date.length; i++)
				pubblicazioni[date[i].getDay()] ++;

			for(var i = 0; i < date.length; i++)
				pubblicazioniMensili[date[i].getMonth()] ++;

			// Riempipemnto campi
			for(var i = 0, campi = $(".freqGiorOut"); i < pubblicazioni.length; i++)
				$(campi[i]).text(pubblicazioni[i]);

			for(var i = 0, campi = $(".mesiOut"); i < pubblicazioniMensili.length; i++)
				$(campi[i]).text(pubblicazioniMensili[i]);

			// Computazione della media matematica
			console.log(date)
			$("#freqOut").text(((date[0].getTime() - date[(date.length - 1)].getTime()) / (date.length-1) / 1000 / 60).toFixed());
			console.log(date[0] + '\nUltimo:' + date[date.length -1])

			if(--semaforo == 0)
				activeDownload();
		});
}

function calcoloInfo(id)
{
	FB.api('/' + id + "?fields=fan_count,talking_about_count,name", function(e)
		{
			$("#likesOut").text(e.fan_count);
			$("#talkOut").text(e.talking_about_count);
			$("#pageName").text(e.name);
		});

	if(--semaforo == 0)
		activeDownload();
}
