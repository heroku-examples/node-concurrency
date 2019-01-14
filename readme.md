# Load Testing

```
$ heroku addons:create blazemeter:basic
$ heroku addons:open blazemeter
```

Then set up a URL test to benchmark different classes of apps:

- /cpu for cpu-bound apps
- /io for io-bound apps
- /memory for memory-bound apps
