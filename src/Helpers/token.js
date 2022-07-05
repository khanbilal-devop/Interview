const TOKEN_KEY = "interview";

export const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 9 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    window.name = JSON.stringify(getAllCookies());
  };
  

export const storeToken = (token) => {
    setCookie(TOKEN_KEY, token, 1);
};


const getAllCookies = () => {
    const pairs = document.cookie.split(";");
    let cookies = {};
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split("=");
      cookies[(pair[0] + "").trim()] = unescape(pair[1]);
    }
    return cookies;
  };
  
  
  export const getToken = () => {
    return getCookie(TOKEN_KEY) || "";
  };

  const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };


  export const getHeader = () => {
    return {
      Authorization: "Bearer " + getToken(),
    };
  };
  
  export const deleteToken = () => {
    deleteCookie(TOKEN_KEY);
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  