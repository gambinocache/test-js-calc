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
    };

    // Append the style and widget to the document
    document.head.appendChild(style);
    document.body.appendChild(widget);
})();
