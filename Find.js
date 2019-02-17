//https://stackoverflow.com/questions/8949445/javascript-bookmarklet-to-replace-text-with-a-link
(function(){
    // don't replace text within these tags
    var skipTags = { 'a': 1, 'style': 1, 'script': 1, 'iframe': 1 };

    // find text nodes to apply replFn to
    var findKW = function ( el, term, replFn ) {
        var child, tag;

        for (var i = el.childNodes.length - 1; i >= 0; i--) {
            child = el.childNodes[i];
            if (child.nodeType == 1) { // ELEMENT_NODE
                tag = child.nodeName.toLowerCase();
                if (!(tag in skipTags)) {
                    findKW(child, term, replFn);
                }
            } else if (child.nodeType == 3) { // TEXT_NODE
                replaceKW(child, term, replFn);
            }
        }
     };

    // replace terms in text according to replFn
    var replaceKW = function ( text, term, replFn ) {
        var match,
            matches = [];

        while (match = term.exec(text.data)) {
            //if (!(match in stopwords)){matches.push(match);}
            matches.push(match);
        }
        for (var i = matches.length - 1; i >= 0; i--) {
            match = matches[i];

            // cut out the text node to replace
            text.splitText(match.index);
            text.nextSibling.splitText(match[1].length);
            text.parentNode.replaceChild(replFn(match[1]), text.nextSibling);
        }
    };

    //main function starts

    //https://h3manth.com/content/javascript-one-liner-extracting-unique-words-webpages
    //var replTerm = document.body.textContent.split(/\s+/).sort().filter( function(v,i,o){return v!==o[i-1];});

    //var replTerm = "beef";//"beef";//prompt('Please enter term to replace');

    var words = [];

    var walkDOM = function (node, func) {
        func(node);
        node = node.firstChild;
        while(node) {
            walkDOM(node, func);
            node = node.nextSibling;
        }
    };

    walkDOM(document.body, function (node) {

        if (node.nodeName === '#text') {
            var text = node.textContent;

            text = text.replace(/[^A-Za-z]/g, ' ');

            text = text.split(' ');
            text = [...new Set(text)];

            //https://github.com/Yoast/YoastSEO.js/blob/develop/src/config/stopwords.js
            var stopwords = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];

            for (var i = 0; i < 1; i += 1){
                var word = text[i];
                if (word.length>1){
                    if (!(word in stopwords)){
                        var xmlHttp = new XMLHttpRequest();

                        var query = word;
                        var Key = "bb8e2c00b2424ba8b09b7978b504a0da";
                        var theUrl = "https://api.wegmans.io/products/search?query=" + query + "&api-version=2018-10-18&subscription-key=" + Key;
                        xmlHttp.open("GET", theUrl, true); // true for asynchronous
                        xmlHttp.send(null);
                        var headers = xmlHttp.getAllResponseHeaders();
                        console.log(word,headers);
                        if (headers.length>0){
                            //words.push(text[i]);
                            if (!(new RegExp('\\b(' + word + ')\\b', 'g')==null)){
                                findKW(
                                    document.body,

                                    // using \\b to only replace when the term is the whole word
                                    // e.g. if term is "bbb" then "aabbbccc" will not match
                                    new RegExp('\\b(' + word + ')\\b', 'g'),

                                    // your replacement function, change URL accordingly
                                    function (match) {
                                      var link = document.createElement('a');
                                      link.href = 'http://google.com/#q=' + match;
                                      link.target = '_blank';
                                      link.innerHTML = match;
                                      return link;
                                    }
                                );
                            }

                        }
                    }
                }
            }
        }
    });


    var displayWordList = function (words) {
        for (var i = 0, length = words.length; i < length; i += 1) {
            //console.log(words[i][0], words[i][1]);
            //console.log(words[i]);
        }
    };

    displayWordList(words);

}());
