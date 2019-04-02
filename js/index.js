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
	// Bind to input propertychange == text changes AS YOU TYPE
	// Mad cool. THX stackoverflow: https://stackoverflow.com/a/11338644
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
		
		/* 	Apply it to the IMAGE MACRO TOO!
				Note: H4, so .text() not .val()
				Also try to split on newlines. Using regex so this is platform
				independent, since newlines vary from Windows to Linux/Mac
				https://stackoverflow.com/a/45709854\
		*/
		var spongebobMemeBits = totallySpongeBob.split(/\r?\n/);
		if (spongebobMemeBits.length > 1) {
			/*	Apply first half of the bits to the top, second half to the bottom.
					Ex: 2 bits, so 1 goes on top, the other below. If >2 bits, divide 
					and round up (default behavior of round since .5 rounds UP), which is 
					fine since there's more space above SpongeBob then below him.
			*/
			var textPart = "";
			for (var i = 0; i < Math.round(spongebobMemeBits.length / 2); i++) {
				textPart += spongebobMemeBits[i];
			}
			$("#TopMeme").text(textPart);
			textPart = "";
			for (var i = Math.round(spongebobMemeBits.length / 2); 
						   i < spongebobMemeBits.length; i++) {
				textPart += spongebobMemeBits[i];
		  }
			$("#BottomMeme").text(textPart);
		}
		else if (spongebobMemeBits.length == 0) {
			// Edge case: we need to clear both the top and bottom text
			$("#TopMeme").text("");
			$("#BottomMeme").text("");
		}
		else {
			// Otherwise, just the top text gets set.
			$("#TopMeme").text(totallySpongeBob);
			$("#BottomMeme").text("");	// Wipe out bottom meme if length equals 1
		}
	});
	
	// Copy sPoNgEbOb TeXt 2 the clipboard
	$("#sPoNgEbObTeXt").click(function () {
		copy2clipboard("#sPoNgEbObTeXt");
	});
	
	// Hover text to let the user know we auto copy to the clipboard for them
	$('[data-toggle="tooltip"]').tooltip();
	
	// Enable Tool tips when hovering & Disable tool tips after hovering
	// This stops the tool tip from being there when you're typing
	// awesome sPonGe BoB tExT
	// https://api.jquery.com/hover/
	$("#notspongebob").hover(
	// Hover In
	function() {
		// https://stackoverflow.com/a/9875490
		$("#notspongebob").tooltip('hide')
					.attr('data-original-title', "<em>iNpUt YoUr TeXt</em> <u>HeRe</u>")
          .tooltip('show');
	}, 
	// Hover out
	function() {
		$("#notspongebob").tooltip('show')
					.attr('data-original-title', "")
          .tooltip('hide');
	});
	
	// If the user copies sPonGe BoB tExT, I change the tool tip to say that
	// text has been copied to the clipboard. The text never changes back to
	// to the original "cLiCk HeRe 2 AuTo CoPy 2 YoUr ClIpBoArD", 
	// so reset it on hover.
	$("#sPoNgEbObTeXt").hover(
	// Hover In
	function() {
		// https://stackoverflow.com/a/9875490
		$("#sPoNgEbObTeXt").tooltip('hide')
					.attr('data-original-title', 
							  "<em>cLiCk</em> <u>HeRe</u> <em>2 AuTo CoPy 2 YoUr ClIpBoArD</em>")
          .tooltip('show');
	}, 
	// Hover out
	function() {
		$("#sPoNgEbObTeXt").tooltip('show')
					.attr('data-original-title', "")
          .tooltip('hide');
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

// Alternate the quality of the meme based on the checkbox
// https://api.jquery.com/prop/
// https://stackoverflow.com/a/12784242
function turnDownTheQuality() {
	if ( $("#bAdQuAlItYmEmEs").prop("checked") ) {
		// "Bad" quality"
		$("#spongebobmeme").attr("src", "img/mocking-spongebob_badquality.jpg");
	}
	else {
		// "Good" quality
		$("#spongebobmeme").attr("src", "img/mocking-spongebob_small.jpg");
	}
}

// Auto copy sPonGe BoB tExT to clipboard on output box click
function copy2clipboard(element) {
	$(element).select();
	document.execCommand("copy");
	
	// HIDE THE TOOL TIP!
	// Note: super annoying to do this, future reference see SO post below:
	// https://stackoverflow.com/a/9875490
	$("#sPoNgEbObTeXt").tooltip('hide')
					.attr('data-original-title', 
					"cOpIeD 2 tHe ClIpBoArD - uR wElCoMe SiR/mAdAmE!")
          .tooltip('show');
}
