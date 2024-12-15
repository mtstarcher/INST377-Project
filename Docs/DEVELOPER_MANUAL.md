Developer Manual Contents:

1. Open terminal
    a. Copy this into terminal and hit enter: “npm install usa-state-validator”
    b. Run the server through the terminal by typing “npm start”
    c. To stop press the key combo of “ctrl + c”

2. Install Cors Extension: 
3. Open options page when clicking on CORS plugin settings
4. Check off the following:
    a. Access-Control-Allow-Headers
    b. Access-Control-Allow-Origin
	c. Click on the * bubble

5. Additional Dependencies to recreate exactly what we have
    "dependencies": {
    "@supabase/supabase-js": "^2.47.1",
    "body-parser": "^1.20.3",
    "express": "^4.21.2",
    "nodemon": "^3.1.7",
    "usa-state-validator": "^1.0.6"
}

6. The supabase database API is being used in the search.html page
    a. The GET is being used for getting data about user’s first names, last names, and the movies they like
    b. The POST is being used to add one user, with their first name, state, and movies this user likes

7. For known bugs, we can’t see the user preference list on the search.html page, after using Vercel to deploy our website to the public. 

8. A road map for future development could include 
    a. Adding a section for popular shows
    b. Adding a section on popular books
    c. More functionality could be added to each page to make it more interactive
    d. A variety of APIs can be used.
