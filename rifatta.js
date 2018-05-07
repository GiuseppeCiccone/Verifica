const api = "192.168.1.231:8080";

const fetch = require('node-fetch')

const postRequest = (path, body) => {
	return fetch(api + path, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }).then(response => response.json());
}

const getRequest = (path) => {
	return fetch(api + path).then(response => response.json());
}

const accreditamento = (nome) => {
	return postRequest('/accreditamento', { 'nome': nome })
}

const ottieniEsercizio = (numEs) => {
	return getRequest('/esercizi/' + numEs)
}

const inviaRisultato = (numEs, risultato) => {
	return postRequest('/esercizi/' + numEs, risultato)
}

accreditamento('Giuseppe Ciccone');

ottieniEsercizio(1).then((esercizio) => {
	const { data } = esercizio;

	const elaborato = data.filter((valore) => {
		return valore % 3 === 0;	
	})

	inviaRisultato(1, elaborato)
});

ottieniEsercizio(2).then((esercizio) => {
	const { data } = esercizio;

	const elaborato = data.map((valore) => {
		return valore.toLowerCase();
	}).filter((valore) => {
		return valore.endsWith('e');
	})

	inviaRisultato(2, elaborato)
});

ottieniEsercizio(3).then((esercizio) => {
	const { data } = esercizio;

	const elaborato = data.filter((valore) => { 
		return valore.length <= 5
	}).reduce((accumalatore, valore) => {
		return accumalatore + valore.length
	})
	inviaRisultato(3, elaborato)
});
