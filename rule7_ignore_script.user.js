// ==UserScript==
// @name           Rule7 ignore script
// @namespace      /
// @description    Lets you ignore posts by whichever users you select
// @include        http://forums.rule7.co.uk/*
// ==/UserScript==

var usersToIgnore = new Array('Add','Usernames','To this','List')

var divs = document.getElementsByTagName("div");
for(var i = 0; i < divs.length; i++) {
	  if(divs[i].id.lastIndexOf('_smAuthorName_SimpleMenuDivLayer') != -1) {
	  	  // Find the <a> that's a child of this element - just .childNodes[0]
	  	  // Then get its contained text - should be .textContent (or .innerText for IE pre-9?)
	  	  // Then, to test we've got that right, make it ALLCAPS - use .toUpperCase.
	  	  var authorName = divs[i].childNodes[0].textContent;
	  	  for(var j = 0; j < usersToIgnore.length; j++) {
	  	  	  if (authorName == usersToIgnore[j]) {
					  	  // Once we've found this, we need to go up six (yes, six) levels
					  	  // (to get to the appropriate row).
					  	  // Then we need to go forward by one row and take the second child node.
					  	  // At that point, while we're testing, we'll just add a background-color to make sure
					  	  // we've found the right element.
					  	  var authorRow = divs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
					  	  // Now we try to find the next sibling that isn't a text node (like a line break),
					  	  // cf. http://blogs.creative-jar.com/post/JavaScript-nextSibling-and-Cross-Browser-Compatability.aspx
					  	  var postRow = authorRow.nextSibling;
					  	  while (postRow.nodeType != 1) {
					  	  	  postRow = postRow.nextSibling;
					  	  }
					  	  var postCell = postRow.getElementsByClassName('TableCell_Light')[1]
					  	  var oldPostContents = postCell.childNodes[1]
					  	  oldPostContents.style.display = 'none';
					  	  var newText = document.createTextNode("(You are ignoring this user.)");
					  	  postCell.appendChild(newText);
					  	  postCell.style.fontStyle = 'italic';
					  }
		    }
	  }
}



function findPostCells() {
	var cells = document.getElementsByTagName("td");
	for(var i = 0; i < cells.length; i++) {
	    if(cells[i].id.lastIndexOf('_tdPostCell1') != -1) {
	        cells[i].style.backgroundColor = 'red';
	    }
	    else if(cells[i].id.lastIndexOf('_tdPostCell2') != -1) {
	        cells[i].style.backgroundColor = 'pink';
	    }
	    else if(cells[i].id.lastIndexOf('_tdPostCell3') != -1) {
	        cells[i].style.backgroundColor = 'green';
	    }
	    else if(cells[i].id.lastIndexOf('_tdPostCell4') != -1) {
	        cells[i].style.backgroundColor = 'yellow';
	    }
	    else if(cells[i].id.lastIndexOf('_tdPostCell5') != -1) {
	        cells[i].style.backgroundColor = 'blue';
	    }
	    else if(cells[i].id.lastIndexOf('_tdPostCell6') != -1) {
	        cells[i].style.backgroundColor = 'cyan';
	    }
	    else {
	    	  cells[i].style.backgroundColor = 'yellow';
	    }
	}
}