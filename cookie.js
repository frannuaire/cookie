/***
      <one line to give the program's name and a brief idea of what it does.>
      Copyright (C) 2017-05-29  Kevin FERRANDON
      
      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
      
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
      
      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    
     Message légal pour l'utilisation des cookies. sauvegarde les données avec localstorage
     @author kevin ferrandon kferrandon@gmail.com  
     @version 1.1   
 **/ 
 
 /**
  * Objet permetant de gérer le message d'acceptation des cookies.
  */
 var Cookie = {
                bInit: false,
                /**
                 *  Création des éléments HTML et css que l'on ajoute ensuite au body
                 **/
                createElt: function () {
                    var head = document.head || document.getElementsByTagName('head')[0];
                    var css = "" +
                    ".cookie {position: absolute;top: 0;left: 0;right: 0;width: 98%;" +
                            "height: 90px;line-height: 25px; text-align:center;" +
                            "margin:5% 2% 2% 2%;" +
                            "background-color : rgba(0,0,0, 0.7);" +
                            "border-top: solid #999 1px;padding: 5px;" +
                            "padding-left: 5px; padding-top: 0;color: white; opacity: .7;" +
                            "box-shadow: 1px 10px 12px #000000;"+
                            "z-index: 99999; }" +
                     ".hideCookie{display:none;}.cookie a{color:#f08c00;}";
                    var dvCookie = document.createElement('div');
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    if (style.styleSheet) {
                        style.styleSheet.cssText = css;
                    } else {
                        style.appendChild(document.createTextNode(css));
                    }
                    head.appendChild(style);
                    dvCookie.setAttribute('id', 'cookie');
                    dvCookie.setAttribute('class', 'cookie');
                    dvCookie.innerHTML = "En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies pour disposer de services adaptés à vos centres d'intérêts.<br /> <a href='https://www.google.com/intl/fr/policies/technologies/cookies/'>En savoir plus</a>";
                    var fermer = document.createElement('a');
                    fermer.setAttribute('id', 'btnHide');
                    fermer.setAttribute('href', '#');
                    fermer.setAttribute('style', 'color:#e97200;text-align:right;text-decoration:none;padding-left:10px;');
                    fermer.innerHTML = '&#x274C; ';
                    dvCookie.appendChild(fermer);
                    document.body.appendChild(dvCookie);
                },
                /**
                 *  Cache les éléments html
                 **/
                hideCookie: function () {
                    if (this.bInit) {
                        localStorage.setItem("cookie", "afficheMsg");
                        var eltCookie = document.getElementById('cookie');
                        eltCookie.setAttribute('class', 'hideCookie');
                    }
                },
                /**
                 * On test si on doit afficher ou cacher nos elements
                 **/
                init: function () {
                    this.createElt();
                    var btnHide = document.getElementById('btnHide');
                    btnHide.setAttribute('onclick', 'Cookie.hideCookie()');
                    if (typeof (Storage) !== "undefined") {
                        if (localStorage.cookie === null || localStorage.cookie === "undefined") {

                        } else {
                            this.hideCookie();
                        }
                    } else {
                        this.hideCookie();
                    }
                    this.bInit = true;
                    if (localStorage.cookie === 'afficheMsg') {
                        this.hideCookie();
                    }

                }

            };
 //  localStorage.cookie=null; // Décommenté pour réinitialiser
/**
 *  initialisation de notre objet une fois la page chargé
 **/
window.onload = function(){
  var monCookie = new Object(Cookie);
  monCookie.init();
};