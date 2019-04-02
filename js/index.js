/*
	=====================================
	||	sPoNgE bOb TeXt GeNeRaToR			 ||
	=====================================
	|| bEcAuSe WhY nOt?								 ||
	=====================================================================
	||	know ur meme: https://knowyourmeme.com/memes/mocking-spongebob ||
	=====================================================================
*/

$( document ).ready(function(){
	// Bing to input propertychange == text changes AS YOU TYPE
	// Made cool. THX stackoverflow: https://stackoverflow.com/a/11338644
	$("#notspongebob").bind('input propertychange', function() {
		
		// SpongeBob Text looks like this: "sPoNgEbOb TeXt LoOkS lIkE tHiS"
		// Output goes to the "sPoNgEbObTeXt" textarea
		var notSpongeBob = $("#notspongebob").val();
		var totallySpongeBob = "";
		
		// Convert to lower case for a nice baseline
		notSpongeBob = notSpongeBob.toLowerCase();
		var changeCase = false;
		
		for (var i = 0; i < notSpongeBob.length; i++) {
			// Ignore non-characters. Must be 65 <-> 90 or 97 <-> 122
			if ( !isCharacterMatch(notSpongeBob.charAt(i)) ) {
				// Add string to end & keep looping
				totallySpongeBob += notSpongeBob.charAt(i);
				continue;
			}
			
			// Character? Alternate the case then. We start with lowercase & false;
			if (changeCase) {
				totallySpongeBob += notSpongeBob.charAt(i).toUpperCase();
				changeCase = false;
			}
			else {
				totallySpongeBob += notSpongeBob.charAt(i);
				changeCase = true;
			}
		}
		
		// Apply the sPoNgEbOb text
		$("#sPoNgEbObTeXt").val(totallySpongeBob);
	});
});

// Returns true if lowercase character, false otherwise
function isCharacterMatch(input) {
	
	// Only a-z characters (we used toLower so ignore upper)
	var regex = /[a-z]/g;		
	var matches = input.match(regex);
	
	if (matches) {			// Null check
		if (matches.length > 0) {
			return true;		// It's a character
		}
	}
	
	return false;				// NULL or empty arrays mean not character
}

function turnDownTheQuality() {
	// Alternate the quality of the meme based on the checkbox
	// https://api.jquery.com/prop/
	// https://stackoverflow.com/a/12784242
	if ( $("#bAdQuAlItYmEmEs").prop("checked") ) {
		// "Bad" quality"
		$("#spongebobmeme").attr("src", "img/mocking-spongebob_badquality.jpg");
	}
	else {
		// "Good" quality
		$("#spongebobmeme").attr("src", "img/mocking-spongebob_small.jpg");
	}
	
	
}