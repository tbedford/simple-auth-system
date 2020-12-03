function addCookieExpiry(cookie, hours) {
  var d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  var expires = "; expires=" + d.toUTCString();
  return (cookie = cookie + expires + ";");
}

var cookie = "username=fred bloggs";
cookie = addCookieExpiry(cookie, 1);
console.log(cookie);
