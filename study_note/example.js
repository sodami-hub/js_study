const get = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send()

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
};

get('https://jsonplaceholder.typicode.com/posts/1')
    .then(r => console.log(r))
    .catch(e=>console.error(e))
    .finally(()=>console.log('bye!'));