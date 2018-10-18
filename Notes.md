# Game
- Only one active at a time
- Knows about all active players
- Holds Cards
- Knows the sheriff
- Assigns Characters
- Assigns Roles
- has one turn at a time

# Player
- has cards
- has an assigned character
- has an assigned role

# Turn
- Belongs to a game
- Belongs to a player


#TODO
- create a game
- get a game
- frontend control
- emit socket event
- handle socket event redux



18 October todos
- Turns
- Cards
- CardActions

possible order:
- turn created
- player draws cards
- player plays cards
- frontend enforces when a turn can be ended (must discard to number of bullets)
- on turn end, game creates new turn for next player in array

solutions for special abilities:
- each game action (draw, bang, etc) triggers a specialAbility function which is duck typed to do nothing but can be overwritten by special abilities

- really only have about 22 cards needed for play (including weapons) and about 16 different characters