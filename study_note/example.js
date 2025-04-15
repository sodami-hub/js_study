const lee = {name: 'Lee'};
const kim = {name: 'Kim'};

const map = new Map([[lee, "developer"],[kim,"designer"],[kim,"designer"]]);

for (const key of map.keys()) {
    console.log(key);
}

for(const val of map.values() ) {
    console.log(val);
}
