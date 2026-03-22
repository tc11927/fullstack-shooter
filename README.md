## Robotron

Node.js + Express arcade shooter with EJS pages and a canvas game.

### Prereqs

-   Node.js
-   PostgreSQL
-   `psql` CLI available (for `npm run db:init`)

### Setup

1. Copy env

```bash
cp .env.example .env
```

2. **Supabase** (users & scores): Create a project at [supabase.com](https://supabase.com), then run `scripts/supabase-init.sql` in the SQL Editor. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env`.

3. **PostgreSQL** (sessions): Create a database, set `DATABASE_URL` in `.env`, then:

```bash
npm run db:init
```

4. Run

```bash
npm run dev
```

Open `http://localhost:3001`.

Contributions


Angie
Created hi-fi wireframing for the game
Find references, set color theme, buttons locations
Created presentation slides
Made the presentation slides with Sophia
Designed and integrated game audio 
Added the full sound effects for the experience: looping game music, changing background music while playing, UI feedback (clicks), game start / game over, shooting, and pickup/power-up style cues. Wired each cue into gameplay so audio matches actions (start run, shoot, collect, lose)
Handled browser audio rules
Ensures that audio only starts after the user actually interacts (cursor/keyboard) with the screen.
Kept the music continuous across navigation
Kept the loop music position in sessionStorage and restored it on load so the soundtrack doesn’t play back from beginning when moving between pages or returning to the game

Daniel
Added increased speed after each wave
Each wave, the speed increases 10%. Making the game more difficult but fun as players progress
Implemented score multiplier 
For example, in wave 3, all enemy takedowns will net the user 300 points (100 x 3)
Updated UI to show multiplier next to player score
Implemented boss stage
Every 5 waves, a boss appears. Their attacks have a different pattern and have much more HP, but on takedown they give a lot more score
Implemented custom attack unique to the boss
Added HP bar UI specifically for boss enemy

Sophia
Created low-fi wireframing for the game
How the screen first looks, how it looks in battle, possible pause menus etc. 
Fixed movement 
Adjusted movement in JS so players can only move left and right
Created presentation slides
Made the presentation slides with Angie
Attempted to deploy thru vercel
Assisted with troubleshooting Vercel issues regarding pnpm files and node modules + package-lock.json

Thea
Added/made SVGs
Changed width and height in CSS to make sure equal sizing was found for each separate enemy character
Implemented sign in
Created tables on Supabase and connected Supabase to Vercel
Connected Supabase to localhost as well to run locally for testing
Implemented login
Created tables on Supabase and connected Supabase to Vercel
Connected Supabase to localhost as well to run locally for testing
Implemented scoreboard 
Created tables on Supabase and connected Supabase to Vercel
Connected Supabase to localhost as well to run locally for testing
Made sure players could be seen/ranked through score points collected
Connected Supabase to Vercel
Connected through keys and Supabase url to ensure user info is stored
Set up Supabase
Set up tables for users and scores and connected it to Vercel
Connected Supabase to localhost as well to run locally for testing
Input favicon
Edited and added favicon in header.ejs to display chosen favicon
Added written content into game (login.ejs, signup.ejs, header.ejs, and footer.ejs)
Added filler text, such as login text (continue your mission, robot) and sign up text (join the battle against stinky humans!)
