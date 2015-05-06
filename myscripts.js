$(document).ready(function() {

	var dangerousChemy = new Object();
	dangerousChemy.match = 0;
	dangerousChemy.halfmatch = 0;
	dangerousChemy.both = [];
	dangerousChemy.arr = ['aluminumchloridehexahydrate', 'aluminiumchlorohydrate', 'betahydroxyacids', 'salicylicacid', 'hydroxypropionicacid', 'trethocanicacid', 'tropicacid', 'avobenzone', 'homosalate', 'octisalate', 'octocrylene', 'oxybenzone', 'oxtinoxate', 'menthylanthranilate', 'oxtocrylene', 'diethanolamine', 'oleamideDEA', 'lauramideDEA', 'cocamideDEA', 'dihydroxyacetone', 'dha', 'formaldehyde', 'quaternium', 'dimethyl-dimethyl', 'dmdm', 'hydantoin', 'imidazolidinylurea', 'diazolidinylurea', 'sodiumhydroxymethylglycinate', 'bromonitropropane', 'diol', 'bromopol', 'dydroquinone', 'hydroquinone', 'idrochinone', 'quinol', 'dihydroxybenzene', 'hydroxybenzene', 'paraben', 'propyl', 'butyl', 'isopropyl', 'isobutyl', 'methylparabens', 'phthalates', 'diethyl', 'dibutylespecially', 'retinol', 'vitamina', 'retinoicacid', 'retinylpalmitate', 'retinaldehyde', 'adapalene', 'tretinoin', 'tazarotene', 'isotretinoin', 'thioglycolicacid', 'acetylmercaptan', 'mercaptoacetate', 'mercaptoaceticacid', 'thiovanicacid', 'toluene', 'methylbenzene', 'toluol', 'antisal1a'];

	dangerousChemy.reset = function(){
		this.match = 0;
		this.halfmatch = 0;
		this.both = [];
	};

	function removeOldResults(){
		$('#danger').empty();
		$('#danger_half').empty();
		$('#safe').empty();
		$('#danger_list').empty();
		$('#danger_half_list').empty();
	}

	$('form').submit(function(){
		/* reset everything just in case */
		dangerousChemy.reset();
		removeOldResults();

		/* first validate textarea input */
		/* then split textarea input into array */
		if ($('textarea')[0].value) {
			dangerousChemy.both = $('textarea')[0].value.toLowerCase().replace(/[ ()]|[a][n][d]/g, '').replace(/[:;.-]/g, ',').split(',').concat(dangerousChemy.arr);
			dangerousChemy.both.sort();
		}

		/* check textarea array against dangerousChemy.arr for matches */
		for(var i = 0; i < dangerousChemy.both.length-1; i++){
			if (dangerousChemy.both[i].length > 1){
				if (dangerousChemy.both[i] == dangerousChemy.both[i+1] && dangerousChemy.both[i+1] == dangerousChemy.both[i+2]){

					dangerousChemy.both.splice(i, 1);

				} else if (dangerousChemy.both[i] == dangerousChemy.both[i+1]){

					$('#danger_list').append('<li>' + dangerousChemy.both[i] + '</li>');

					dangerousChemy.match += 1;

				} else if (dangerousChemy.both[i].indexOf(dangerousChemy.both[i+1]) > -1 || dangerousChemy.both[i+1].indexOf(dangerousChemy.both[i]) > -1) {

					$('#danger_half_list').append('<li>' + dangerousChemy.both[i] + '</li>');

					dangerousChemy.halfmatch += 1;
				}
			} else {
				dangerousChemy.both.splice(i, 1);
			}
			
		}

		console.log(dangerousChemy.both);

		evaluate(dangerousChemy.match, $('#danger'), 'dangerous', 'Warning!');
		evaluate(dangerousChemy.halfmatch, $('#danger_half'), 'potentially dangerous', 'Careful!');
		noResults();

		/* display each match on the web page & update danger title */

		return false;
	});

	function evaluate(n, element, name, warning){
		if (n > 0 && n < 2) {
			element.append(warning + ' We found ' + n + ' ' + name + ' chemical.');
		} else if (n > 1) {
			element.append(warning + ' We found ' + n + ' ' + name + ' chemicals.');
		}
	}

	function noResults(){
		if (dangerousChemy.match < 1 && dangerousChemy.halfmatch < 1) {
			$('#safe').append("Wow! We didn\'t found anything unusual.");
		}
	}
});