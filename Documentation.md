# Documentation

### What is Z3R0
Z3R0 is a discord bot with starter commands and features to get you started. 

this documentation is here as to help you write your own and add more


### Basic Commands
Commands are what a bot uses to send/recieve information
A simple ping pong command is below, customize this how you see fit.

```
  else if ((interaction.commandName) == 'ping') { //Checks if the /command is named "ping"
              await interaction.reply({
                  content: 'Pong',  //What the bot replies with
                  ephemeral: false, //true - only the person who did the command can see it. false - everyone in the server can see it.
                  components: []
              });
```
The command above is best suited for simple commands like ping pong or a help command
                  
### A Little More Advanced
While a simple bot just for sending help and ping pong is nice, you want a little more than that! so lets add a poll function.
```
else if ((interaction.commandName) == 'poll') {
            if (mathRandomInt(1, 5) == 1) {
                await interaction.reply({
                    content: 'Cats or Dogs?',
                    ephemeral: false,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 2) {
                await interaction.reply({
                    content: 'Waffles Or Pancakes',
                    ephemeral: false,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 3) {
                await interaction.reply({
                    content: 'Summer Or Winter',
                    ephemeral: false,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 4) {
                await interaction.reply({
                    content: 'Hot Or Cold',
                    ephemeral: false,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 5) {
                await interaction.reply({
                    content: 'On Or Off Brand',
                    ephemeral: false,
                    components: []
                });
            }
        } 
```
This is a somewhat sloppy way of doing it but it works flawlessly on Z3R0 so in my eyes its a win. these polls can be changed to whatever you want

However some more tech experienced people may notice that its calling for "mathRandomInt"
```
 function mathRandomInt(a, b) {
        if (a > b) {
            var c = a;
            a = b;
            b = c;
        }
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
```
these few lines of codes add the ability to use these random polls!

### Adding Slash Commands
Now for a new discord bot you need to add slash commands. these are fairly simple to implement
```
 s4d.client.on('ready', async () => {
        s4d.client.user.setPresence({
            status: "online",
            activities: [{
                name: 'SET THIS TO YOUR BOTS STATUS',
                type: "WATCHING"
            }]
        });

    });

    synchronizeSlashCommands(s4d.client, [{
        name: 'help',
        description: 'Brings Up The Bot Help Page',
        options: [

        ]
    }, {
        name: 'ping',
        description: 'Pong!',
        options: [

        ]
    }, {
        name: 'poll',
        description: 'asks a random poll',
        options: [

        ]
    }, {
        name: 'level',
        description: 'shows you your level',
        options: [

        ]
    }, {
        name: 'AI',
        description: 'generates a new AI writing prompt',
        options: [

        ]
    }, ], {
        debug: false,

    });

    return s4d
})();
```
The code above adds the slash commands you need in order to use the commands. now when you press / you will see your bots commands appear.

I will be updating this as needed!
