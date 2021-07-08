# Cookie.js

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b709f9cc229649e7aa2ff9abd722849b)](https://www.codacy.com/gh/frannuaire/cookie/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=frannuaire/cookie&amp;utm_campaign=Badge_Grade) [![Code Grade](https://www.code-inspector.com/project/24557/status/svg)](https://frontend.code-inspector.com/public/project/24557/cookie/dashboard)

Cookie.js display and hide cookies message in French or English website requirements.

## Get started

-   Include your cookie.js file at the end of your html file (`body`)
-   Make an Instance of cookie

```html

<script src='js/cookie.js'></script>
<script>
    window.onload = () => {
        let monCookie = new Cookie('fr');
    };
</script>
```

You should see this message appears on the top of your web page.

![message](exemple-message.png)    
