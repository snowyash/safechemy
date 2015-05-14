$(document).ready(function() {

  	defineWinSize();

	var dangerousChemy = new Object();
	dangerousChemy.match = 0;
	dangerousChemy.halfmatch = 0;
	dangerousChemy.both = [];
	dangerousChemy.arr = ['aluminumchloridehexahydrate', 'aluminiumchlorohydrate', 'betahydroxyacids', 'salicylicacid', 'hydroxypropionicacid', 'trethocanicacid', 'tropicacid', 'avobenzone', 'homosalate', 'octisalate', 'octocrylene', 'oxybenzone', 'oxtinoxate', 'menthylanthranilate', 'oxtocrylene', 'diethanolamine', 'oleamideDEA', 'lauramideDEA', 'cocamideDEA', 'dihydroxyacetone', 'dha', 'formaldehyde', 'quaternium', 'dimethyl-dimethyl', 'dmdm', 'hydantoin', 'imidazolidinylurea', 'diazolidinylurea', 'sodiumhydroxymethylglycinate', 'bromonitropropane', 'diol', 'bromopol', 'dydroquinone', 'hydroquinone', 'idrochinone', 'quinol', 'dihydroxybenzene', 'hydroxybenzene', 'paraben', 'propyl', 'butyl', 'isopropyl', 'isobutyl', 'methylparabens', 'phthalates', 'diethyl', 'dibutylespecially', 'retinol', 'vitamina', 'retinoicacid', 'retinylpalmitate', 'retinaldehyde', 'adapalene', 'tretinoin', 'tazarotene', 'isotretinoin', 'thioglycolicacid', 'acetylmercaptan', 'mercaptoacetate', 'mercaptoaceticacid', 'thiovanicacid', 'toluene', 'methylbenzene', 'toluol', 'antisal1a'];
	dangerousChemy.arrMap = {
		aluminumchloridehexahydrate: 'Aluminum Chloride Hexahydrate', 
		aluminiumchlorohydrate: 'Aluminium Chlorohydrate', 
		betahydroxyacid: 'Beta Hydroxy Acid', 
		salicylicacid: 'Salicylic Acid', 
		hydroxypropionicacid: 'Hydroxypropionic Acid', 
		trethocanicacid: 'Trethocanic Acid', 
		tropicacid: 'Tropic Acid', 
		avobenzone: 'Avobenzone', 
		homosalate: 'Homosalate', 
		octisalate: 'Octisalate', 
		octocrylene: 'Octocrylene', 
		oxybenzone: 'Oxybenzone', 
		oxtinoxate: 'Oxtinoxate', 
		menthylanthranilate: 'Menthyl Anthranilate', 
		oxtocrylene: 'Oxtocrylene', 
		diethanolamine: 'Diethanolamine', 
		oleamideDEA: 'Oleamide DEA', 
		lauramideDEA: 'Lauramide DEA', 
		cocamideDEA: 'Cocamide DEA', 
		dihydroxyacetone: 'Dihydroxyacetone', 
		dha: 'DHA', 
		formaldehyde: 'Formaldehyde', 
		quaternium: 'Quaternium', 
		dimethyl: 'Dimethyl Dimethyl', 
		dmdm: 'DMDM', 
		hydantoin: 'Hydantoin', 
		imidazolidinylurea: 'Imidazolidinyl Urea', 
		diazolidinylurea: 'Diazolidinyl Urea', 
		sodiumhydroxymethylglycinate: 'Sodium Hydroxymethylglycinate', 
		bromonitropropane: 'Bromo Nitropropane', 
		diol: 'Diol', 
		bromopol: 'Bromopol', 
		hydroquinone: 'Hydroquinone', 
		idrochinone: 'Idrochinone', 
		quinol: 'Quinol', 
		dihydroxybenzene: 'Dihydroxybenzene', 
		hydroxybenzene: 'Hydroxybenzene', 
		paraben: 'Paraben', 
		propyl: 'Propyl', 
		butyl: 'Butyl', 
		isopropyl: 'Isopropyl', 
		isobutyl: 'Isobutyl', 
		methylparabens: 'Methyl Parabens', 
		phthalates: 'Phthalates', 
		diethyl: 'Diethyl', 
		dibutyle: 'Dibutyle', 
		retinol: 'Retinol', 
		vitamina: 'Vitamin A', 
		retinoicacid: 'Retinoic Acid', 
		retinylpalmitate: 'Retinyl Palmitate', 
		retinaldehyde: 'Retinaldehyde', 
		adapalene: 'Adapalene', 
		tretinoin: 'Tretinoin', 
		tazarotene: 'Tazarotene', 
		isotretinoin: 'Isotretinoin', 
		thioglycolicacid: 'Thioglycolic Acid', 
		acetylmercaptan: 'Acetyl Mercaptan', 
		mercaptoacetate: 'Mercaptoacetate', 
		mercaptoaceticacid: 'Mercaptoacetic Acid', 
		thiovanicacid: 'Thiovanic Acid', 
		toluene: 'Toluene', 
		methylbenzene: 'Methylbenzene', 
		toluol: 'Toluol', 
		antisal: 'Antisal'
	}

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

	/* responsive textarea string check */
	$('textarea').keyup(function(){
		checkLength();
	});

	$('form#textarea_form').submit(function(){
		/* reset everything just in case */
		dangerousChemy.reset();
		removeOldResults();

		/* then split textarea input into array */
		if ($('textarea')[0].value.length > 0 && $('textarea')[0].value.length <= 1500) {
			
			/* check textarea array against dangerousChemy.arr for matches */
			checkArray($('textarea')[0].value);

		} else {
			checkLength();
			$('p:has(span)').removeClass("normal").addClass("bold");
		}

		return false;
	});

	$('form#url_form').submit(function(){
		/* reset everything just in case */
		dangerousChemy.reset();
		removeOldResults();

		var inputURL = treatURL($('input#url')[0].value);

		/* validation on url input */
		if (inputURL) {
			
			$('#url_warning').removeClass("red").addClass("green");
			$('#url_warning')[0].innerHTML = "is a valid sephora address.";

			/* call ajax and get info from URL */
			$.getJSON( "php/ingredientsGenerator.php", { url: inputURL[0] } )
				.done(function(json) {

				    /* treat json to array */
				    var matches = json['text'].substring(json['text'].indexOf(inputURL[1]), json['text'].indexOf(inputURL[2]));
				    if(matches) checkArray(matches);
				    else checkURL("doesn't have ingredient information");

				})
				.fail(function( jqxhr, textStatus, error ) {
				    var err = textStatus + ", " + error;
				    checkURL("is invalid. Error Message: " + err );
			});		
			
		} else {
			checkURL("is invalid");
		}

		return false;
	});

	function checkLength(){
		$('#textarea_warning')[0].innerHTML = 1500 - $('textarea')[0].value.length;

		$('p:has(span)').addClass("normal").removeClass("bold");

		if ($('textarea')[0].value.length > 1500) {
			$('#textarea_warning').removeClass("green").addClass("red");
		} else {
			$('#textarea_warning').addClass("green").removeClass("red");
		}
	}

	function treatURL(url){

		if(url.indexOf("m.sephora.com") > 0) {
			return [ url, 'Ingredients', 'How to use' ];

		} else if (url.indexOf("www.sephora.com") > 0){
			return [ url, ',"ingredients":"', '","id":"' ];

		} else {
			return null;
		}

		return url;
	}

	function checkURL(str){
		$('#url_warning').removeClass("green").addClass("red");
		$('#url_warning')[0].innerHTML = str;
	}

	function checkArray(str){

		/* this function aligned the two arrays together and find duplicate items alphabetically */
		dangerousChemy.both = str.toLowerCase().replace(/[ ()<>"]|[a][n][d]|[\\][r]|[\\][n]/g, '').replace(/[:;.-]/g, ',').split(',').concat(dangerousChemy.arr);
		dangerousChemy.both.sort();

		for(var i = 0; i < dangerousChemy.both.length-1; i++){
				if (dangerousChemy.both[i].length > 1){
					if (dangerousChemy.both[i] == dangerousChemy.both[i+1] && dangerousChemy.both[i+1] == dangerousChemy.both[i+2]){

						dangerousChemy.both.splice(i, 1);
						i -= 1;

					} else if (dangerousChemy.both[i] == dangerousChemy.both[i+1]){

						if (dangerousChemy.arrMap[dangerousChemy.both[i]]){

							$('#danger_list').append('<li>' + dangerousChemy.arrMap[dangerousChemy.both[i]] + '</li>');

							dangerousChemy.match += 1;

						}

					} else if (dangerousChemy.both[i].indexOf(dangerousChemy.both[i+1]) > -1 || dangerousChemy.both[i+1].indexOf(dangerousChemy.both[i]) > -1) {

						if (dangerousChemy.arrMap[dangerousChemy.both[i]]){
							
							$('#danger_half_list').append('<li>' + dangerousChemy.arrMap[dangerousChemy.both[i]] + '</li>');

							dangerousChemy.halfmatch += 1;

						}
					}
				} else {
					dangerousChemy.both.splice(i, 1);
				}
				
			}

			/* display each match on the web page & update danger title */

			evaluate(dangerousChemy.match, $('#danger'), 'dangerous', 'Warning!');
			evaluate(dangerousChemy.halfmatch, $('#danger_half'), 'potentially dangerous', 'Careful!');
			noResults();
	}

	function evaluate(n, element, name, warning){
		if (n == 1) {
			element.append(warning + ' We found ' + n + ' ' + name + ' chemical.');
			element.focus();
		} else if (n > 1) {
			element.append(warning + ' We found ' + n + ' ' + name + ' chemicals.');
			element.focus();
		}
	}

	function noResults(){
		if (dangerousChemy.match < 1 && dangerousChemy.halfmatch < 1) {
			$('#safe').append("Wow! We didn\'t found anything unusual.");
			$('#safe').focus();
		}
	}

	$(window).resize(function() {
	  	defineWinSize();
	});

	function defineWinSize(){
		var size;

		if ($(window).width() <= 1000){
	  		$('section').removeClass("window").addClass("mobile");
			size = $(window).width() / 3 + "%";
			$('h1').css('font-size', size);
	  	} else {
	  		$('section').removeClass("mobile").addClass("window");
			size = $(window).width() / 4 + "%";
			$('h1').css('font-size', size);
	  	}
	}
});