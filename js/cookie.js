/***
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


 Legal message to use cookies. this object works with saving datas in localstorage.
 Message légal pour l'utilisation des cookies. sauvegarde les données avec localstorage
 @author kevin ferrandon kferrandon@gmail.com
 @version 2.0
 **/

/**
 * Objet permettant de gérer le message d' acceptation des cookies.
 */
class Cookie {

    constructor(language = "fr", aCss = "") {
        this.langue = language;

        this.setMessage();
        this.bInit = false;
        this.init(aCss);
    }

    setMessage() {
        switch (this.langue) {
            case "fr":
                this.message = "En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies pour disposer de services adaptés à vos centres d'intérêts.<br /> <a href='https://www.google.com/intl/fr/policies/technologies/cookies/'>En savoir plus</a>";
                break;
            case "en":
                this.message = "By continuing to browse this site, you accept the use of cookies to provide services tailored to your interests.<br /> <a href='https://www.google.com/intl/fr/policies/technologies/cookies/'>Know more</a>"
                break;

            default:
                this.message = "By continuing to browse this site, you accept the use of cookies to provide services tailored to your interests.<br /> <a href='https://www.google.com/intl/fr/policies/technologies/cookies/'>Know more</a>"
        }
    }

    /**
     * we just use two language for the moment.
     **/
    getMessage() {
        return this.message;
    }

    /**
     * On test si on doit afficher ou cacher nos elements
     **/
    init(aCss) {
        this.createElt(aCss);

        let btnHide = document.getElementById("btnHide");
        btnHide.onclick = function () {
            localStorage.setItem("cookie", "afficheMsg");
            let eltCookie = document.getElementById("cookie");
            eltCookie.setAttribute("class", "hideCookie");
        };
        if (typeof (Storage) !== "undefined") {
            if (localStorage.cookie !== null && localStorage.cookie !== "undefined") {
                this.hideCookie();
            }
        } else {
            this.hideCookie();
        }
        this.bInit = true;
        if (localStorage.cookie === "afficheMsg") {
            this.hideCookie();
        }
    }

    /**
     *  Création des éléments HTML et css que l' on ajoute ensuite au body
     **/
    createElt(aCss) {

        if (aCss === '') {
            this.css = `
                .cookie {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 98%;
                    
                    height: 90px;
                    line-height: 20px;
                    text-align:center;
                    
                    margin:5% 2% 2% 2%;
                    background-color : rgba(0,0,0, 0.7);
                    border-top: solid #999 1px;
                    padding: 1% 5px 5px;
                    color: white; opacity: .7;
                    box-shadow: 1px 10px 12px #000000;
                    z-index: 99999;
                }
                
                #btnHide{
                    color:#e97200;
                    text-align:right;
                    text-decoration:none;
                    padding-left:10px;
                }
                    
                .hideCookie{
                    display:none;
                }
                
                .cookie a{
                    color:#f08c00;
                }`;
        } else {

            this.css = aCss;
        }

        let head = document.head || document.getElementsByTagName("head")[0];
        let dvCookie = document.createElement("div");
        let style = document.createElement("style");
        style.type = "text/css";
        if (style.styleSheet) {
            style.styleSheet.cssText = this.css;
        } else {
            style.appendChild(document.createTextNode(this.css));
        }
        head.appendChild(style);
        dvCookie.setAttribute("id", "cookie");
        dvCookie.setAttribute("class", "cookie");
        let spanMsg = document.createElement("span");
        spanMsg.id = "spanMsg";
        spanMsg.innerHTML = this.message;
        //  dvCookie.innerHTML = this.message ;
        let fermer = document.createElement("a");
        fermer.setAttribute("id", "btnHide");
        fermer.setAttribute("class", "btnHide");
        fermer.setAttribute("href", "#");
        fermer.innerHTML = "&#x274C;";
        dvCookie.appendChild(spanMsg);
        dvCookie.appendChild(fermer);
        document.body.appendChild(dvCookie);
    }

    /**
     *  Cache les éléments html
     **/
    hideCookie() {
        if (this.bInit) {
            localStorage.setItem("cookie", "afficheMsg");
            let eltCookie = document.getElementById("cookie");
            eltCookie.setAttribute("class", "hideCookie");
        }
    }

    /* To set legal Text */
    setText(text) {
        let dvCookie = document.getElementById("spanMsg");
        dvCookie.innerHTML = text;
    }
}

//  localStorage.cookie=null; // Dé-commenter pour réinitialiser
