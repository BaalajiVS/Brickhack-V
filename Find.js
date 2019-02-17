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
            }
            else if (child.nodeType == 3) { // TEXT_NODE
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

    function dynamicallyLoadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";  // set its src to the provided URL

        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    dynamicallyLoadScript();


    //main function starts

    //https://h3manth.com/content/javascript-one-liner-extracting-unique-words-webpages
    //var replTerm = document.body.textContent.split(/\s+/).sort().filter( function(v,i,o){return v!==o[i-1];});

    //var replTerm = "beef";//"beef";//prompt('Please enter term to replace');

    //var words = [];

    var walkDOM = function (node, func) {
        func(node);
        node = node.firstChild;
        while(node) {
            walkDOM(node, func);
            node = node.nextSibling;
        }
    };

    walkDOM(document.body, function (node) {
        console.log("DBYJAW WALK DOM YEAHHH");

        if (node.nodeName === '#text') {
            var text = node.textContent;

            text = text.replace(/[^A-Za-z]/g, ' ');

            text = text.split(' ');
            text = [...new Set(text)];

            //https://github.com/Yoast/YoastSEO.js/blob/develop/src/config/stopwords.js
            // var stopwords = [ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];
            var startwords = ['acorn squash', 'alfalfa sprouts', 'almond', 'anchovy', 'anise', 'appetite', 'appetizer', 'apple', 'apricot', 'artichoke', 'asparagus', 'aspic', 'ate', 'avocado', 'bacon', 'bagel', 'bake', 'baked Alaska', 'bamboo shoots', 'banana', 'barbecue', 'barley', 'basil', 'batter', 'beancurd', 'beans', 'beef', 'beet', 'bell pepper', 'berry', 'biscuit', 'bitter', 'black beans', 'black tea', 'black-eyed peas', 'blackberry', 'bland', 'blood orange', 'blueberry', 'boil', 'bowl', 'boysenberry', 'bran', 'bread', 'breadfruit', 'breakfast', 'brisket', 'broccoli', 'broil', 'brown rice', 'brownie', 'brunch', 'Brussels sprouts', 'buckwheat', 'buns', 'burrito', 'butter', 'butter bean', 'cake', 'calorie', 'candy', 'candy apple', 'cantaloupe', 'capers', 'caramel', 'caramel apple', 'carbohydrate', 'carrot', 'cashew', 'cassava', 'casserole', 'cater', 'cauliflower', 'caviar', 'cayenne pepper', 'celery', 'cereal', 'chard', 'cheddar', 'cheese', 'cheesecake', 'chef', 'cherry', 'chew', 'chick peas', 'chicken', 'chili', 'chips', 'chives', 'chocolate', 'chopsticks', 'chow', 'chutney', 'cilantro', 'cinnamon', 'citron', 'citrus', 'clam', 'cloves', 'cobbler', 'coconut', 'cod', 'coffee', 'coleslaw', 'collard greens', 'comestibles', 'cook', 'cookbook', 'cookie', 'corn', 'cornflakes', 'cornmeal', 'cottage cheese', 'crab', 'crackers', 'cranberry', 'cream', 'cream cheese', 'crepe', 'crisp', 'crunch', 'crust', 'cucumber', 'cuisine', 'cupboard', 'cupcake', 'curds', 'currants', 'curry', 'custard', 'daikon', 'daily bread', 'dairy', 'dandelion greens', 'Danish pastry', 'dates', 'dessert', 'diet', 'digest', 'digestive system', 'dill', 'dine', 'diner', 'dinner', 'dip', 'dish', 'dough', 'doughnut', 'dragonfruit', 'dressing', 'dried', 'drink', 'dry', 'durian', 'eat', 'Edam cheese', 'edible', 'egg', 'eggplant', 'elderberry', 'endive', 'entree', 'fast', 'fat', 'fava beans', 'feast', 'fed', 'feed', 'fennel', 'fig', 'fillet', 'fire', 'fish', 'flan', 'flax', 'flour', 'food', 'food pyramid', 'foodstuffs', 'fork', 'freezer', 'French fries', 'fried', 'fritter', 'frosting', 'fruit', 'fry', 'garlic', 'gastronomy', 'gelatin', 'ginger', 'ginger ale', 'gingerbread', 'glasses', 'Gouda cheese', 'grain', 'granola', 'grape', 'grapefruit', 'grated', 'gravy', 'green bean', 'green tea', 'greens', 'grub', 'guacamole', 'guava', 'gyro', 'halibut', 'ham', 'hamburger', 'hash', 'hazelnut', 'herbs', 'honey', 'honeydew', 'horseradish', 'hot', 'hot dog', 'hot sauce', 'hummus', 'hunger', 'hungry', 'ice', 'ice cream', 'ice cream cone', 'iceberg lettuce', 'iced tea', 'icing', 'jackfruit', 'jalapeño', 'jam', 'jelly', 'jellybeans', 'jicama', 'jimmies', 'Jordan almonds', 'jug', 'juice', 'julienne', 'junk food', 'kale', 'kebab', 'ketchup', 'kettle', 'kettle corn', 'kidney beans', 'kitchen', 'kiwi', 'knife', 'kohlrabi', 'kumquat', 'ladle', 'lamb', 'lard', 'lasagna', 'legumes', 'lemon', 'lemonade', 'lentils', 'lettuce', 'licorice', 'lima beans', 'lime', 'liver', 'loaf', 'lobster', 'lollipop', 'loquat', 'lox', 'lunch', 'lunch box', 'lunchmeat', 'lychee', 'macaroni', 'macaroon', 'main course', 'maize', 'mandarin orange', 'mango', 'maple syrup', 'margarine', 'marionberry', 'marmalade', 'marshmallow', 'mashed potatoes', 'mayonnaise', 'meat', 'meatball', 'meatloaf', 'melon', 'menu', 'meringue', 'micronutrient', 'milk', 'milkshake', 'millet', 'mincemeat', 'minerals', 'mint', 'mints', 'mochi', 'molasses', 'mole sauce', 'mozzarella', 'muffin', 'mug', 'munch', 'mushroom', 'mussels', 'mustard', 'mustard greens', 'mutton', 'napkin', 'nectar', 'nectarine', 'nibble', 'noodles', 'nosh', 'nourish', 'nourishment', 'nut', 'nutmeg', 'nutrient', 'nutrition', 'nutritious', 'oatmeal', 'oats', 'oil', 'okra', 'oleo', 'olive', 'omelet', 'omnivore', 'onion', 'orange', 'order', 'oregano', 'oven', 'oyster', 'pan', 'pancake', 'papaya', 'parsley', 'parsnip', 'pasta', 'pastry', 'pate', 'patty', 'pattypan squash', 'pea', 'pea pod', 'peach', 'peanut', 'peanut butter', 'pear', 'pecan', 'pepper', 'pepperoni', 'persimmon', 'pickle', 'picnic', 'pie', 'pilaf', 'pineapple', 'pita bread', 'pitcher', 'pizza', 'plate', 'platter', 'plum', 'poached', 'pomegranate', 'pomelo', 'pop', 'popcorn', 'popovers', 'popsicle', 'pork', 'pork chops', 'pot', 'pot roast', 'potato', 'preserves', 'pretzel', 'prime rib', 'protein', 'provisions', 'prune', 'pudding', 'pumpernickel', 'pumpkin', 'punch', 'quiche', 'quinoa', 'radish', 'raisin', 'raspberry', 'rations', 'ravioli', 'recipe', 'refreshments', 'refrigerator', 'relish', 'restaurant', 'rhubarb', 'ribs', 'rice', 'roast', 'roll', 'rolling pin', 'romaine', 'rosemary', 'rye', 'saffron', 'sage', 'salad', 'salami', 'salmon', 'salsa', 'salt', 'sandwich', 'sauce', 'sauerkraut', 'sausage', 'savory', 'scallops', 'scrambled', 'seaweed', 'seeds', 'sesame seed', 'shallots', 'sherbet', 'shish kebab', 'shrimp', 'slaw', 'slice', 'smoked', 'snack', 'soda', 'soda bread', 'sole', 'sorbet', 'sorghum', 'sorrel', 'soup', 'sour', 'sour cream', 'soy', 'soy sauce', 'soybeans', 'spaghetti', 'spareribs', 'spatula', 'spices', 'spicy', 'spinach', 'split peas', 'spoon', 'spork', 'sprinkles', 'sprouts', 'spuds', 'squash', 'squid', 'steak', 'stew', 'stir-fry', 'stomach', 'stove', 'straw', 'strawberry', 'string bean', 'stringy', 'strudel', 'sub sandwich', 'submarine sandwich', 'succotash', 'suet', 'sugar', 'summer squash', 'sundae', 'sunflower', 'supper', 'sushi', 'sustenance', 'sweet', 'sweet potato', 'Swiss chard', 'syrup', 'taco', 'take-out', 'tamale', 'tangerine', 'tapioca', 'taro', 'tarragon', 'tart', 'tea', 'teapot', 'teriyaki', 'thyme', 'toast', 'toaster', 'toffee', 'tofu', 'tomatillo', 'tomato', 'torte', 'tortilla', 'tuber', 'tuna', 'turkey', 'turmeric', 'turnip', 'ugli fruit', 'unleavened', 'utensils', 'vanilla', 'veal', 'vegetable', 'venison', 'vinegar', 'vitamin', 'wafer', 'waffle', 'walnut', 'wasabi', 'water', 'water chestnut', 'watercress', 'watermelon', 'wheat', 'whey', 'whipped cream', 'wok', 'yam', 'yeast', 'yogurt', 'yolk', 'zucchini'];
            for (var i = 0; i < text.length; i += 1){
                var word = text[i];

                // if (word in startwords){
                if (1){
                    // var xmlHttp = new XMLHttpRequest();
                    console.log("At least it enters");

                    var query = word;
                    var Key = "bb8e2c00b2424ba8b09b7978b504a0da";
                    var theUrl = "https://api.wegmans.io/products/search?query=" + query + "&api-version=2018-10-18&subscription-key=" + Key;
                    // xmlHttp.open("GET", theUrl, true); // true for asynchronous
                    // xmlHttp.send(null);
                    // var headers = xmlHttp.getAllResponseHeaders();

                    $.ajax({
                        type: "POST",
                        url: theUrl,
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(requestJson),
                        success: function(data) {
                            console.log('SUCCESS');
                            console.log(data);
                        },
                        error: function() {
                            console.log('FAILED');
                        }
                    });


                    // console.log(word,headers);
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
    });

}());
