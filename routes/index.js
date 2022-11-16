var express = require('express');
var router = express.Router();
var request = require('request');
const cheerio = require("cheerio");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('public/index.html');
});

router.get('/api', function (req, resx, next) {
  let url = req.url;
  let search = url.substring(url.indexOf('search=') + 7, url.length)


  var options = {
    'method': 'GET',
    'url': 'https://www.etsy.com/search?q=' + search,
    'headers': {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Cookie': 'overlay_popup_22=1; comp_name_stylescore=Apple; _ga=GA1.2.1079407753.1655088432; _fbp=fb.1.1655088432558.1257136688; _vwo_uuid_v2=DEF0DB16B4108A30AB77F4BFB752E4B47|c63902968197b30e4c338dd594234479; _vwo_uuid=DEF0DB16B4108A30AB77F4BFB752E4B47; _vwo_ds=3%241655088437%3A52.78843078%3A%3A; PHPSESSID=0l49dh90nbf7lfk91h7gju04qp; user_session=823f545912c82bd3794b8e4509786e87; _gid=GA1.2.1186449360.1657201155; AMCVS_3064401053DB594D0A490D4C%40AdobeOrg=1; AMCV_3064401053DB594D0A490D4C%40AdobeOrg=77933605%7CMCIDTS%7C19181%7CMCMID%7C77125065000181584651944123123171359166%7CMCAAMLH-1657805955%7C9%7CMCAAMB-1657805955%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1657208355s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.5.1; s_vnum=1659326400822%26vn%3D1; s_gapv=Logged%20Out; undefined_s=First%20Visit; s_invisit=true; s_v17=DEF; s_cm=Other%20Natural%20Referrersundefinedwww.google.com; s_cc=true; __gpi=UID=000005fb30c9976d:T=1655088433:RT=1657201156:S=ALNI_MZTPe-bIJT_V5nrqr8-GuWUHp3YTA; HomeTradeBanner=1; recentQuotes=AAPL%2COMF; TS010e8c7a=0128dc3c31b3b3f878ee46f76432fb3b110821645b80bcd22311fe2cfafe687e47f5dae101a67a670cb422e1d75ad3ff6c32219d7d6597a6dfe6ffa8c2cf5bdcbf76eb263015fc6340457063fa08ba47445af24f3f7aedf318ddb2a9d122b17cb1b75932d4; s_cpc=0; _vis_opt_test_cookie=1; _vis_opt_s=2%7C; TS00000000076=08d01cef9bab28005c4a67387e473833178f42f6a2f3b9f004b8b6e4a1f78e0dc1dbd010f9296090774d795dac214a8b083c1fd85a09d00086c7d54b4233a3e502dc0c199aae35e298f39584c78662b7cfd1b1440cb262fca7d30c79383455db45b04acb9d82cbc4bea538c5b1fc371dbc6123f6ca8017fde931c00afdd951ecb6dbb485ed07caa7ecde859c05c1f255490b3505f0f22360c233fbd0a43513c06f778b79f2efcae5b81b7f2a6513432c0c2fe2f60a70d7165195c83219d1ae234e1fdff91dca3ad80095fdcc168fcd8e92594ea5af4535521b8b8d84920ef5481282407afd86a0a2b893eb29731cd836d3326117422323e5cc51aaeabdcf2d00859886f9970b4fbd; TSPD_101_DID=08d01cef9bab28005c4a67387e473833178f42f6a2f3b9f004b8b6e4a1f78e0dc1dbd010f9296090774d795dac214a8b083c1fd85a063800219ea77a7ea423627fbdee44d8092955d48ec0d7a234b4d818e35f46abf31ee1b69016e3ed9cdf09dd93af32fee76e9f480c22839c13597d; _pbjs_userid_consent_data=6683316680106290; pbjs_sharedId=a0aa22e4-ee0c-4956-9536-3eeb1ffed697; pbjs_unifiedID=%7B%22TDID%22%3A%227d7f13ef-64f2-429f-8f76-3d3baf2b47e5%22%2C%22TDID_LOOKUP%22%3A%22TRUE%22%2C%22TDID_CREATED_AT%22%3A%222022-06-07T13%3A39%3A31%22%7D; id5id=%7B%22created_at%22%3A%222022-06-09T19%3A07%3A25.159Z%22%2C%22id5_consent%22%3Atrue%2C%22original_uid%22%3A%22ID5*FVRBviMksThk242VGPn9nY9b_MzwnXOjmFHqQOTNlgMZYaDn0gPRgmtWK9oZQxWE%22%2C%22universal_uid%22%3A%22ID5*-PGDVp97qkLG90umzqwSNuoWZQG2iETM4LpG0AaK5qkZYWh6Uyxziz4p8yWcaVKS%22%2C%22signature%22%3A%22ID5_AVMhH0OW7SdmA6VQVkV8ykJjv6Wp4ezX2KHrLtDVXQ0rv7tZc0tFbzKjazqh_DgabT89Qvl2wErfPnFxbeD-olk%22%2C%22link_type%22%3A2%2C%22cascade_needed%22%3Afalse%2C%22privacy%22%3A%7B%22jurisdiction%22%3A%22other%22%2C%22id5_consent%22%3Atrue%7D%7D; pbjs_fabrickId=%7B%22fabrickId%22%3A%22E1%3AK4Lq8tHDey5jfcx6O_8ZHgr5clMIEyQQqMetYejBor6L6Na7fUNwufnQcorp6riEAxYOYzNF1Hz1ApmHbe_YN6lV5OSdcocDX1HiCaxTOAuhx4Vn_Qn_Gem5RvZqpk3Z%22%7D; TSPD_101=08d01cef9bab2800ef124fe1fed4bd2db60fac4e2cb5e1f649cc647720dffd78f52c78668551007be4b1b994dc7da89208ac19aa250518003e95e59545ae50611298cca0e51bc3a73a6eb73bb12b39ab; _vwo_sn=2112724%3A3; s_nr=1657201199800-Repeat; s_p42=stock%3A%20quote%3A%20aapl; TS0322a645029=08d01cef9bab28002c94fd915ea7297ad5e8f060edd685771bf8940e63ec38409028a4f4edc667953a8a573886ffa446; TS031604a1027=08d01cef9bab2000a97e1109d2618ecfcf2b608e8bac8650a5417a6135d69a6224c93dad0eb122940873fb1ff31130005d88ac8cc482c4dfd84bce739b61ba115421eb1ca364da4300dd97f11299626f0fe615e96bafb808b033b6b2305d7016; TS0322a645077=08d01cef9bab280092a01fb1bbae73566063951eff66eac6a659699e23640790f5e61800c99ebca13858f0fc847a56b30880cd6084172000fe2d845a1cdc6becbb7cad31af98d59336e0adb2a8be80ae01f8622e544b94ed; FCNEC=[["AKsRol8wE_4CWU_iseBOPFLVbEbDt7w89gCFqZzpuamDEH9aaXe8f0BhhHKqI4fC-3qmp1uz4F62fjf-nrXWEuFDxOGR8MlH8mcXB5XvnVC3fb4s2LYiigDbcwOu9BbmfAnUwT2jNPd8EGOhzWCTFjNdjLisgDtZlA=="],null,[]]; __gads=ID=9f50b921317ca43d:T=1655088433:S=ALNI_MZNO6TTdCwigKC7Fcc8met8dBDf8A',
      'Referer': 'https://www.zacks.com/stock/quote/OMF?q=OMF',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"'
    }
  };
  console.log(options['url'])
  request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    res = response.body;
    var $ = cheerio.load(res);
    const linkObjects = $('a');
    // this is a mass object, not an array

    // Collect the "href" and "title" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      let href = $(element).attr('href')
      if (href != null) {
        if (href.indexOf('https://www.etsy.com/listing/') != -1) {
          links.push(href)
        }
      }

    });
    const data = []
    for (let i = 0; i < 3; i++) {
      request(links[i], function (error, response, body) {
        var listingData = []
        listingData.push(links[i])

        //console.log(links[i])
        //console.log(body)
        $ = cheerio.load(body);
        var title = $('h1').first().text()

        var images = $('img')
        images.each((index, element) => {
          var elem = $(element)
          if (elem.attr('class').indexOf('wt-max-width-full wt-horizontal-center wt-vertical-center carousel-image wt-rounded') != -1) {
            if (listingData.length < 2 && elem.attr('src') != undefined) {
              listingData.push(elem.attr('src'))
            }


          }
        });
        //console.log(title)
        listingData.push(title)
        var hthrees = $('h3')
        var tags = []
        hthrees.each((index, element) => {
          var elem = $(element)
          if (elem.attr('class').indexOf('tag-card-title') != -1) {
            tags.push(elem.attr('title'))
          }
        });
        //console.log(tags)
        listingData.push(tags)
        data.push(listingData)
        if (data.length > 2) {
          console.log(data)
          resx.send(data)
        }


      });


    }


  });


});

module.exports = router;
