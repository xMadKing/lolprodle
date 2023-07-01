import { resetTimeMillis } from "./stores";

function fetch_data(){
    let response = fetch('http://127.0.0.1:8000/v1/reset_time').then((x) => x.json());
    console.log(response)
    return 
}


export function setup(){
    setInterval(() => {
        fetch_data();
    }, 5000);
}
