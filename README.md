# Twitch VOD Watcher

A cross-platform application to stream or download Twitch VODs.

## Technologies Used

- Electron JS
- SHA1 JS Hashing Library from [emn178](https://github.com/emn178/js-sha1)
- Electron Forge
- UI Kit
- Node Fetch

## Installation

Run the command to install all dependancies.

```bash
yarn install
```

or

```bash
npm install
```

## Build Script

### Machine Platform

```bash
yarn make
```

### Specific Platform

Linux and mac can be compiled using any platform. Windows setup can be compiled only on windows 10 machines.

#### Linux

Install apt dependancies

```bash
sudo apt-get install fakeroot dpkg
```

```bash
yarn make-linux
```

#### Mac

```bash
yarn make-mac
```

## Reporting Issues

Feel free to submit issues and enhancement requests.

Please use the [Issue Section ](https://github.com/Sharizzle/twitch-vod-watcher/issues) to report any issues or bugs.

## Contributing

I follow the "fork-and-pull" Git workflow.

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your own machine
3.  **Commit** changes to your own branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

- **Sharif Kanaan** - [GitHub](https://github.com/Sharizzle) | | [Website](https://sharif.thekanaan.com/) | | [Email](mailto:sharif@thekanaan.com) || [Linkedin](https://www.linkedin.com/in/SharifKanaan/)
