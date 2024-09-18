(function() {
    // Create a style element
    var style = document.createElement('style');
    style.textContent = `
        .roi-calculator-widget {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .roi-calculator-widget input {
            width: calc(100% - 20px);
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .roi-calculator-widget button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 10px;
        }
        .roi-calculator-widget #result {
            margin-top: 20px;
            font-weight: bold;
        }
        .roi-calculator-widget .input-group {
            margin-bottom: 15px;
        }
        .roi-calculator-widget label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .roi-calculator-widget #shareLink {
            width: calc(100% - 20px);
            padding: 8px;
            margin-top: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    `;

    // Create the widget HTML
    var widget = document.createElement('div');
    widget.className = 'roi-calculator-widget';
    widget.innerHTML = `
        <h2>Lead Gen Agency ROI Calculator</h2>
        <div class="input-group">
            <label for="leadsContacted">Number of Leads Contacted:</label>
            <input type="number" id="leadsContacted" placeholder="Enter number">
        </div>
        <div class="input-group">
            <label for="replyRate">Reply Rate (%):</label>
            <input type="number" id="replyRate" placeholder="Enter percentage" step="0.01">
        </div>
        <div class="input-group">
            <label for="showUpRate">Show Up Rate (%):</label>
            <input type="number" id="showUpRate" placeholder="Enter percentage" step="0.01" value="75">
        </div>
        <div class="input-group">
            <label for="closedDealsRate">% of Closed Deals:</label>
            <input type="number" id="closedDealsRate" placeholder="Enter percentage" step="0.01" value="25">
        </div>
        <div class="input-group">
            <label for="lifetimeValue">Lifetime Value of Customer ($):</label>
            <input type="number" id="lifetimeValue" placeholder="Enter amount">
        </div>
        <div class="input-group">
            <label for="meetingPrice">Your Price Per Meeting ($):</label>
            <input type="number" id="meetingPrice" placeholder="Enter amount" value="250">
        </div>
        <div class="input-group">
            <label for="agencyFee">Agency Fee ($):</label>
            <input type="number" id="agencyFee" placeholder="Enter amount" value="3000">
        </div>
        <button onclick="calculateROI()">Calculate ROI</button>
        <div id="result"></div>
        <button onclick="generateShareLink()" id="shareButton" style="display: none;">Generate Share Link</button>
        <input type="text" id="shareLink" readonly style="display: none;">
    `;

    // Add the calculator function
    window.calculateROI = function() {
        var leadsContacted = parseFloat(document.getElementById('leadsContacted').value);
        var replyRate = parseFloat(document.getElementById('replyRate').value) / 100;
        var showUpRate = parseFloat(document.getElementById('showUpRate').value) / 100;
        var closedDealsRate = parseFloat(document.getElementById('closedDealsRate').value) / 100;
        var lifetimeValue = parseFloat(document.getElementById('lifetimeValue').value);
        var meetingPrice = parseFloat(document.getElementById('meetingPrice').value);
        var agencyFee = parseFloat(document.getElementById('agencyFee').value);

        var replies = leadsContacted * replyRate;
        var meetings = replies * showUpRate;
        var closedDeals = meetings * closedDealsRate;
        var totalRevenue = closedDeals * lifetimeValue;
        var meetingsCost = meetings * meetingPrice;
        var profit = totalRevenue - meetingsCost - agencyFee;
        var roi = (profit / agencyFee) * 100;

        var resultHTML = `
            <h3>Results:</h3>
            <p>Number of Replies: ${replies.toFixed(0)}</p>
            <p>Number of Meetings: ${meetings.toFixed(0)}</p>
            <p>Number of Closed Deals: ${closedDeals.toFixed(0)}</p>
            <p>Total Revenue from Closed Deals: $${totalRevenue.toFixed(2)}</p>
            <p>Total Cost of Meetings: $${meetingsCost.toFixed(2)}</p>
            <p>Profit: $${profit.toFixed(2)}</p>
            <p>ROI: ${roi.toFixed(2)}%</p>
        `;

        document.getElementById('result').innerHTML = resultHTML;
        document.getElementById('shareButton').style.display = 'block';
    };

    // Add the share link generation function
    window.generateShareLink = function() {
        var inputs = ['leadsContacted', 'replyRate', 'showUpRate', 'closedDealsRate', 'lifetimeValue', 'meetingPrice', 'agencyFee'];
        var params = inputs.map(id => `${id}=${encodeURIComponent(document.getElementById(id).value)}`).join('&');
        var shareLink = `${window.location.href.split('?')[0]}?${params}`;
        
        var shareLinkInput = document.getElementById('shareLink');
        shareLinkInput.value = shareLink;
        shareLinkInput.style.display = 'block';
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Share link copied to clipboard!');
    };

    // Function to load values from URL parameters
    function loadFromParams() {
        var urlParams = new URLSearchParams(window.location.search);
        var inputs = ['leadsContacted', 'replyRate', 'showUpRate', 'closedDealsRate', 'lifetimeValue', 'meetingPrice', 'agencyFee'];
        inputs.forEach(id => {
            if (urlParams.has(id)) {
                document.getElementById(id).value = urlParams.get(id);
            }
        });
        if (urlParams.has('leadsContacted')) {
            calculateROI();
        }
    }

    // Append the style and widget to the document
    document.head.appendChild(style);
    document.body.appendChild(widget);

    // Load values from URL parameters if they exist
    loadFromParams();
})();
