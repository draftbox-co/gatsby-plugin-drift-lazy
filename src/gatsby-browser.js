  
export const onInitialClientRender = (_, pluginOptions) => {
  const driftId = pluginOptions.appId;
  const delayLoad = pluginOptions.optimize;

  const driftScript = document.createElement("script");
  driftScript.innerHTML = `
    window.driftAppId = '${driftId}';
    !function(){var t;if(!(t=window.driftt=window.drift=window.driftt||[]).init)t.invoked?window.console&&console.error&&console.error("Drift snippet included twice."):(t.invoked=!0,t.methods=["identify","config","track","reset","debug","show","ping","page","hide","off","on"],t.factory=function(e){return function(){var n;return(n=Array.prototype.slice.call(arguments)).unshift(e),t.push(n),t}},t.methods.forEach(function(e){t[e]=t.factory(e)}),t.load=function(t){var e,n,o;o=3e5*Math.ceil(new Date/3e5),(n=document.createElement("script")).type="text/javascript",n.async=!0,n.crossorigin="anonymous",n.src="https://js.driftt.com/include/"+o+"/"+t+".js",(e=document.getElementsByTagName("script")[0]).parentNode.insertBefore(n,e)})}();
  `;
  driftScript.defer = true;

  const appendScript = () => {
    document.body.appendChild(driftScript);
    window.drift.SNIPPET_VERSION = '0.3.1';
    window.drift.load(window.driftAppId);
  };

  if (!delayLoad) {
    appendScript();
  } else {
    setTimeout(() => {
      window["requestIdleCallback"]
        ? window.requestIdleCallback(appendScript)
        : appendScript();
      console.log("added script");
    }, 3000);
  }
};