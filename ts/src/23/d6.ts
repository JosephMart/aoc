const time = [40817772];
const distance = [219101213651089];
const r = time.reduce((acc, t, i) => {
    let options = 0;
    for (let pressTime = 1; pressTime < t; pressTime++) {
        if ((t - pressTime) * pressTime > distance[i]!) {
            options++;
        }
    }
    return acc * (options || 1);
}, 1);
console.log(r);
