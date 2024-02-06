
## Quer apostar quanto API

Quer Apostar Quanto is an API designed for making bets on sportive games, intended as a study Proof of Concept (POC) project. This project allows participants to bet on the outcomes of games and be rewarded based on the accuracy of their guess on the game score. Aimed at providing a fun and interactive way to engage with sports games.



## Run Locally

Clone the project

```bash
  git clone https://github.com/C-Macargo/quer-apostar-quanto-API
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies and build

```bash
  npm run build
```

Start the server

```bash
  npm run start
```


## API Reference

#### get all participants

```http
  GET /participants/
```
#### post a participant

```http
  post /participants/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | the name of the participant |
| `balance`      | `number` | must be greater than 1000 |


#### get all games

```http
  GET /games/
```
#### get game by id

```http
  GET /games/:id
```
#### post a game

```http
  post /games/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `homeTeamName`      | `string` | the name of home team |
| `awayTeamName`      | `string` |the name of the away team|

#### finish a game

```http
  post /games/:id/finish
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `homeTeamScore`      | `number` |the end game score of the home team|
| `awayTeamScore`      | `number` |the end game score of the away team|



#### post a bet


```http
  post /bets/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `homeTeamScore`      | `number` | score the participant bets the home team will score |
| `awayTeamScore`      | `number` | score the participant bets the away team will score |
| `amountBet`      | `number` | amount the participant wants to bet |
| `gameId`      | `number` | id of the game |
| `participantId `      | `number` | id of the betting participant |




## Deployment

the project deploy link is https://quer-apostar-quanto-pb9c.onrender.com

