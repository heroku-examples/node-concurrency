# Load Testing

```
$ heroku addons:create blazemeter
$ heroku addons:open blazemeter
```

Then set up a URL test to benchmark different classes of apps:

- /cpu for cpu-bound apps
- /io for io-bound apps
- /memory for memory-bound apps
- / for a no-op route

This yields a hello-world type of baseline.
The CPU-bound test does a little bit of computation, and then responds.
The IO-bound test simulates waiting for a resource for 300ms, then responds.
The Memory-bound test generates a new 1 MB string for each response.
The No-op route does essentially no work and generates the best performance you can expect with the given service and network configuration.

