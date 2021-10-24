// projectId: ID of the GCP project where Dialogflow agent is deployed
const projectId = process.env.PROJECT_ID;
// sessionId: String representing a random number or hashed user identifier
const sessionId = '123456';
// languageCode: Indicates the language Dialogflow agent should use to detect intents
const languageCode = 'en';

// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request :any = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

export async function executeQuery(query) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    try {
        console.log(`Sending Query: ${query}`);
        intentResponse = await detectIntent(
            projectId,
            sessionId,
            query,
            context,
            languageCode
        );
        console.log('Detected intent');
        console.log(
            `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
        );
        // Use the context from this response for next queries
        context = intentResponse.queryResult.outputContexts;
    } catch (error) {
        console.log(error);
    }
}