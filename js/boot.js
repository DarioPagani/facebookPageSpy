$( document ).ready(function()
{
$("#noJS").remove();
$("#auth").addClass("is-active");

window.fbAsyncInit = function() {
    FB.init({
      appId            : '316775572096905',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };
  console.log("Sonoscemo)");

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

});

$("#auth").find("a").on('click',function() 
{
	$(this).prop("disabled",true);
	
	FB.login(function()
		{
			$("#auth").removeClass("is-active");
		}, {scope: 'publish_actions'});

});
