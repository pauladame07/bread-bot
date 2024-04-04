const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const speedTest = require('speedtest-net');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('speedtest')
        .setDescription('Run a speed test'),
    async execute(interaction) {
        const msg = await interaction.reply('Running speed test...');
        const test = speedTest({ maxTime: 5000 });
        test.on('data', data => {
            const downloadSpeed = (data.speeds.download / 1024 / 1024).toFixed(2);
            const uploadSpeed = (data.speeds.upload / 1024 / 1024).toFixed(2);
            const ping = data.server.ping.toFixed(2);
            interaction.editReply(`Download Speed: ${downloadSpeed} Mbps\nUpload Speed: ${uploadSpeed} Mbps\nPing: ${ping} ms`);
        });
        test.on('error', err => {
            console.error(err);
            interaction.editReply('Error occurred while running speed test.');
        });
    },
};
