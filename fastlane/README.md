fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### prepare

```sh
[bundle exec] fastlane prepare
```

Preparing for build and deploy

### force_intsall

```sh
[bundle exec] fastlane force_intsall
```

Remove node_modules and re-intsall dependencies

----


## iOS

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Deploy to TestFlight

----


## Android

### android alpha

```sh
[bundle exec] fastlane android alpha
```

Deploy to Google Play Console

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
