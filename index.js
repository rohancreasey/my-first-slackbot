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
    // botHome: 'inside the machine',
    users: []
}

// wrap user list in function
controller.hears(['who are our users'], ['direct_message,direct_mention'], function(whichBot, message) {

// calls https://slack.com/api/users.list
    //takes two arguments, error and response
bot.api.users.list({}, function(err, response) {
    
    //assigns response to users variable
    users = response;
    
    //print list
    // console.log(users);
      var memberNames = []
        response.members.forEach(function(member){
            memberNames.push(member.name)
        })
        
        //print memberNames
        //console.log(memberNames);
      
      //reply with comma separated list
      whichBot.reply(message, memberNames.join(', '));
     
    })
});







//First listening function
controller.hears(['hello', 'howzit'], ['mention', 'direct_mention', 'direct_message'], function(whichBot, message) {
  whichBot.reply(message, 'Hello, right back at you!');
});

//identifier
// controller.on(['who are you', 'who is this', 'identify yourself', 'what is your name', 'what are you called'], ['mention', 'direct_mention', 'direct_message'], function(whichbot, message) {
//     whichBot.reply(message, 'I am.. BOOM!');
// });

controller.hears(['who are you', 'who is this', 'identify yourself', 'what is your name', 'what\'s your name', 'what are you called'],['direct_message','direct_mention','mention'],function(whichBot,message) {
    whichBot.reply(message, 'I am Spartacus.');
});

controller.hears(['really', 'what is your real name'],['direct_message','direct_mention','mention'],function(whichBot,message) {
    whichBot.reply(message, 'Ok, I\'m not Spartacus. He is. I am, ' + state.botName + '.');
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


// bot close
// useful for testing too!
// https://www.npmjs.com/package/@phated/botkit

// startConversation() - use where more than one reply may be sent
// pass string or message object to function
// message object can contain any fo chat.postMessage API fields

// shutdown command
controller.hears(['sleep','shutdown','close'],['direct_message','direct_mention','mention'], function(whichBot, message) {

    // bot talks back
    //function takes two parameters
    whichBot.startConversation(message, function(err, conversation) {

        // conversation.say()
        // conversation.ask() takes message, callback or array of callbacks and optionally capture_options
        // 

        // ask() bot question
        // TO DO: add if/else to change reply depending on sleep/shutdown or close?
        conversation.ask(
            //standard messge object
            'Are you sure you want me to shutdown?', 
        // reference to conversation. Here, an array with two objects
        [
            {
                // TO DO: understand utterances
                //utterances match specifics or phrases (yes, yeah, yup etc.)
                pattern: whichBot.utterances.yes,
                callback: function(response, callback) {
                    callback.say('Ok, have fun on your own!');
                    // TO DO: understand next function
                    //convo.next() proceed to the next message in the conversation. This must be called at the end of each handler.
                    callback.next();
                    // shutdown timer
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: whichBot.utterances.no,
            default: true,
            callback: function(response, callback) {
                callback.say('Oh good. It\'s lonely without you.');
                // .next() called, but no action taken.
                callback.next();
            }
        }
        ]);
    });
});


// Food

controller.hears(['breakfast','lunch','dinner','food','eat','hungry'],['direct_message,direct_mention'],function(whichBot,message) {  
    whichBot.reply(message,"You hungry?");
});


//Names
// Ask bot my name
// Get user list
// Not working yet

// controller.hears(['Who am I', 'What is my name'], 'direct_message,direct_mention,mention', function(bot, message) {
//     // 
//     controller.storage.users.get(message.user, function(err, user) {
//         // if 
//         if (user && user.name) {
//             bot.reply(message, 'Your name is ' + user.name);
//         } else {
//         // else say I can't identify you
//               bot.startConversation(message, function(err, convo) {
//                 if (!err) {
//                     convo.say('I do not know your name yet!');
//                 }
//             });
//         }
//     });
// });


// Array use
// bot to check for all users who are... something

// users [...
//      { id: 'U124SQ6UA',
//        team_id: 'T0ZT9QWKU',
//        name: 'rohan',
//        deleted: false,
//        status: null,
//        color: 'e0a729',
//        real_name: 'Rohan Creasey',
//        tz: 'Australia/Canberra',
//        tz_label: 'Australian Eastern Standard Time',
//        tz_offset: 36000,
//        profile: [Object],
//        is_admin: false,
//        is_owner: false,
//        is_primary_owner: false,
//        is_restricted: false,
//        is_ultra_restricted: false,
//        is_bot: false 
//     }
//      ...]

// function filterByName(obj) {
//     if ('name' in obj && typeof(obj.name) === 'string' && !isNaN(obj.name)) {
//         return true;
//     } else {
//         return false;
//     }
// };

// function filterByName(obj) {
// state.users[]
//     var memberNames = []
//     response.members.forEach(function(member){
//         memberNames.push(member.name)
//         console.log(memberNames);
//         whichBot
//     });
    
// var nameList = state.users.filter(filterByName);

// console.log('List of names\n', nameList);



// controller.hears(['Which users have (.*) in their name?'],['direct_message,direct_mention'],function(whichBot,message) {
//     var memberNames = [];
//         response.state.users.forEach(function(user) {
//             memberNames.push(member.name)
//     })
//         console.log(memberNames);
//         whichBot.reply(message, memberNames.join(', '));

//     });
    
controller.hears(['who goes there'], ['direct_message,direct_mention'], function(whichBot, message) {
//     bot.api.users.list({},function(err,response) {
//       var memberNames = []
//       response.members.forEach(function(member){
//         memberNames.push(member.name)
//       })
//       console.log(memberNames)
      whichBot.reply(message, memberNames.join(', '));
//     })
});    

//     var doorType = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).

//     if (doorType === 'pod bay') {
//         return bot.reply(message, 'I\'m sorry, Dave. I\'m afraid I can\'t do that.');
//         }
//         return bot.reply(message, 'Okay');


// });
//
