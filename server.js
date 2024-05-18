import express from "express"

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(3000, () => {
  console.log("server is listening on port 30000...")
})


app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 2
    console.log(limit)
    // const users = [
    //   { id: 1, name: "abc", email: "v@k" },
    //   { id: 2, name: "xyz", email: "x@z" },
    //   { id: 3, name: "fgh", email: "f@h" },
    // ]
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
    const users = await response.json()

    res.send(`
      <h1 class="text-2xl font-bold my-4">Users</h1>
      <ul>
        ${users.map(user => `<li>${user.name}</li>`).join('')}
      </ul>
    `);

  }, 3000)
})
