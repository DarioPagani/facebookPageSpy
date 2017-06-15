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

function calcoloFrequenza(id)
{
	FB.api("/"+id+"?fields=posts.limit(500)", function(e)
		{
			// Variabili
			var date = new Array(e.posts.data.length);
			var distanze = new Array(date.length);
			var pubblicazioni = [0, 0, 0, 0, 0, 0, 0];
			
			
			// Creazione delle date
			for(var i = 0; i < date.length; i++)
				date[i] = new Date(e.posts.data[i].created_time);
			
			// Computazione della frequenza
			for(var i = 0; i < date.length; i++)
				pubblicazioni[date[i].getDay()] ++;
				
			// Riempipemnto campi
			for(var i = 0, campi = $(".freqGiorOut"); i < pubblicazioni.length; i++)
				$(campi[i]).text(pubblicazioni[i]);
			
			// Computazione della media matematica
			$("#freqOut").text((date[0].getTime() - date[date.length - 1].getTime()) / (date.length-1) / 1000);
			console.log(date[0] + '\nUltimo:' + date[date.length -1])
			
			if(--semaforo == 0)
				activeDownload();
		});
}

function calcoloInfo(id)
{
	FB.api('/' + id + "?fields=fan_count,talking_about_count", function(e)
		{
			$("#likesOut").text(e.fan_count);
			$("#talkOut").text(e.talking_about_count);
		});
		
	if(--semaforo == 0)
		activeDownload();
}
