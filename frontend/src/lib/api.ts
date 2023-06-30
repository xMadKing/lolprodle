import { resetTimeMillis } from "./stores";

function fetch_data(){
    let response = fetch('http://localhost:5173/reset_time').then((x) => x.json());
    console.log(response)
    return 
}

setInterval(() => {
    fetch_data();
}, 1000);