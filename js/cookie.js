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

const legacyCss = `
    .cookie {
        display: grid;
        place-content: center;
        position: fixed;          
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px;
        background-color : #000a;
        box-shadow: 0 0 12px #000000;
        opacity: .7;
        z-index: 99999;
    }
    
    p {
        color: white; 
        line-height: 20px;
        text-align:center;
        width: 100%;
    }
    
    #btnHide {
        transition: 0.5s ease-in-out;
        text-decoration: none;
        margin-left: 5px;
    }
    
    .hideCookie {
        display: none;
    }
                    
    .cookie a {
        color: #f08c00;
        text-decoration: underline;
    }
    
    .cookie a:hover {
        text-decoration: underline dotted;
    }
    
    .cookie p span {
        white-space: nowrap;
    }
`;

/**
 * Objet permettant de gérer le message d' acceptation des cookies.
 */
class Cookie {

    constructor(language = "fr", customCSS= null) {
        this.langue = language;

        this.setMessage();
        this.bInit = false;
        this.init(customCSS);
    }

    setMessage() {
        switch (this.langue) {
            case "fr":
                this.message = `
                    En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies pour disposer de 
                    services adaptés à vos centres d' intérêts.
                    <span>
                        <a href='https://www.google.com/intl/fr/policies/technologies/cookies/'>En savoir plus</a>
                    </span>
                `;
                break;
            case "en":
                this.message = `
                    By continuing to browse this site, you accept the use of cookies to provide services tailored to 
                    your interests.
                    <span>
                        <a href='https://www.google.com/intl/en/policies/technologies/cookies/'>Know more</a>
                    </span>                    
                `;
                break;

            default:
                this.message = `
                    By continuing to browse this site, you accept the use of cookies to provide services tailored to
                     your interests.
                    <span>
                        <a href='https://www.google.com/intl/en/policies/technologies/cookies/'>Know more</a>
                    </span>
                `;
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
    init(customCss) {
        this.createElt(customCss);

        let btnHide = document.getElementById("btnHide");

        btnHide.onclick = () => {
            localStorage.setItem("cookie", "afficheMsg");
            let eltCookie = document.getElementById("cookie");
            eltCookie.setAttribute("class", "hideCookie");
        };

        if (
            Storage === null || localStorage.cookie !== null &&
            localStorage.cookie !== "undefined" && localStorage.cookie === "afficheMsg"
        ) {
            this.hideCookie();
        }

        this.bInit = true;
    }

    /**
     *  Création des éléments HTML et css que l' on ajoute ensuite au body
     **/
    createElt(customCss) {
        this.css = (customCss === null) ? legacyCss : customCss;

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

        let pMsg = document.createElement("p");
        pMsg.id = "pMsg";
        pMsg.innerHTML = this.message;

        // dvCookie.innerHTML = this.message ;
        let fermer = document.createElement("a");
        fermer.setAttribute("id", "btnHide");
        fermer.setAttribute("class", "btnHide");
        fermer.setAttribute("href", "#");
        fermer.innerHTML = "&#x274C;";

        let spanMsg = pMsg.getElementsByTagName("span")[0];
        spanMsg.appendChild(fermer);

        dvCookie.appendChild(pMsg);
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
        let dvCookie = document.getElementById("pMsg");
        dvCookie.innerHTML = text;
    }
}

//  localStorage.cookie=null; // Dé-commenter pour réinitialiser
