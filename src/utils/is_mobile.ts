



export default function isMobile(){
    const agentDetails = navigator.userAgent;

    return (/Android|Mobi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agentDetails));
}