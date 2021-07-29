# PROJECT 2 - RANDOM FINANCIAL STOCK PORTFOLIO SITE

https://ancient-fjord-16347.herokuapp.com/

My goal with this project was to have a functional, simulated brokerage site in which a user could input a ticker symbol for a desired stock into a form and have an API return that company's name, current price (or last closing price for the sake of cost), and a description of the company (or if not, leave a blank field in the form for the user to leave notes in).

Due to time constraints and my having spent a lot of time on making my routes' functionality and ensuring individual accounts had their own unique list of stocks, I was unable to implement the API.

### Technologies Used:
-express (server)
-node (package manager)
-mongodb (database)
-ejs (embedded JavaScript, for JS functionality within html)
-ejs partials for head and headers
-express-session (for user authorization)
-jquery (installed but unused due to lack of API implementation)
-mongoose (communication between server and database)
-css Bootstrap for styling

### Approach Taken:
I initially created a single page with a list of stocks using full CRUD that anyone could edit, add to, see, or delete from. I populated the list from a seed file and new stocks were added via a "Stocks" schema. I then added user creation and session routes/schema and added user authorization to the create, update, and delete routes. I took this a step forward by adding a portfolio key to the user account schema and created new ejs files for the user portfolio and add stock features with the portfolio value being an array with the Stock schema in it. Now each user had CRUD capability for their account only. I removed my initial routes and stock list from my sites homepage and moved on to styling the site.

### Unsolved Problems:
There is an issue with the site in which every time the page changes the server has an error regarding the stock.ticker variable in the stock_show.ejs file. I could never find a cause or way to solve this problem, and it didn't affect functionality at all, so I left it.

Another issue is that whenever a stock is added, updated, or deleted by a user they will need to log out and log back in again to see the changes. This I will address in further updates to the project.

### Notes for Future Updates:
-Create a new model for stocks that takes the username from the user model and adds them to the new stock model, then adds each users' stock to the next level down on the model. Then have the site call this model everytime a page changes or is refreshed to fix the issue forcing users to log out and back in to see their changes.
-Add API first to the homepage grabbing a fixed list of stocks and their details as a test.
-Add API functionality to individual user accounts so that at least the price, if not additional details (company name, info, etc.) are added from the API, so that the db only has to store the username and a list of ticker symbols.
-Add a fake money market account with some default value in dollars, and the ability for users to specify shares they'd like to buy or sell. Those shares will then be added or removed from their holdings and money added or removed from their fund. A total value updated with price from API for each stock, and the portfolio total can then be added.
