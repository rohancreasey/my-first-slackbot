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
var state = {
    botName: 'roh-bot',
    botHome: 'inside the machine'
}

//First listening function
controller.hears(['hello', 'hi', 'howzit'], ['mention', 'direct_mention', 'direct_message'], function(whichBot, message) {

    // bot.api.reactions.add({
    //     timestamp: message.ts,
    //     channel: message.channel,
    //     name: 'rohan_robot',
    // });


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

controller.hears(['do we have class today','class today','is there class'],['direct_message','direct_mention','mention'],function(whichBot,message) {

var date = new Date();
var month = date.getMonth() + 1; // months +1 gives 1-12 rather than 0-11
var day = date.getDate();
var weekday = date.getDay();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//Course dates:
// Month July which is 6 normally, but +1 makes it 7
// Dates are 4th/6th, 11th/13th, 18th/20th, 25th/27th

if (days[weekday] == "Saturday" || "Sunday") {
        whichBot.reply(message, "Nope, it's the weekend, silly. Go and play.")
    } else if (month == 7 && day == 4 || 6 || 11 || 13 || 18 || 20 || 25 || 27 ) {
        whichBot.reply(message, "Yes indeed! Hope you've done your homework?")
    } else {
        whichBot.reply(message, "No class today, it's" + weekday + ", but do some study!");
    }

});