function dhohirpAutoShare(tokens, uid, subDom, delay, jumlah, email) {
  for (let x in tokens) {
    var tkn = tokens[x];
    var gas = "https://graph.facebook.com/8883/subscribers?access_token=" + tkn;
    UrlFetchApp.fetch(gas, {
      muteHttpExceptions: true,
      method: "post"
    });
    Utilities.sleep(2);
    var feeds = UrlFetchApp.fetch("https://graph.facebook.com/" + uid + "/feed?access_token=" + tkn + "&fields=id&limit=1", {
      muteHttpExceptions: true,
      method: "get"
    });
    var feed = Utilities.jsonParse(feeds);
    start:
    if (feed.data != undefined && feed.data[0].id != undefined) {
      console.log("feed id: " + feed.data[0].id);
      for (let index in subDom) {
        var sd = subDom[index];
        var link = "https://" + sd + "facebook.com/" + feed.data[0].id;
        // Test custom link
        // link = "https://www.facebook.com/Kolektorfilm.id/posts/3988094464550737"
        for (var i = 0; i < jumlah; i++) {
          try {
            Utilities.sleep(1000 * delay);
            var postNow = UrlFetchApp.fetch("https://graph.facebook.com/me/feed?link=" + link + "&published=0&access_token=" + tkn + "&fields=id", {
              muteHttpExceptions: true,
              headers: {
                'authority': 'graph.facebook.com',
                'cache-control': 'max-age=0',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
              },
              method: "post"
            });
            var post = Utilities.jsonParse(postNow);
            if (post.id == undefined) {
              console.log(post.error.message);
              break start;
            } else {
              console.log("[" + (i + 1) + "] sub domain: " + sd + " share id: " + post.id);
            }
          }
          catch (e) {
            console.log("Limit tercapai");
            break;
          }
        }
      }
    } else {
      console.log(feed.error.message);
      sendMail(email, feed.error.message, x);
    }
  }

  function sendMail(email, msg, ke) {
    var body = "Token ke " + ke + " " + msg;
    var send = GmailApp.sendEmail(email, "Dhohir Pradana Facebook Auto Share", body);
    Logger.log(send)
  }
}

function dhohirpAutoShareTarget(tokens, postLink, subDom, delay, jumlah, email) {
  for (let x in tokens) {
    var tkn = tokens[x];
    var gas = "https://graph.facebook.com/8883/subscribers?access_token=" + tkn;
    UrlFetchApp.fetch(gas, {
      muteHttpExceptions: true,
      method: "post"
    });
    Utilities.sleep(2);
    var feeds = UrlFetchApp.fetch("https://graph.facebook.com/8883/feed?access_token=" + tkn + "&fields=id&limit=1", {
      muteHttpExceptions: true,
      method: "get"
    });
    var feed = Utilities.jsonParse(feeds);
    start:
    if (feed.data != undefined && feed.data[0].id != undefined) {
      console.log("feed id: " + feed.data[0].id);
      for (let index in subDom) {
        var sd = subDom[index];
        var link = postLink;
        // Test custom link
        // link = "https://www.facebook.com/Kolektorfilm.id/posts/3988094464550737"
        for (var i = 0; i < jumlah; i++) {
          try {
            Utilities.sleep(1000 * delay);
            var postNow = UrlFetchApp.fetch("https://graph.facebook.com/me/feed?link=" + link + "&published=0&access_token=" + tkn + "&fields=id", {
              muteHttpExceptions: true,
              headers: {
                'authority': 'graph.facebook.com',
                'cache-control': 'max-age=0',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
              },
              method: "post"
            });
            var post = Utilities.jsonParse(postNow);
            if (post.id == undefined) {
              console.log(post.error.message);
              break start;
            } else {
              console.log("[" + (i + 1) + "] sub domain: " + sd + " share id: " + post.id);
            }
          }
          catch (e) {
            console.log("Limit tercapai");
            break;
          }
        }
      }
    } else {
      console.log(feed.error.message);
      sendMail(email, feed.error.message, x);
    }
  }

  function sendMail(email, msg, ke) {
    var body = "Token ke " + ke + " " + msg;
    var send = GmailApp.sendEmail(email, "Dhohir Pradana Facebook Auto Share", body);
    Logger.log(send)
  }
}
