/**
 * jQuery-foswiki: javascript base for foswiki
 * Version: 3.01
 */

/*global XMLHttpRequest:false, StrikeOne:false */

"use strict";
(function($) {

  var foswiki = {
    preferences: {}
  };

  // POSIX character class simulation
  foswiki.RE = {
      // [:upper:]
      upper : "A-Z\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178-\u0179\u017B\u017D\u0181-\u0182\u0184\u0186-\u0187\u0189-\u018B\u018E-\u0191\u0193-\u0194\u0196-\u0198\u019C-\u019D\u019F-\u01A0\u01A2\u01A4\u01A6-\u01A7\u01A9\u01AC\u01AE-\u01AF\u01B1-\u01B3\u01B5\u01B7-\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A-\u023B\u023D-\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E-\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9-\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0-\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E-\u213F\u2145\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D-\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A",

      // [:lower:]
      lower : "a-z\u00AA\u00B5\u00BA\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137-\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148-\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C-\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA-\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9-\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC-\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF-\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F-\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02B8\u02C0-\u02C1\u02E0-\u02E4\u0345\u0371\u0373\u0377\u037A-\u037D\u0390\u03AC-\u03CE\u03D0-\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB-\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE-\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1DBF\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6-\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FC7\u1FD0-\u1FD3\u1FD6-\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6-\u1FF7\u2071\u207F\u2090-\u209C\u210A\u210E-\u210F\u2113\u212F\u2134\u2139\u213C-\u213D\u2146-\u2149\u214E\u2170-\u217F\u2184\u24D0-\u24E9\u2C30-\u2C5E\u2C61\u2C65-\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73-\u2C74\u2C76-\u2C7D\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3-\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7F8-\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A",

      // [:digit:] SMELL: does \d cover the same range?
      digit : "0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19"

  };

  // [:alnum:]
  foswiki.RE.alnum = foswiki.RE.upper + foswiki.RE.lower + foswiki.RE.digit;

  // Special regex for wikiword
  foswiki.RE.wikiword = new RegExp(
          "^[" + foswiki.RE.upper + "]+" +
          "[" + foswiki.RE.lower + foswiki.RE.digit + "]+" +
          "[" + foswiki.RE.upper + "]+" +
          "[" + foswiki.RE.alnum + "]*$");


  /**
   * dummy to be overridden by jquery.debug
   */
  $.log = function(message) {};
  $.fn.debug = function() {};

  /**
   * generates an unique ID.
   */
  foswiki.getUniqueID = function() {
    var uid = new Date().getTime().toString(32),
      i;
    for (i = 0; i < 5; i++) {
      uid += Math.floor(Math.random() * 65535).toString(32);
    }
    return uid;
  };

  /**
   * normalize web and topic. implements Foswiki::normalizeWebTopicName
   */
  foswiki.normalizeWebTopicName = function(web, topic) {
    if (typeof(topic) !== 'undefined') {
      var match = topic.match(/^(.*)[.\/](.*?)$/);
      if (match) {
        web = match[1];
        topic = match[2];
      }
    }
    web = web || foswiki.getPreference("USERSWEB");
    topic = topic || "WebHome"

    return [web, topic];
  };

  /** 
   * space out wiki word
   */
  foswiki.spaceOutWikiWord = function(string, sep) {

    foswiki._lowerUpper = foswiki._lowerUpper || new RegExp("(["+foswiki.RE.lower+"])(["+foswiki.RE.upper+foswiki.RE.digit+"]+)", "g");
    foswiki._numberUpper = foswiki._numberUpper || new RegExp("("+foswiki.RE.digit+")("+foswiki.RE.upper+"+)", "g");
    foswiki._upperLower = foswiki._upperLower || new RegExp("(["+foswiki.RE.upper+"])(["+foswiki.RE.upper+"])(?=["+foswiki.RE.lower+"])", "g");

    sep = sep || ' ';
    string = string || '';

    return string
      .replace(foswiki._lowerUpper, "$1"+sep+"$2")
      .replace(foswiki._numberUpper, "$1"+sep+"$2")
      .replace(foswiki._upperLower, "$1"+sep+"$2");
  };

  /**
   * Get a Foswiki preference value. Preference values can be obtained
   * in three ways; (1) by reference to the pre-loaded foswiki.preferences
   * hash (2) by looking up meta-data or (3) if useServer is true, by using
   * an HTTP call to the server (a.k.a AJAX).
   * @param key name of preference to retrieve
   * @param useServer Allow the function to refer to the server. If this
   * is false, then no http call will be made even if the preference is
   * not available from the preferences has or META tags.
   * @return value of preference, or null if it cannot be determined
   * Note the the HTTP call (when it is implemented) will have to pass
   * the TOPIC and WEB preferences to the server, so it can determine
   * the context of the preference.
   *
   * See System.DefaultPreferences for guidance on extending the content
   * of the preloaded preferences hash under the control of Foswiki plugins.
   */
  foswiki.getPreference = function(key, useServer) {
    var metaVal;

    // Check the preloaded foswiki hash. This is populated with the values
    // listed in the %EXPORTEDPREFERENCES% foswiki preference
    if (typeof(foswiki.preferences[key]) !== 'undefined') {
      return foswiki.preferences[key];
    }

    // Check for a preference passed in a meta tag (this is the classical method)
    metaVal = $("meta[name=\"foswiki." + key + "\"]").attr("content");
    if (typeof(metaVal) !== 'undefined') {
      metaVal = unescape(metaVal);
      // Cache it for future reference
      foswiki.preferences[key] = metaVal;
      return metaVal;
    }

    // Use AJAX to get a preference value from the server. This requires
    // a lot of context information to be passed to the server, and a REST
    // handler on the server, so has not been implemented yet.
    if (useServer) {

      $.ajax({
        url: foswiki.getScriptUrl("view", foswiki.getPreference("SYSTEMWEB"), "JQueryAjaxHelper"),
        data: {
          skin: 'text',
          section: 'expand',
          expression: key,
          scope: foswiki.getPreference("WEB") + "." + foswiki.getPreference("TOPIC")
        },
        async: false,
        dataType: 'text',
        success: function(data, status, xhr) {
          foswiki.preferences[key] = data;
        }
      });

      return foswiki.preferences[key];
    }

    return;
  };

  /**
   * Get pub url path for a specific file
   */
  function _getPubUrl(absolute, web, topic, file, params) {
    var prefName = (absolute?"PUBURL":"PUBURLPATH"),
        url, arr = [];

    url = foswiki.getPreference(prefName) || '/';

    if (typeof(web) !== 'undefined') {
      url += "/"+web.replace(/\./g, "/");
    }

    if (typeof(topic) !== 'undefined') {
      url += "/"+encodeURIComponent(topic);
    }

    if (typeof(file) !== 'undefined') {
      url += "/"+encodeURIComponent(file);
    }

    if (typeof(params) !== 'undefined') {
      $.each(params, function(key, val) {
        arr.push(key+"="+val);
      });

      url += (arr.length?"?"+arr.join("&"):"");
    }

    return url;
  }
  foswiki.getPubUrl = function(web, topic, file, params) {
    return _getPubUrl(1, web, topic, file, params);
  };
  foswiki.getPubUrlPath = function(web, topic, file, params) {
    return _getPubUrl(0, web, topic, file, params);
  };

  /**
   * Get url path for a specific script
   */
  function _getScriptUrl(absolute, script, web, topic, params) {
    var suffix = foswiki.getPreference("SCRIPTSUFFIX") || "",
        scriptUrlPaths = foswiki.getPreference("SCRIPTURLPATHS"),
        url = "", arr = [];

    script = script || '';

    if (absolute) {
      url = foswiki.getPreference("URLHOST");
    }

    if (typeof(scriptUrlPaths[script]) === 'undefined') {    
      url += foswiki.getPreference("SCRIPTURLPATH") + "/" + script + suffix;
    } else {
      url += scriptUrlPaths[script];
    }

    if (typeof(topic) !== 'undefined' && topic.match(/^(.*)(?:\.|\/)(.*?)$/) ) {
      web = RegExp.$1;
      topic = RegExp.$2;
    }

    if (typeof(web) !== 'undefined') {
      url += "/"+web;
    }

    if (typeof(topic) !== 'undefined') {
      url += "/"+topic;
    }

    if (typeof(params) !== 'undefined') {
      $.each(params, function(key, val) {
        arr.push(key+"="+val);
      });

      url += (arr.length?"?"+arr.join("&"):"");
    }


    return url;
  }

  foswiki.getScriptUrl = function(script, web, topic, params) {
    return _getScriptUrl(1, script, web, topic, params);
  };
  foswiki.getScriptUrlPath = function(script, web, topic, params) {
    return _getScriptUrl(0, script, web, topic, params);
  };


  /**
   * Get the content of a META tag from the HEAD block of the document.
   * @param inKey Name of the meta-tag for which to retrieve the content
   *
   * WARNING: this function is DEPRECATED; please use the given jQuery expression directly
   */
  foswiki.getMetaTag = function(inKey) {
    return $("meta[name=" + inKey + "]").attr("content");
  };

  /**
   * Get all elements under root that include the given class.
   * @param inRootElem: HTMLElement to start searching from
   * @param inClassName: CSS class name to find
   * @param inTag: (optional) HTML tag to speed up searching (if not given, a wildcard is used to search all elements)
   * @example:
   * <code>
   * var gallery = document.getElementById('galleryTable');
   * var elems = foswiki.getElementsByClassName(gallery, 'personalPicture');
   * var firstPicture = elems[0];
   * </code>
   *
   * WARNING: this function is DEPRECATED; please use an appropriate jQuery expression directly.
   * The above code can be simplified to
   * <code>
   * var firstPicture = $('#galleryTable .personalPicture')[0];
   * </code>
   */
  foswiki.getElementsByClassName = function(inRootElem, inClassName, inTag) {
    var tag = inTag || '';
    return $(inRootElem).find(tag + "." + inClassName).get();
  };


  /**
   * document ready handler
   */

  $(function() {
    /* Remove 'has no javascript' class from body element (written in template). */
    $('body').removeClass('foswikiNoJs').addClass("foswikiJs");

    /* load foswiki preferences */
    $(".foswikiPreferences").livequery(function() {
      $.extend(true, foswiki.preferences, JSON.parse($(this).html()));
    });

    /* special treatment for NAMEFILTER */
    if (typeof(foswiki.preferences.NAMEFILTER) !== 'undefined') {
      foswiki.preferences.NAMEFILTER = new RegExp(foswiki.preferences.NAMEFILTER, "g");
    }
  });

  /* export */
  window.foswiki = foswiki;
}(jQuery));
