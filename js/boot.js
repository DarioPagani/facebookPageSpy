const HTMLDev = !true;

MT = new Multithread(8);

$( document ).ready(function()
{
$("#noJS").remove();

window.fbAsyncInit = function() {
    FB.init({
      appId            : '316775572096905',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

if(!HTMLDev)
{
	$("#auth").addClass("is-active");
	$("#auth").find("a").on('click',function()
	{
		$(this).prop("disabled",true);

		FB.login(function()
			{
				$("#auth").removeClass("is-active");
			}, {scope: 'publish_actions'});

	});
}

// INZIALIAZZAZIONE PULSANTI
$(".csv").on("click", function()
{
	if(typeof $(this).attr("disabled") != "undefined")
		return;
	$(this).addClass("is-loading");
	download("export"+(new Date()).toISOString()+".csv", exportCVS('#'+$(this).parent().find("tbody").attr("id")))
	$(this).removeClass("is-loading");

})

$("#nsa").on("click", function()
{
	if(typeof $(this).attr("disabled") != "undefined")
		return;
	$(this).addClass("is-loading");
	download("persone.csv", globalProf.toCVSString());
	$(this).removeClass("is-loading");
})

// INIZIALIZZAZIONE TABELLE
$("#tab1").hide();
$("#tabH").find("a").on("click", function()
{
	$("#tabH").find("li").removeClass("is-active");
	$(this).parent().addClass("is-active");
	$(".tabF").hide();
	$("#tab" + $(this).parent().attr("id")).show();
});
});

setInterval(function()
{
	$("#nThread").text(semaforo);
}, 1200);
