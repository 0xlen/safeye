SafEye
===
![SafEye](assets/icons/icon.png "SafEye")

2016 Information security project

Security chrome extensions

## Download

Download extensions or [here](https://github.com/0xlen/safeye/archive/master.zip)

```bash
git clone https://github.com/0xlen/safeye.git
```

## Configuration

Open `content_scripts\content.js` then change **safeye-api url** (Line: 13)

```javascript
url: 'http://127.0.0.1/safeye/api/url_scan.php',
```

Open `background_scripts\main.js` then change **safeye-api url** (Line: 2)

```javascript
url: 'http://127.0.0.1/safeye/api/url_scan.php',
```

Open `lib\main.js` then change `CLIENT_ID` to your google api key (Line: 5)

```javascript
var CLIENT_ID = 'Your Google API Key';
```
change `userId` in Line: 53 to your google user id

```javascript
var userId = 'Your Gmail@gmail.com';
```

and change `api` location (Line: 143)

```javascript
var api = 'http://127.0.0.1/safeye-api';
```

## Installation

Open your chrome and visit `chrome://extensions/`.

Ensure that the Developer mode checkbox in the top right-hand corner is checked.

Click <kbd>Load unpacked extension…</kbd> to pop up a file-selection dialog.

Navigate to the directory in which safeye project files live, and select safeye directory, you will see the safeye is enabled.

more detail please visit: [https://developer.chrome.com/extensions/getstarted#unpacked](https://developer.chrome.com/extensions/getstarted#unpacked)

## Test

You can check function by visit [http://www.eicar.org/](http://www.eicar.org/).

If safeye works, you will see alert.

## References
- [chrome extensions developer guide](https://developer.chrome.com/extensions/devguide)
- [virustotal public api](https://www.virustotal.com/en/documentation/public-api/)