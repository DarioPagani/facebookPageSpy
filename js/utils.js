/** 
 * Migliarino Pisano, Vecchiano li 15/06/2017
 * Questo file contiene utilità
 *
 * @author: Pagani Dario <dario.pagani@itispisa.gov.it>
 * @version: 0.1
 */

/**
 * Funziona presa da Internet che fa scaricare un file a chi usa la pagina WEB
 * @param	filename		una stringa che diventerà il nome del File da scaricare
 * @param	text			una stringa che diventerà il contenuto del File da scaricare
 * @return	void
 */
function download(filename, text) 
{
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) 
    {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else
        pom.click();
}

/**
 * Funzione che data una tabella ne genera un CVS
 * @param	id				ID add una tabella
 * @return	String			stringa cvs
 */

function toCVS(id)
{
	// Variabili
	var cvs = "";
	var righe = $(id).find("tr");
	
	for(var i = 0 ; i < righe.length; i++)
	{
		var colonne = righe[i].find("th");
		for(var j = 0; j < colonne.length; j++)
			cvs = cvs.concat(colonne[j] + ",")
		cvs += '\n';
	}
	
	return cvs;
}
