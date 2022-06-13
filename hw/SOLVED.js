//TASK 1
//----------------------------------------------------------------------------------------------
"use strict";

///////////// DON'T CHANGE /////////////
// check docs for https://www.npmjs.com/package/prism-media
const prism = require("prism-media");
///////////////////////////////////////

// You can add your dependencies here.
// Note that you should use only Node.js builtin modules.
// aka no third-party dependencies allowed, like the one above.
const fs = require("fs");
///////////// DON'T CHANGE /////////////
const SOURCE_FILE = "../data/weekend.mp3";
const DESTINATION_FILE = "../www/static/audio.ogg";

const OUT_MUXER = "ogg";
const OUT_SAMPLE_RATE = "48000";
const OUT_NUM_CHANNELS = "2";

const transcoder = new prism.FFmpeg({
  args: [
    "-analyzeduration",
    "0",
    "-loglevel",
    "0",
    "-f",
    OUT_MUXER,
    "-ar",
    OUT_SAMPLE_RATE,
    "-ac",
    OUT_NUM_CHANNELS,
  ],
});
///////////////////////////////////////

// You can add your logic here.
// Note that you should use only Node.js Stream APIs.
// aka reading of the whole file in memory and afterwards converting it is not scored.
fs.createReadStream(SOURCE_FILE)
  .pipe(transcoder)
  .pipe(fs.createWriteStream(DESTINATION_FILE));
//----------------------------------------------------------------------------------------------

//TASK 2
//----------------------------------------------------------------------------------------------
const { spawn } = require("child_process");
const ffprobe = require("ffprobe-static");

process.argv.push("probe.js");
//process.argv.push(SOURCE_FILE);
process.argv.push(DESTINATION_FILE);

if (process.argv.length < 3) {
  console.error("Command format: node probe.js <path-to-media-file>");
}

const command = ffprobe.path;
console.log(process.argv);
const args = [
  "-v",
  "error",
  "-select_streams",
  "a:0",
  "-show_entries",
  "stream=codec_long_name",
  "-of",
  "default=noprint_wrappers=1:nokey=1",
  process.argv[2],
];

const subprocess = spawn(command, args);

subprocess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

subprocess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

subprocess.on("exit", (code, signal) => {
  if (code !== null) {
    if (code === 0) {
      console.log("Process exit with succes");
      return;
    }

    console.error(`Process exit code ${code}`);
    return;
  }

  if (signal !== null) {
    console.error(`Process killed with signal ${signal}`);
  }
});
//source --> MP3 (MPEG audio layer 3)
//destination --> Vorbis
//QUESTION 1
/*
    1) Codec stands for coder-decoder or compression-decompression.
    Codecs use algorithms to compress or decompress information(audio, image, video).
    Compression is used to reduce the file size of the content when sending it.
    A container combines multiple streams (for example audio and video) with metadata into a single file format.(ex. MP4)
    The destination_file 's codec is Vorbis while the container is OGG.
*/
//QUESTION 2
/*
    2) The ogg format at 110kbps sounds better than mp3 at 128kbps(according to google). That means that ogg provides better
    audio quality at a lower file size. For live streaming conferences the ogg format would be better to use because it uses
    less network bandwidth so people with a poor network connection have a better chance of tuning in. (As long as the streaming
    platform supports the ogg format. Despite these advantages, the ogg format isn't as widely used as the mp3 format.)
*/
//----------------------------------------------------------------------------------------------
