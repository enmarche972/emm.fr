function shareTwitter(url, text) {
  open('http://twitter.com/share?url=' + url + '&text=' + text, 'tshare', 'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0');  
}

function shareFacebook(url) {
  open(url, 'fbshare', 'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0');
}

function shareEmail(url, text) {
  location.href = "mailto:?subject=" + text + "&body=" + url;
}

var facebookLinks = document.getElementsByClassName('click-facebook')
for(var i=0; i<facebookLinks.length; i++ ) {
	var elem = facebookLinks[i];
	var url  = elem.getAttribute('data-url');
	var site = elem.getAttribute('data-site');
	elem.onclick = function(e) {
		e.preventDefault();
		shareFacebook("https://www.facebook.com/sharer/sharer.php?u=" + site + url + "&amp;src=sdkpreparse");
	};
}

var twitterLinks = document.getElementsByClassName('click-twitter')
for(var i=0; i<twitterLinks.length; i++ ) {
	(function () {
		var elem = twitterLinks[i];
		var url  = elem.getAttribute('data-url');
		var site = elem.getAttribute('data-site')
		var title = elem.getAttribute('data-title');
	
	
		elem.onclick = function(e) {
			e.preventDefault();
			shareTwitter(url + site, title);
		}
	})();
}

$(document).ready(function() {

		$('#burger').on('click', function(){
				$('#mobile-menu').addClass('mobile-menu-open');
		});

		$('#close-mobile-menu').on('click', function(){
				$('#mobile-menu').removeClass('mobile-menu-open');
		});

		$('#handle-social').on('click', function(){
				$('#header__socials--mobile').toggleClass('mobile-socials-open');
				$(this).toggleClass('fa-times fa-share');

		});

});