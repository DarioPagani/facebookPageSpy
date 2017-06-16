/**
 * Migliarino Pisano, Vecchiano li 16/06/2017
 * Classe per profilare le persone, ogni oggetto creato da questo oggetto
 * è una persona di Facebook
 * @atuhor: Dario Pagani <dario.pagani@itispisa.gov.it>
 */

class Persona
{
	constructor(id)
	{
		this.id = id;
		this.like = new Array();
		this.comments = new Array();
	}
}

class Interazioni extends Array
{
	constructor()
	{
		super();
	}

	pushLike(persona, post, like)
	{
		var pos = super.findIndex(function(e,index)
			{
				return persona == e.id;
			});
		console.log(pos);
		if(pos == -1)
		{
			var tmp = new Persona(persona);
			tmp.like.push({post: post, like: like});
			this.pushPersona(tmp);
		}
		else
			this[pos].like.push({post: post, like: like});

	}

	pushComment(persona, post, comment)
	{
		var pos = super.findIndex(function(e,index)
			{
				return persona == e.id;
			});
		if(pos == -1)
		{
			var tmp = new Persona(persona);
			tmp.comments.push({post: post, comment: comment});
			this.pushPersona(tmp);
		}
		else
			this[pos].comments.push({post: post, comment: comment});
	}

	pushPersona(persona)
	{
		super.push(persona);
		super.sort(function(a,b)
			{
				return a.id - b.id;
			});
	}
}
