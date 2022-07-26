<template>
    <div class="modal">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap modal-msg">
            <div class="modal-header">
                <div class="modal-name">{{ translatesGet("LAUNCH") }}</div>
                <button @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content modal-content-timer">
                <div class="block-timer modal-block-timer">
                    <div class="timer">
                        <div class="timer-col">
                            <div class="timer-count days"></div>
                            <div class="timer-title">{{ translatesGet("DAYS") }}</div>
                        </div>
                        <div class="timer-col">
                            <div class="timer-count hours"></div>
                            <div class="timer-title">{{ translatesGet("HOURS") }}</div>
                        </div>
                        <div class="timer-col">
                            <div class="timer-count minutes"></div>
                            <div class="timer-title">{{ translatesGet("MINS") }}</div>
                        </div>
                        <div class="timer-col">
                            <div class="timer-count seconds"></div>
                            <div class="timer-title">{{ translatesGet("SECS") }}</div>
                        </div>
                    </div>
                </div>
                <div class="modal-describe">
                    {{ translatesGet("MODAL_TIMER_DESCR") }}
                    {{!currentBlockchain || currentBlockchain === 97 ? translatesGet("MODAL_TIMER_DESCR") : translatesGet("MODAL_TIMER_DESCR_POLYGON")}}
                </div>
                <div class="modal-footer">
                    <button @click="$emit('close')" class="btn btn-modal-msg"><span>{{ translatesGet("GOT_IT") }}</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    export default {
        props: ["article"],
        data() {
            return {
                lang: new MultiLang(this),
            };
        },
        methods: {
            translatesGet(key) {
                try {
                    const translations = JSON.parse(window.localStorage.getItem("interfaceTranslations"));
                    const res = translations.lang.find((el) => el.hasOwnProperty(`${key}`));
                    return res[key];
                } catch (ex) {
                    // console.log(ex);
                    return this.lang.get(key);
                }
            },
        },
        created() {
            let countDownDate = new Date(Date.UTC(2022, 6, 12, 15, 0, 0));
            let _this = this;
            // Update the count down every 1 second
            this.timerInterval = setInterval(function () {
                try {
                    // Get today's date and time
                    let now = new Date().getTime();

                    // Find the distance between now and the count down date
                    let distance = countDownDate - now;

                    // Time calculations for days, hours, minutes and seconds
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Display the result in the element with id="demo"
                    document.querySelector(".days").innerHTML = `${days < 10 ? "0" + days : days}`;
                    document.querySelector(".hours").innerHTML = `${hours < 10 ? "0" + hours : hours}`;
                    document.querySelector(".minutes").innerHTML = `${minutes < 10 ? "0" + minutes : minutes}`;
                    document.querySelector(".seconds").innerHTML = `${seconds < 10 ? "0" + seconds : seconds}`;

                    // If the count down is finished, write some text
                    if (distance < 0) {
                        clearInterval(_this.timerInterval);
                        document.getElementById("timer").innerHTML = "LAUNCHED";
                    }
                } catch (error) {
                    console.log(error);
                    clearInterval(_this.timerInterval);
                }
            }, 10);
        },
        beforeDestroy() {
            clearInterval(this.timerInterval);
        },
    };
</script>
