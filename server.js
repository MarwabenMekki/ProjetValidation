//  import app
const app= require ("./backend/app");

// app is listening to request on port 3000
// http://localhost:3000
app.listen(3000, ()=>{
    console.log("app is listening on port 3000...");
});