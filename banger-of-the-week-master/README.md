# banger-of-the-week

## Project description
```
Banger of the week is a song competition app, where you create competitions
and add songs for the members to vote on. Upon creating a competition, you fill
in a form stating the name, passowrd, and genre of the competition and
whoever wants to join the competition needs to know the secret key in order to join.

git clone the SSH and run npm install, then get started!


Or navigate to:  https://banger-722e8.web.app/

```

### Structure
```
/presenters

Contains all presenters (javascript files) that render vue components(views), and
pass custom events and props. Handles all logic from the view.

competitionPresenter: Renders a competition view, info about a specific competition

compPresenter: Renders all competitions in UserModel

menuPresenter: Renders menubar

loginPresenter: Renders loginview

formPresenter: Renders competitionFormView where users create new competitions


/views

Contains all views (.vue files) that handle the UI and renders the data passed
from presenters.

competitionFormView : Form for creating competitions
competitionView: View of a specific competition
compView: View of all competitions
loginView: login page
menuBarView: Menu bar at top of page


```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
