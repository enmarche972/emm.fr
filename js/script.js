function shareTwitter(url, text) {
  open('http://twitter.com/share?url=' + url + '&text=' + text, 'tshare', 'height=400,width=550,resizable=1,toolbar=0,menubar=0,status=0,location=0');  
}

function shareFacebook(url) {
  open(url, 'fbshare', 'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0');
}

function shareEmail(url, text) {
  location.href = "mailto:?subject=" + text + "&body=" + url;
}
