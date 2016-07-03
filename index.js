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

//First listening function
controller.hears(['hello', 'hi', 'howzit'], ['mention', 'direct_mention', 'direct_message'], function(whichBot, message) {
  whichBot.reply(message, 'Did you say my name?');
});

//identifier
controller.hears(['who are you', 'who is this', 'identify yourself', 'what is your name', 'what are you called'], ['direct_message,direct_mention,mention'], function(whichbot, message) {
    whichBot.reply(message, 'I am  ' + bot.identity.name + ', BOOM!');
});