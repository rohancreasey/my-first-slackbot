/**
 * Your slackbot token is available as the global variable:

process.env.SLACKBOT_TOKEN

 * When deployed to now.sh, the URL of your application is available as the
 * global variable:

process.env.NOW_URL

 * The URL is useful for advanced use cases such as setting up an Outgoing
 * webhook:
 * https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands
 *
 */

//RTM API function

var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN_KNUCKLES
})
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});

// Test state: bot details
var state = {
    botName: 'roh-bot',
    botHome: 'inside the machine'
}

//First listening function
controller.hears(['hello', 'hi', 'howzit'], ['mention', 'direct_mention', 'direct_message'], function(whichBot, message) {
  whichBot.reply(message, 'Hello, right back at you!');
});

//identifier
// controller.on(['who are you', 'who is this', 'identify yourself', 'what is your name', 'what are you called'], ['mention', 'direct_mention', 'direct_message'], function(whichbot, message) {
//     whichBot.reply(message, 'I am.. BOOM!');
// });

controller.hears(['who are you', 'who is this', 'identify yourself', 'what is your name', 'what\'s your name', 'what are you called'],['direct_message','direct_mention','mention'],function(whichBot,message) {
    whichBot.reply(message,"I am Spartacus.");
});

controller.hears(['(.*) really', 'who is this really', 'really', 'what is your real name', 'what\'s really your name', 'what are you really called'],['direct_message','direct_mention','mention'],function(whichBot,message) {
    whichBot.reply(message,"Ok, I'm not Spartacus. He is. I am " + state.botName + ".");
});

// reply to any incoming message
// controller.on('message_received', function(bot, message) {
//     bot.reply(message, 'I heard... something!');
// });


// Class check. Working with dates.
// Define class dates as objects
// Convert today's date to object
// Compare 
// PSEUDO: if todays date == class date (use OR operators) then say yep, hope done homework. if todays date !== class date then say no.
// maybe have funny weekender comments first in if statment?

controller.hears(['do we have class today','class today','is there class','class tonight'],['direct_message','direct_mention','mention'],function(whichBot,message) {

// define date variables
var date = new Date();  //set today's date
var month = date.getMonth() + 1; // months +1 gives 1-12 rather than 0-11
var day = date.getDate();   // get day of month from date
var weekday = date.getDay();    // establish week day
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];    

//Course dates:
// Month July which is 6 normally, but +1 makes it 7
// Dates are 4th/6th, 11th/13th, 18th/20th, 25th/27th


if (weekday === (0 || 6) ) {
        whichBot.reply(message, "Nope, it's the weekend, silly. Go and play.")
    } else if ((month === (7)) && ( day === ( 4 || 6 || 11 || 13 || 18 || 20 || 25 || 27 ))) {
        whichBot.reply(message, "Yep! Hope you've done your homework?")
    } else {
        whichBot.reply(message, "No class today, it's" + " " + days[weekday] + ". But do some study!");
    }

});


// array work

var names = ["Rohan", "Jess", "Amy", "DanH", "Moises"];



// bot close
// useful for testing too!

// start conversation! Use for chat
//more than just reply

// shutdown command
controller.hears(['sleep','shutdown','close'],['direct_message','direct_mention','mention'], function(whichBot, message) {

    // bot talks back
    //function takes two parameters
    whichBot.startConversation(message, function(err, conversation) {

        // ask() bot question
        // TO DO: add if/else to change reply depending on sleep/shutdown or close?
        conversation.ask('Are you sure you want me to shutdown?', 
        [
            // array with two objects
            {
                // TO DO: understand utterances
                pattern: whichBot.utterances.yes,
                callback: function(response, conversation) {
                    conversation.say('Ok, have fun on your own!');
                    // TO DO: understand next function
                    conversation.next();
                    // shutdown timer
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: whichBot.utterances.no,
            default: true,
            callback: function(response, conversation) {
                conversation.say('Oh good. It\'s lonely without you.');
                conversation.next();
            }
        }
        ]);
    });
});