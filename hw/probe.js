const { spawn } = require('child_process');
const ffprobe = require('ffprobe-static');

if (process.argv.length < 3) {
    console.error('Command format: node probe.js <path-to-media-file>');
    return;
}

const command = ffprobe.path;
const args = [
    '-v', 'error',
    '-select_streams', 'a:0',
    '-show_entries', 'stream=codec_long_name',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    process.argv[2]
];

const subprocess = spawn(command, args, { stdio: 'inherit' });
subprocess.on('exit', (code, signal) => {

    if (code !== null) {

        if (code === 0) {
            console.log('Process exit with succes');
            return;
        }

        console.error(`Process exit code ${code}`);
        return;
    }

    if (signal !== null) {
        console.error(`Process killed with signal ${signal}`);
    }
});
