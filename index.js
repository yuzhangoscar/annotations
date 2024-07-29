require("module-alias/register");
const Learnosity = require("learnositySDK");
const uuid = require("uuid");
const express = require("express");
const config = require("./config.js");
const path = require('path');


'use strict';
const app = new express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
const domain = 'bootcampquestionapi.com';
const user_id = uuid.v4();
const session_id = uuid.v4();
const group_id = uuid.v4();
const annotations_api_init_options = {
    group_id,
    "modules": {
        "notepad": true, // enable notepad module with default options
        "texthighlight": { // enable texthighlight with the following options:
            // Allows client to define a custom set of color scheme classes
            // Learnosity Default colors are named: theme-1, theme-2, theme-3, theme-4
            "highlight_colors": [
                'my-color-1', // highlighted DOM node will have classname "lrn-annotations-color--my-color-1"
                'my-color-2'
            ],
        },
        "stickynote": { // enable stickynote with the following options:
            "start_expanded": true, //sticky notes will be loaded in an expanded form
            "start_hidden": true //sticky notes will be loaded in hidden state
        },
        "drawing": { // enable drawing with the following options:
            // Allows client to define a custom set of color scheme classes
            // Learnosity Default colors are named:
            // lrn-annotations-drawing-color-1, lrn-annotations-drawing-color-2,
            // lrn-annotations-drawing-color-3, lrn-annotations-drawing-color-4
            "colors": [
                'my-color-1', // drawing elements will have classname "my-color-1"
                'my-color-2'
            ],
            "show_grid": true // enable the background grid display.
        }
    }
};

app.get('/', function (req, res) {
    const learnositySdk = new Learnosity(); // Instantiate the SDK
    // Questions API configuration parameters.
    const request = learnositySdk.init(
        'annotations',                              // Select Items API
        // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
        {
            consumer_key: config.consumerKey, // Load key from config.js
            domain: domain                   // Set the domain (from line 20)
        },
        config.consumerSecret,                // Load secret from config.js
        annotations_api_init_options
        // {
        //     // Unique student identifier, a UUID generated on line 18.
        //     user_id: user_id,
        //     // A reference of the Activity to retrieve from the Item bank, defining which Items will be served in this assessment.
        //     activity_template_id: 'quickstart_examples_activity_template_001',
        //     // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
        //     // Uniquely identifies this specific assessment attempt session for  save/resume, data retrieval and reporting purposes. A UUID generated on line 18.
        //     session_id: session_id,
        //     // Used in data retrieval and reporting to compare results with other users submitting the same assessment.
        //     activity_id: 'quickstart_examples_activity_001',
        //     // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
        //     rendering_type: 'assess',
        //     // Selects the context for the student response storage `submit_practice` mode means student response storage in the Learnosity cloud, for grading.
        //     type: 'submit_practice',
        //     // Human-friendly display name to be shown in reporting.
        //     name: 'Items API Quickstart',
        //     // Can be set to `initial, `resume` or `review`. Optional. Default = `initial`.
        //     state: 'initial',
        //     annotations: true
        // }
    );

    res.render('annotations', { request }); // Render the page and request.
});

app.listen(3000, function () { // Run the web application. Set the port here (3000).
    console.log('Example app listening on port 3000!');
});

// Note: for further reading, the client-side web page configuration can be found in the EJS template: 'docs/quickstart/views/questions.ejs'. //
