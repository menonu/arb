let port = (process.argv.length > 2) ? parseInt (process.argv[2]) : 8090; // default
require ('cors-anywhere').createServer ().listen (port, 'localhost')