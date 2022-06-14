import React, { useState, useEffect } from 'react';
import { Marker, FeatureGroup, Popup } from 'react-leaflet';

var fetchData = function fetchData(method, url, headers, options) {
    let request = fetch({ method, url, headers }, options);
    return request
        // .then(r => r.json())
        .then(data => data);
}

export default function GeojsonLayer(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if (props.url) {
            const abortController = new AbortController();

            fetchData(props.method, props.url, props.headers, { signal: abortController.signal }).then(data => {
                setData(data);
                setIsLoaded(true);
                console.log(data);
            });

            // cancel fetch on component unmount
            return () => {
                abortController.abort();
            };
        }

    }, [props.url]);
    console.log(isLoaded);
    if (isLoaded) {
        console.log(data.json());
        return (
            <FeatureGroup>
                {data.map(f => (
                    <Marker
                        key={f.rId}
                        position={f.loc}
                    >
                    </Marker>
                ))}
            </FeatureGroup>
        );
    } else {
        return <div>Loading...</div>;
    }
}