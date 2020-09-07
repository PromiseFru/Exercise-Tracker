## Exercise-Tracker
### User stories
* I can provide my own project, not the example URL.
* I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
* I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
* I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. App will return the user object with the exercise fields added.
* I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). App will return the user object with added array log and count (total exercise count).
* I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)