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

    var replTerm = "beef";//prompt('Please enter term to replace');

    findKW(
        document.body,

        // using \\b to only replace when the term is the whole word
        // e.g. if term is "bbb" then "aabbbccc" will not match
        new RegExp('\\b(' + replTerm + ')\\b', 'g'),

        // your replacement function, change URL accordingly
        function (match) {
          var link = document.createElement('a');
          link.href = 'http://google.com/#q=' + match;
          link.target = '_blank';
          link.innerHTML = match;
          return link;
        }
    );
}());
