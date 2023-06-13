(async () => {
    // default imports
    const events = require('events');
    const {
        exec
    } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    const Database = require("easy-json-database")

    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire: null,
        joiningMember: null,
        reply: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION",
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function(err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    s4d.database = new Database('./database.json')

    // blockly code
    var member_xp, member_level;

    function mathRandomInt(a, b) {
        if (a > b) {
            // Swap a and b to ensure a is smaller.
            var c = a;
            a = b;
            b = c;
        }
        return Math.floor(Math.random() * (b - a + 1) + a);
    }


    await s4d.client.login('YOUR TOKEN HERE').catch((e) => {
        const tokenInvalid = true;
        const tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!")
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
        }
    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (!((s4dmessage.author).bot)) {
            member_xp = s4d.database.get(String(('xp-' + String(s4dmessage.member.id))));
            member_level = s4d.database.get(String(('level-' + String(s4dmessage.member.id))));
            if (!member_xp) {
                member_xp = 0;
            } else if (!member_level) {
                member_level = 0;
            }
            s4d.database.set(String(('xp-' + String(s4dmessage.member.id))), (member_xp + 1));
            member_xp = member_xp + 1;
            if (member_xp > 100) {
                s4d.database.set(String(('xp-' + String(s4dmessage.member.id))), 0);
                s4d.database.set(String(('level-' + String(s4dmessage.member.id))), (member_level + 1));
                member_level = member_level + 1;
                s4dmessage.channel.send({
                    content: String((['Congratulations, ', s4dmessage.author, 'you jumped to level ', member_level, '!!'].join('')))
                });
            }
            if ((s4dmessage.content) == '!level') {
                s4dmessage.channel.send({
                    content: String(([s4dmessage.author, ', you are currently level: ', member_level].join('')))
                });
            } else if ((s4dmessage.content) == '!xp') {
                s4dmessage.channel.send({
                    content: String(([s4dmessage.author, ', you need ', 100 - member_xp, ' to jump to level ', member_level + 1].join('')))
                });
            }
        }

    });

    s4d.client.on('interactionCreate', async (interaction) => {
        let member = interaction.guild.members.cache.get(interaction.member.user.id)
        if ((interaction.commandName) == 'help') {
            // true - only the person who t=did the comamnd can see it
            //
            // false - everyone can see it
            //
            await interaction.reply({
                content: 'Some Commands i can do are: help (brings up the help page) Ping (Pong)',
                ephemeral: true,
                components: []
            });
        } else if ((interaction.commandName) == 'ping') {
            // true - only the person who t=did the comamnd can see it
            //
            // false - everyone can see it
            //
            await interaction.reply({
                content: 'Pong',
                ephemeral: true,
                components: []
            });
        } else if ((interaction.commandName) == 'poll') {
            if (mathRandomInt(1, 5) == 1) {
                // true - only the person who t=did the comamnd can see it
                //
                // false - everyone can see it
                //
                await interaction.reply({
                    content: 'Cats or Dogs?',
                    ephemeral: true,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 2) {
                // true - only the person who t=did the comamnd can see it
                //
                // false - everyone can see it
                //
                await interaction.reply({
                    content: 'Waffles Or Pancakes',
                    ephemeral: true,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 3) {
                // true - only the person who t=did the comamnd can see it
                //
                // false - everyone can see it
                //
                await interaction.reply({
                    content: 'Summer Or Winter',
                    ephemeral: true,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 4) {
                // true - only the person who t=did the comamnd can see it
                //
                // false - everyone can see it
                //
                await interaction.reply({
                    content: 'Hot Or Cold',
                    ephemeral: true,
                    components: []
                });
            } else if (mathRandomInt(1, 5) == 5) {
                // true - only the person who t=did the comamnd can see it
                //
                // false - everyone can see it
                //
                await interaction.reply({
                    content: 'On Or Off Brand',
                    ephemeral: true,
                    components: []
                });
            }
        } else if ((interaction.commandName) == 'level') {
            // true - only the person who t=did the comamnd can see it
            //
            // false - everyone can see it
            //
            await interaction.reply({
                content: 'no',
                ephemeral: true,
                components: []
            });
        }

    });

    s4d.client.on('ready', async () => {
        s4d.client.user.setPresence({
            status: "online",
            activities: [{
                name: 'joe try to code me',
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
    }, ], {
        debug: false,

    });

    return s4d
})();
