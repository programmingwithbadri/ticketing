import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    // For server side rendering, we need to call the ingress service
    return axios.create({
      // baseUrl will be NgninxLoadBalancerName.NginxNamespace.svc.cluster.local
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers // attaching all the req headers recieved from browser including host and cookies
    });
  } else {
    // We must be on the browser
    // For browser calls, we dont need to pass through ingress
    // Browser will take care of host and all
    return axios.create({
      baseUrl: "/",
    });
  }
};
