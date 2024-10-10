import express from 'express';

const courseGoals = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your goals</h1>
        <section>
          <form hx-post="/goal" hx-target="#goals" hx-swap="beforeend" id="goal-form">
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals">
            ${courseGoals.map((goal, index) => `
              <li id="goal-${index}">
                <span>${goal}</span>
                <button>Remove</button>
              </li>
            `)}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post("/goal", (req, res) => {
  const addedGoals = req.body.goal;
  courseGoals.push(addedGoals);
  res.send(`
    <li id="goal-${courseGoals.length-1}">
      <span>${addedGoals}</span>
      <button>Remove</button>
    </li>
  `)
})

app.listen(3000);
