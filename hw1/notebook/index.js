const prism = require('prism-media')
const fs = require('fs')

const SOURCE_FILE = '../data/weekend.mp3';
const DESTINATION_FILE = '../www/static/audio.ogg';

const OUT_MUXER = 'ogg';
const OUT_SAMPLE_RATE = '48000';
const OUT_NUM_CHANNELS = '2';

const transcoder = new prism.FFmpeg({
    args: [
        '-analyzeduration',
        '0',
        '-loglevel',
        '0',
        '-f',
        OUT_MUXER,
        '-ar',
        OUT_SAMPLE_RATE,
        '-ac',
        OUT_NUM_CHANNELS,
    ],
});

const input = fs.createReadStream(SOURCE_FILE);
const encoder =
    new prism.opus.Encoder({rate: 48000, channels: 2, frameSize: 960});

input.pipe(transcoder)
    .pipe(encoder)
    .pipe(fs.createWriteStream(DESTINATION_FILE))
