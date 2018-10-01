# Calendar Exercise

This is a coding exercise live at https://calendarexercise.site

![](https://media.giphy.com/media/3XDiR1zKhV0x8Eelr5/giphy.gif)

# Stack

This is meant to be a React.js serverless project hosted in Github using `gh-pages`.

The main stack is:

- React.js (Front-end framework)
- Flex Box Grid (CSS grid)
- Axios (Ajax ORM)
- Date-Fns (Date format and math management)
- Babel (ES6 and JSX transpiling)

Stack for development:

- Express.js (HTTP server)
- Chokidar (Real-time file watching)
- Cheerio (HTML tree parsing and modification framework)
- WS (Web-sockets for server/client communication)

# Development

I implemented a rudimentary Hot Module Reaload (HMR) server using [Express.js](), [Chokidar](), and [WS]().

In order to start the HMR dev server simply run:

```
$ yarn dev
```

And open this address in your browser: [http://localhost:3001/](http://localhost:3001/)

![](https://media.giphy.com/media/1o1l8VcQ9oJCJuSMZr/giphy.gif)

# Deployment

This app is written mainly using `ES6` and `JSX`. In order to build the distribution files run:

```
$ yarn build
```

Once the bundle files are updated under the `dist` folder you can simply commit to the `master` branch on Github and the live production page will be automagically updated.
