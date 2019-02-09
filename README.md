## API Project: URL Shortener Microservice for freeCodeCamp

I submitted this project for FreeCodeCamp API Microservice course : this simple project aims to shorten a long URL to make your life easier when you have to keep in mind numerous URLs.

I here developed the whole project on glitch.com and stored the database on mLab.

You can try out the project live <a href="https://spangle-tennis.glitch.me/">right here</a>.

---

#### Technologies used

* Node.JS
* MongoDB

---

#### Features

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.

---

#### Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) :  url=https://www.google.com

---

#### Usage:

[this_project_url]/api/shorturl/1

#### Will redirect to:

http://freecodecamp.org