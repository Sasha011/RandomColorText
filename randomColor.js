//Ovako u jednom fajlu to nije dobro
//Validacije bi trebalo izdvojiti u poseban modul, to je samo jedan primer
//Neke radnje se izvrsavaju i tek posle njih se proverava da li je unos validan?!
//Zasto se koristi css funkcija jquery-ja kada je sve moguce raditi sa css klasama i stilovima?
//Deklaracije i definicije promenljivih na pogresnim mestima
//randomColor funkcija, ima po meni logicku manu, vidi komentare 

$(document).ready(function(){
				
	//Zasto je definisano ovde
	var colorArray = [];
	
	//After Form Submitted
	$("#contact_submit button").click(function(){
		var inputColor = $('#color_text');
		var colors = inputColor.val();
		
		//replace multiple line breaks with space and trim white spases at the start and the end
		colors.replace(/[\r\n]+/g," ")
		colors = $.trim(colors);
		
		//split colors to array
		colorArray = colors.split(/[,;]+/).filter(x => x);
		
		//Zasto je definisano ovde? Sam JS kompajler ce podici deklaraciju na vrh funkcije
		var isColor = false;
		for (var i = 0, len = colorArray.length; i < len; i++) {
		  isColor = validTextColor(colorArray[i]);
			if (!isColor) { break; }	
		}
		
		//Zasto je definisano ovde? Sam JS kompajler ce podici deklaraciju na vrh funkcije
		var atLeastTwoColors = colorArray.length > 1;
		
		if(isColor && atLeastTwoColors){inputColor.removeClass("invalid").addClass("valid");}
		else{inputColor.removeClass("valid").addClass("invalid");}	
		
		//Zasto je definisano ovde? Sam JS kompajler ce podici deklaraciju na vrh funkcije
		var error_free=true;
		
		//Zasto je definisano ovde? Sam JS kompajler ce podici deklaraciju na vrh funkcije
		var valid = inputColor.hasClass("valid");
		
		//Zasto je definisano ovde? Sam JS kompajler ce podici deklaraciju na vrh funkcije
		var error_element = $("span", inputColor.parent());	
		
		if (!valid){
			error_element.removeClass("error").addClass("error_show"); 
			error_free=false;
		}
		else{
			error_element.removeClass("error_show").addClass("error");
			}
		
		if (error_free){
			randomColor(colorArray)
		}
		else{
			//reset to black color
			$('#colorParagraph p span').css('color', 'black'); 
		}
	});
				
	function validTextColor(textColor) {
		var testElement = document.createElement("div");
		testElement.style.color = textColor;
		return testElement.style.color.split(/\s+/).join('').toLowerCase();
	};
	
	function randomColor(colorArray){
		var div = $('#colorParagraph p'); 
		var chars = div.text().split('');
		//nema potrebe za brisanjem
		//$('#colorParagraph p').text().length je chars, a onda idi po indeksu i menjaj svaki karakter
		//ti sad sve brises pa apendujes jedan po jedan, a to nije nikako optimalno
		div.html('');     
		var previousColor = -1;
		for(var i=0; i<chars.length; i++) {
			//don't color white space with diff color so the last letter from previous word and first from next will be diff color too
			if(chars[i] == " "){
				idx = previousColor;
			}
			else{
				idx = getRandomColorIndex(colorArray);
				
				//Kad se selektuje random boja, treba da se izbaci iz niza, kako ne bi doslo do ponavljanja,
				//a posle je treba vratiti u taj isti niz
				
				//check two neighboring letters to be different color
				while ( idx == previousColor ){
					idx = getRandomColorIndex(colorArray);
				}
				previousColor = idx;
			}
			var span = $('<span>' + chars[i] + '</span>').css("color", colorArray[idx]);
			div.append(span);
		}
	}
	
	function getRandomColorIndex(colorArray){
		return Math.floor(Math.random() * colorArray.length)
	}
});		
