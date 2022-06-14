
export const RequestToAPI= () =>{
    var locationBus = fetch({
        method: 'GET',
        url:    'https://city.dozor.tech/data?t=2&p=893',
        headers: {
            cookie: 'JSESSIONID=6B2A8F84CD5B324CB5219EE44D5ED52D;'
            +' gts.web.uuid=8DAD280E-0B94-497D-A989-57263B966B4F;' 
            +'gts.web.city=iv-frankivsk; gts.web.google_map.center.lon=48.916362;' 
            +'gts.web.google_map.center.lat=24.715304; gts.web.google_map.zoom=13;'
            +' gts.web.top_panel.expanded=false',
            host: 'city.dozor.tech'	
        }
    })
    .then(response => {
        var locationBus = JSON.parse(response.body).data[0].dvs[0].loc;
        console.log(response);
        return locationBus;
    })

    return locationBus;
}

