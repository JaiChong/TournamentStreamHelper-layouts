<!--
    ## HTML-based overlay templates for TournamentStreamHelper

    Here you'll find templates for animated layouts using TournamentStreamHelper's output.

    In `/include/` you'll find `globals.js` which contain general functions used in most template layouts. You'll also find some of the libraries used: `gsap` and `jquery`.

    Testing and debugging locally with Chrome:
    - Add the flag `--allow-file-access-from-files` when launching Chrome
        - On Windows, you can either `"C:\PathTo\chrome.exe" --allow-file-access-from-files` or open the PowerShell and type `Start-Process "chrome.exe" "--allow-file-access-from-files"`
    - Then, you can open a layout `html` file in Chrome, press F12 for developer tools
    - Enable *Device toolbar* and set the screen size to 1920x1080
    With this, you'll have access to the console logs (and errors) and to quickly edit css rules for easier development

    **Link to the main program:** https://github.com/joaorb64/TournamentStreamHelper
-->
# Setup
1. **To download the [TSH base files](https://github.com/joaorb64/TournamentStreamHelper/releases/latest):**
  - Scroll down to `Assets` and click `Source code (.zip)`
  - Right-click the downloaded file and unzip it in a folder of choice

2. **To download my `layout` folder from the current page:**
  - Click the green `<> Code` button, and then `Download ZIP`
  - Right-click the downloaded file and unzip it
  - Copy+Paste+Replace the files into the `TournamentStreamHelper\layout\` folder from the first download
  - Note that I'm still waiting on pending info to make a final update, but I'll make a ping in the OMG server and you should be able to Copy+Paste+Replace over the files again then without having to redo any of the following steps.

3. **To set up the OBS scene:**
  - Open OBS and add a `Browser` source
  - Tick the `Local File` toggle
  - Set the URL to `(your chosen location)\TournamentStreamHelper\layout\scoreboard_omg\omg_p+.html` or `...\omg_hdr.html`
  - Set the `Width` to 1920 and `Height` to 1080
  - Delete the contents of `Custom CSS`
  - Tick the two toggles below that and click OK
  - Add `Video Capture Device` source(s) for player cameras underneath the TSH browser source
  - Lock the TSH browser source to prevent accidental selection, and then resize and reposition the player camera video sources.

4. **To set up TSH.exe:**
  - Open `TournamentStreamHelper\TSH.exe` (takes ~30sec)
  - Click the hamburger icon (three horizontal lines icon below the close button) and select `Download Assets`
  - Type `Melee`, `Project+`, `Ultimate`, or `Rivals` into the search drop-down (top-most bar) and select the desired game. 

# Usage
- **To fetch set's data from `start.gg` and update its score from TSH.exe:**
  - Click `Set tournament` near the top, and enter the event URL
  - Scroll down and click `Load set from <URL>`, select the next set, and click `OK`.  Most of the player and set data should fill in automatically.
  - A 4-second timer at the bottom will countdown to indicate how frequently any changes you make to the score, etc. will be checked for and sent to the HTML file you set up as an OBS Browser source in step 3.  This can be disabled by clicking the `X` button next to the timer.

- **To update various info on TSH.exe:**
  - The currently selected game is displayed near the top, which determines the character (and stage) options and graphics.
  - The `Swap Teams` button at the bottom of the center column will switch the sides each player's info is displayed on, to match the player cameras.  "Teams" is used to describe either side regardless of the number of players.
  - For doubles, the up and down arrows to the right of `Player #` will achieve a similar effect for switching player orders within the same team.
  - The `Pr...` textbox on the second line of the player columns is for entering pronouns, which can be entered manually if not already fetched from start.gg accounts
  - `Location` allows for both Country and State/District flags to be selected, hence the two drop-down boxes
  - Selecting the `Commentary` tab near the top will allow for inputting Commentator gamer tags, twitter handles, and/or real names, prioritized in that order.  To return to the original tab, select `Scoreboard Manager`.

- **For Crews:**
  - Pause the auto-updates by hitting the `X` button by the 4-second countdown.
  - The `Phase` and `Match` dropdown boxes can be replaced manually, but appear in reverse order on the stream layout.  `Match` is the larger white text on above; `Phase` is the smaller gray text below.
  - `Best of` should be increased to the number of players per crew, rather than stocks.
  - `Score` should be set to the number of players per crew, and decremented upon player eliminations rather than stock losses.