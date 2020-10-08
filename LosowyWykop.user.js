// ==UserScript==
// @name              Losowy Wykop
// @author            Sebastian Ciupinski (sebastian.ciupinski+losowywykop@gmail.com)
// @version           1.0
// @include           https://*.wykop.pl/*
// ==/UserScript==

function getHttpResponse(url)
{
xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET",url, true);
xmlhttp.send();
return xmlhttp.status;
}


function drawRandomX(wykopId)
{
var node=document.createElement("li");
var linkNode=document.createElement('a');
node.className = 'notification';
linkNode.textContent = '\u2684';
linkNode.href = wykopId;
//linkNode.setAttribute("onmouseover",'this.style.color = "#336A90"')
//linkNode.setAttribute("onmouseout",'this.style.color = "white"')
linkNode.style.cssText = "font-size: 24px;";
//linkNode.className = 'fright cfff tdnone quickicon tcenter';
node.appendChild(linkNode);
document.getElementsByClassName("m-hide").item(0).parentNode.insertBefore(node, document.getElementsByClassName("m-hide").item(0).nextSibling);
}

console.log("XXX");
console.log(document.getElementsByClassName("m-hide").item(0).innerHTML);


function drawRandom(wykopId)
{
var node=document.createElement("div");
var linkNode=document.createElement('a');
node.className = 'quickpoint fright rel';
linkNode.textContent = '\u2684';
linkNode.href = wykopId;
linkNode.setAttribute("onmouseover",'this.style.color = "#336A90"')
linkNode.setAttribute("onmouseout",'this.style.color = "white"')
linkNode.style.cssText = "font-size: 32px; padding-top: 8px; height: 28px !important"
linkNode.className = 'fright cfff tdnone quickicon tcenter';
node.appendChild(linkNode);
document.getElementsByClassName("m-hide").item(0).createElement(node);
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value +"; path=/";
}

/*
function checkCookie(c_name)
{
var cookieName=getCookie(c_name);
if (cookieName!=null && cookieName!="")
  {
  return 1;
  }
else
  {
  return 0;
  }
}

*/


var currentWykop;

if (document.location.href.split("/")[3] == "link")
	{
	currentWykop = parseInt(document.location.href.split("/")[4]);
	}

var maxWykop = parseInt(getCookie("maxWykop"));
var randomWykop = parseInt(Math.random()*maxWykop);

if (randomWykop % 2 == 0)
	{randomWykop++;}

if(isNaN(currentWykop) == 1 && isNaN(maxWykop) == 1) {maxWykop=1255457;}

if (currentWykop > maxWykop)
	{maxWykop = currentWykop;}
	else
	{maxWykop = maxWykop;}



setCookie("maxWykop", maxWykop, 365);

var address = 'http://www.wykop.pl/link/' + randomWykop;

if (getHttpResponse('http://www.wykop.pl/link/' + randomWykop) != 200)
	{
	randomWykop=randomWykop;
	address = 'http://www.wykop.pl/link/' + randomWykop;
	}

document.onload = drawRandomX(address);
//document.onload = drawRandom(address);
