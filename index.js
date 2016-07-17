
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
    users: []
};

//Listening function - hello/who
controller.hears(['hello', 'howzit'], ['mention', 'direct_mention', 'direct_message'], function(whichBot, message) {
    whichBot.reply(message, 'Hello, right back at you!');
});

controller.hears(['who are you', 'who is this', 'identify yourself', 'what is your name', 'what\'s your name', 'what are you called'], ['direct_message', 'direct_mention', 'mention'], function(whichBot, message) {
    whichBot.reply(message, 'I am Spartacus.');
});

controller.hears(['really', 'what is your real name'], ['direct_message', 'direct_mention', 'mention'], function(whichBot, message) {
    whichBot.reply(message, 'Ok, I\'m not Spartacus. He is. I am, ' + state.botName + '.');
});

// Class check
controller.hears(['do we have class today', 'class today', 'is there class', 'class tonight'], ['direct_message', 'direct_mention', 'mention'], function(whichBot, message) {
    var date = new Date(); //set today's date
    var month = date.getMonth() + 1; // months +1 gives 1-12 rather than 0-11
    var day = date.getDate(); // get day of month from date
    var weekday = date.getDay(); // establish week day
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //C ourse dates:
    // Month July which is 6 normally, but +1 makes it 7
    // Dates are 4th/6th, 11th/13th, 18th/20th, 25th/27th
    if (weekday === (0 || 6)) {
        whichBot.reply(message, "Nope, it's the weekend, silly. Go and play.")
    } else if ((month === (7)) && (day === (4 || 6 || 11 || 13 || 18 || 20 || 25 || 27))) {
        whichBot.reply(message, "Yep! Hope you've done your homework?")
    } else {
        whichBot.reply(message, "No class today, it's" + " " + days[weekday] + ". But do some study!");
    }

});

// bot close command
controller.hears(['sleep', 'shutdown', 'sd', 'close'], ['direct_message', 'direct_mention', 'mention'], function(whichBot, message) {

    whichBot.startConversation(message, function(err, conversation) {
        // confirm close
        conversation.ask(
            'Are you sure you want me to shutdown?',
            [{
                pattern: whichBot.utterances.yes,
                callback: function(response, callback) {
                    callback.say('Ok, have fun on your own!');
                    callback.next();
                        // shutdown timer
                        setTimeout(function() {
                          process.exit();
                     }, 3000);
                }
            }, {
                default: true,
                callback: function(response, callback) {
                    callback.say('Oh good. It\'s lonely without you.');
                    callback.next();
                }
            }]);
    });
});


// Food start
controller.hears(['breakfast', 'lunch', 'dinner', 'food', 'eat', 'hungry'], ['direct_message,direct_mention'], function(whichBot, message) {
    whichBot.reply(message, "You hungry?");
});

// GET USER NAMES
controller.hears(['who are our users'], ['direct_message,direct_mention'], function(whichBot, message) {
    bot.api.users.list({}, function(err, response) {
        users = response;
        //print list
        // console.log(users);
        var memberNames = []
        response.members.forEach(function(member) {
            memberNames.push(member.name)
        })
        //print memberNames
        //console.log(memberNames);
        //reply with comma separated list
        whichBot.reply(message, memberNames.join(', '));

    })
});
  

// USE CONDITIONAL & ARRAY FILTER ON USER LIST
controller.hears(['is (.*) at the party?'], ['direct_message,direct_mention'], function(whichBot, message) {

    bot.api.users.list({}, function(err, response) {
        users2 = response.members;

        var wildcardMatch = message.match[1];
        var partyGoer;
        console.log(users2);
        console.log('Wildcard is ' + wildcardMatch);

        for (var i = 0; i < users2.length; i++) {
            if (users2[i].name == wildcardMatch) {
                return whichBot.reply(message, 'Yes, ' + wildcardMatch + ' ' + 'is at the party.');
            }
        }
        return whichBot.reply(message, 'Nope, they\'re not here.');
    })
});
