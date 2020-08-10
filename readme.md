# Load Testing

```
$ heroku addons:create blazemeter
$ heroku addons:open blazemeter
```

Then set up a URL test to benchmark different classes of apps:

- `/cpu` for CPU-bound apps
- `/io` for IO-bound apps
- `/memory` for memory-bound apps
- `/` for a no-op route

This yields a hello-world type of baseline. The CPU-bound test does a little bit of computation, and then responds. The IO-bound test simulates waiting for a resource for 300ms, then responds. The memory-bound test generates a new 1 MB string for each response. The no-op route does essentially no work and generates the best performance you can expect with the given service and network configuration.

