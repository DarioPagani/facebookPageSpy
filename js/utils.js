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