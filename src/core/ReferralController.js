export default class ReferralController {
    /**
     * Returns referrer address from the browser URL.
     *
     * @param {Object} vueContext Vue context.
     * @param {String} paramName Referrer URL and localStorage parameter name.
     */
    static getReferrerAddressFromURL(vueContext, paramName = "ref") {
        if (vueContext.$route.query && vueContext.$route.query.hasOwnProperty(paramName)) {
            return vueContext.$route.query.ref;
        }

        return "";
    }

    /**
     * Sets referrer address from URL or default referrer address to the localStorage.
     *
     * @param {Object} vueContext Vue context.
     * @param {String} paramName Referrer URL and localStorage parameter name.
     */
    static setReferrerAddressIfExists(vueContext, paramName = "ref") {
        if (vueContext.$route.query && vueContext.$route.query.hasOwnProperty(paramName)) {
            this.updateReferrerAddress(vueContext.$route.query.ref, paramName);
        }
    }

    /**
     * Returns referrer address from the localStorage.
     *
     * @param {String} paramName Referrer URL and localStorage parameter name.
     */
    static getReferrerAddress(paramName = "ref") {
        return localStorage.getItem(paramName);
    }

    /**
     * Updates referrer address value in the localStorage.
     *
     * @param {String} address Referrer address.
     * @param {String} paramName Referrer URL and localStorage parameter name.
     */
    static updateReferrerAddress(address, paramName = "ref") {
        localStorage.setItem(paramName, address);
    }
}