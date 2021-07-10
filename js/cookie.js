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
        margin-left: 4px;
        white-space: nowrap;
    }
`;

/*  An Object that handle cookie message box */
class Cookie {

    constructor(language = "fr", customCSS= null) {
        this.lang = language;
        this.setMessage();

        this.init(customCSS);
    }

    setMessage() {
        switch (this.lang) {
            case "fr":
                this.message = `En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies pour disposer de services adaptés à vos centres d' intérêts.`;
                this.btnText = `En savoir plus`;
                break;

            default:
                this.message = `By continuing to browse this site, you accept the use of cookies to provide services tailored to your interests.`;
                this.btnText = `Know more`;
                break;
        }
    }

    /*  we just use two language for the moment. */
    getMessage() {
        return this.message;
    }

    /* Testing whether the cookie should be displayed or hidden */
    init(customCss) {
        // Cancel Box creation when cookie are already accepted.
        if (localStorage.cookie === "accepted") return

        this.createElt(customCss);
    }

    /*  Html elements and style creation which are added to body. */
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

        let btnMore = document.createElement("a");
        btnMore.setAttribute("href", `https://www.google.com/intl/${this.lang}/policies/technologies/cookies/`);
        btnMore.innerHTML = this.btnText;

        let btnClose = document.createElement("a");
        btnClose.setAttribute("id", "btnHide");
        btnClose.setAttribute("class", "btnHide");
        btnClose.setAttribute("href", "#");
        btnClose.onclick = this.hideCookie;
        btnClose.innerHTML = "&#x274C;";

        let spanMsg = document.createElement("span");
        spanMsg.appendChild(btnMore);
        spanMsg.appendChild(btnClose);
        pMsg.appendChild(spanMsg);

        dvCookie.appendChild(pMsg);
        document.body.appendChild(dvCookie);
    }

    /* Hide cookie element */
    hideCookie() {
        localStorage.setItem("cookie", "accepted");
        let eltCookie = document.getElementById("cookie");
        eltCookie.setAttribute("class", "hideCookie");
    }

    /* Set legal Text */
    setText(text) {
        let dvCookie = document.getElementById("pMsg");
        dvCookie.innerHTML = text;
    }
}

//  localStorage.cookie=null; // Dé-commenter pour réinitialiser
