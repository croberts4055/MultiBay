    // Parse the response and build an HTML table to display search results
    function _cb_findItemsByKeywords(root) {

        var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        var html = [];
        html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
        for (var i = 0; i < items.length; ++i) {
            var item = items[i];
            var title = item.title;
            var pic = item.galleryURL;
            var viewitem = item.viewItemURL;
            var selling = item.sellingStatus[0].currentPrice[0]['__value__']
            var startTime = item.listingInfo[0].startTime;
            var endTime = item.listingInfo[0].endTime;
            var shippingInfo = item.shippingInfo[0]
            var listingInfo = item.listingInfo[0]
            var timeLeft = item.watchCount;



            if (null != title && null != viewitem) {
                
                html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
                    '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td>' + '<td>' + "Unit Price:" + selling +
                    '<br>' + "Start Time: " + startTime +
                    '<br>' + "End Time: " + endTime +
                    '<br>' + "Time Left: " + timeLeft + '</td></tr>');

            }
        }
        html.push('</tbody></table>');
        document.getElementById("results").innerHTML = html.join("");
    } // End _cb_findItemsByKeywords() function


    // // Create a JavaScript array of the item filters you want to use in your request
    // var filterarray = [{
    //         "name": "MaxPrice",
    //         "value": "25",
    //         "paramName": "Currency",
    //         "paramValue": "USD"
    //     },
    //     {
    //         "name": "FreeShippingOnly",
    //         "value": "true",
    //         "paramName": "",
    //         "paramValue": ""
    //     },
    //     {
    //         "name": "ListingType",
    //         "value": ["AuctionWithBIN", "FixedPrice"],
    //         "paramName": "",
    //         "paramValue": ""
    //     },
    // ];

    // Define global variable for the URL filter
    var urlfilter = "";

    // Generates an indexed URL snippet from the array of item filters
    function buildURLArray() {
        // Iterate through each filter in the array
        for (var i = 0; i < filterarray.length; i++) {
            //Index each item filter in filterarray
            var itemfilter = filterarray[i];
            // Iterate through each parameter in each item filter
            for (var index in itemfilter) {
                // Check to see if the paramter has a value (some don't)
                if (itemfilter[index] !== "") {
                    if (itemfilter[index] instanceof Array) {
                        for (var r = 0; r < itemfilter[index].length; r++) {
                            var value = itemfilter[index][r];
                            urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                        }
                    } else {
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                    }
                }
            }
        }
    } // End buildURLArray() function

    // Execute the function to build the URL filter

    function ebayStart() {

        var productName = document.getElementById('productName').value.toString();
        var searchNum = document.getElementById('searchNumber').value.toString();
        var country = document.getElementById('country').value.toString();


        // Allows app to change ebay country on demand. 

        if (country == "United States") {
            country = "US";
        } else if (country == "Australia") {
            country = "AU";
        } else if (country == "Austria") {
            country = "AT";
        } else if (country == "Belgium(Dutch)") {
            country = "NLBE";
        } else if (country == "Belgium(French)") {
            country = "FRBE";
        } else if (country == "Canada(English)") {
            country = "ENCA";
        } else if (country == "Canada(French)") {
            country = "FRCA";
        } else if (country == "France") {
            country = "FR";
        } else if (country == "Germany") {
            country = "DE";
        } else if (country == "Hong Kong") {
            country = "HK";
        } else if (country == "India") {
            country = "IN";
        } else if (country == "Ireland") {
            country = "IE";
        } else if (country == "Italy") {
            country = "IT";
        } else if (country == "Malaysia") {
            country = "MY";
        } else if (country == "Motors") {
            country = "MOTOR";
        } else if (country == "Netherlands") {
            country = "NL";
        } else if (country == "Philippines") {
            country = "PH";
        } else if (country == "Poland") {
            country = "PL";
        } else if (country == "Singapore") {
            country = "SG";
        } else if (country == "Spain") {
            country = "ES";
        } else if (country == "Switzerland") {
            country = "CH";
        } else if (country == "United Kingdom") {
            country = "GB";
        }

        // Construct the request
        var url = "http://svcs.ebay.com/services/search/FindingService/v1";
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=Christop-Marketpl-PRD-951ca6568-761cc9c7";
        url += "&GLOBAL-ID=EBAY-" + country;
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=_cb_findItemsByKeywords";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + productName;
        url += "&paginationInput.entriesPerPage=" + searchNum;

        url += urlfilter;


        // Submit the request
        s = document.createElement('script'); // create script element
        s.src = url;

        document.body.appendChild(s);



    }
    // Grabs whatever is in the productName textbox and does an amazon search for you in a new window. 
    function amazonSearch() {

        var productName2 = document.getElementById('productName').value.toString();
        if (productName2 == "") {
            return;
        } else {
            var searchURL = "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + productName2;
            window.open(searchURL);
        }

    }
    // Grabs whatever is in the productName textbox and does a youtube search for a review of the product. 
    function youtubeSearch() {
        var productName3 = document.getElementById('productName').value.toString();

        if (productName3 == "") {
            return;
        } else {
            var searchURL2 = "https://www.youtube.com/results?search_query=" + productName3 + " review";
            window.open(searchURL2);
        }


    }   