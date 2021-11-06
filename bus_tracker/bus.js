
    mapboxgl.accessToken =
        'pk.eyJ1IjoicmFmYWxvcGV6diIsImEiOiJja3YwMTNxbmY2MTFoMnZ0NGdtbXFzbmU5In0.OyQ5aLsX_R4S0ZOzxTxwiA';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/rafalopezv/ck3jkv0ua17hk1co1pmjbabqp',
        center: [-71.104081, 42.365554],
        zoom: 12
    });


    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
        input.onclick = (layer) => {
            const layerId = layer.target.id;
            map.setStyle('mapbox://styles/rafalopezv/' + layerId);
        };
    }

    var busStop = []
    async function run() {
        // get bus data    
        const locations = await getBusLocations();

        busStop = locations.map((e) => {
            return [e.attributes.longitude, e.attributes.latitude]
        })
        // console.log(new Date());
        // console.log(locations);
        // console.log(locations[1]);
        // console.log(locations[1].attributes);
        console.log(locations[1].attributes.latitude);
        console.log(locations[1].attributes.longitude);

        // timer
        setTimeout(run, 5000);
    }

    // // Request bus data from MBTA
    async function getBusLocations() {
        const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
        const response = await fetch(url);
        const json = await response.json();
        return json.data;
    }

    run();



    var counter = 0;

    function move() {
        setTimeout(() => {
            run();

            busStop.forEach(e => {
                const marker = new mapboxgl.Marker()
                    .setLngLat(e)
                    .addTo(map);

            })


            //  if(counter >= busStop.length) return;
            //  marker.setLngLat(busStop[counter]);
            //  counter++;
            move();

        }, 10000);
    }
