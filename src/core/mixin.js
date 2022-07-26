export default {
    name: "copiedMixin",
    data: function() {
        return {
            buttonText: "Copy Link",
            successClass: false,
        };
    },
    methods: {
        copySuccess() {
            this.buttonText = "Copied!";
            this.successClass = true;
            setTimeout(() => {
                this.buttonText = "Copy Link";
                this.successClass = false;
            }, 3000);
        },
        copyFailed() {
            alert("error");
        },
    },
};