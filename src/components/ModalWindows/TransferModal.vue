<template>
    <div v-if="nftType === 'Posegg'" class="modal modal-transfer">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                <div class="modal-name" v-if="!onlyData">{{ translatesGet("BTN_TRANSFER") }}</div>
                <div class="modal-name" v-else>{{ translatesGet("NFT_DETAILS") }}</div>
                <button @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content modal-content-transfer">
                <div class="modal-transfer-wrap">
                    <div class="modal-transfer-nft-wrap">
                        <div class="img-wrap">
                            <div v-if="showLoader" class="nft-load">
                                <div class="nft-load-icon"></div>
                            </div>
                            <img class="your-nft-img" :src="getImageLinkByPrice(nft.price)" alt="main-img" />
                        </div>

                        <template v-if="!onlyData">
                            <button v-if="!showDetails" @click="showDetails = !showDetails" class="btn btn-show-more">
                                {{ translatesGet("SHOW_DETAILS") }}
                                <div class="icon-wrap">
                                    <i class="icon-eye"></i>
                                </div>
                            </button>

                            <button v-else @click="showDetails = !showDetails" class="btn btn-show-more">
                                {{ translatesGet("HIDE_DETAILS") }}
                                <div class="icon-wrap">
                                    <i class="icon-eye-slash"></i>
                                </div>
                            </button>
                        </template>
                    </div>
                    <div class="modal-transfer-content-wrap">
                        <div class="transfer-address" v-if="!onlyData">
                            <div class="transfer-address-header">{{ translatesGet("TITLE_INPUT") }}</div>
                            <div class="transfer-address-wrap" :class="{ error: showInputError }">
                                <input
                                    class="transfer-input"
                                    :placeholder="translatesGet('INPUT_PLACEHOLDER_1')"
                                    v-model="receiverAddress"
                                    :class="{ error: showInputError }"
                                />
                                <button @click="transfer()" class="btn btn-transfer">{{ translatesGet("BTN_TRANSFER") }}</button>
                            </div>
                            <div class="input-error-describe" :class="{ active: showInputError }">{{ inputErrorText }}</div>
                        </div>
                        <div class="img-wrap img-wrap-mobile">
                            <div v-if="showLoader" class="nft-load">
                                <div class="nft-load-icon"></div>
                            </div>
                            <img class="your-nft-img" :src="getImageLinkByPrice(nft.price)" alt="main-img" />
                        </div>
                        <div class="nft-details">
                            <div class="nft-details-title">
                                <div class="h3 nft-name">{{ nft.name }}</div>
                                <div class="nft-details-collection">
                                    <div class="icon-wrap">
                                        <img src="@/assets/images/all/push-icon.png" alt="" />
                                    </div>
                                    <span>{{ nft.collection }} </span>
                                </div>
                            </div>
                            <div class="nft-details-describe">{{ nft.description }}</div>
                        </div>

                        <div class="container-mobile-btns">
                            <template v-if="!onlyData">
                                <button v-if="!showDetails" @click="showDetails = !showDetails" class="btn btn-show-more">
                                    {{ translatesGet("SHOW_DETAILS") }}
                                    <div class="icon-wrap">
                                        <i class="icon-eye"></i>
                                    </div>
                                </button>

                                <button v-else @click="showDetails = !showDetails" class="btn btn-show-more">
                                    {{ translatesGet("HIDE_DETAILS") }}
                                    <div class="icon-wrap">
                                        <i class="icon-eye-slash"></i>
                                    </div>
                                </button>
                            </template>
                        </div>

                        <div v-if="showDetails" class="nft-details-block-more">
                            <div class="block-info">
                                <div class="block-info-title title-info">{{ translatesGet("INFO") }}:</div>

                                <div class="block-info-table">
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("CONTRACT") }}</div>
                                        <div class="block-info-td block-info-value">
                                            <a :href="nftExplorerLink" target="_blank" rel="noopener noreferrer">
                                                <div class="block-info-link">{{ addressShort(getNftContract, 7, 5) }}</div></a
                                            >
                                        </div>
                                    </div>

                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("BLOCKCHAIN") }}</div>
                                        <div class="block-info-td block-info-value">
                                            {{ "BNB Chain" }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="block-info">
                                <div class="block-info-title title-attr">{{ translatesGet("ATTRS") }}:</div>

                                <div class="block-info-table">
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("PURCH_VALUE") }}</div>
                                        <div class="block-info-td block-info-value">{{ getPurchaseValue }}</div>
                                    </div>
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ "STRENGHT" }}</div>
                                        <div class="block-info-td block-info-value">{{ Number(this.nft.base_strength) }}</div>
                                    </div>
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ "HEALT" }}</div>
                                        <div class="block-info-td block-info-value">{{ Number(this.nft.base_healt) }}</div>
                                    </div>
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ "SPEED" }}</div>
                                        <div class="block-info-td block-info-value">{{ Number(this.nft.base_speed) }}</div>
                                    </div>
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ "MAGIC" }}</div>
                                        <div class="block-info-td block-info-value">{{ Number(this.nft.base_magic) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="nftType === 'Boost'" class="modal modal-transfer modal-transfer-boost">
        <div class="modal-full-close" @click="$emit('close')"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                <div class="modal-name" v-if="!onlyData">{{ translatesGet("BTN_TRANSFER") }}</div>
                <div class="modal-name" v-else>{{ translatesGet("NFT_BOOST_DET") }}</div>
                <button @click="$emit('close')" class="modal-btn-close">
                    <i class="icon-close"></i>
                </button>
            </div>
            <div class="modal-content modal-content-transfer">
                <div class="modal-transfer-wrap">
                    <div class="modal-transfer-nft-wrap">
                        <div class="img-wrap">
                            <div v-if="showLoader" class="nft-load">
                                <div class="nft-load-icon"></div>
                            </div>
                            <div class="your-nft-img">
                                <img :src="getClassImg" />
                            </div>
                        </div>

                        <template v-if="!onlyData">
                            <button v-if="!showDetails" @click="showDetails = !showDetails" class="btn btn-show-more">
                                {{ translatesGet("SHOW_DETAILS") }}
                                <div class="icon-wrap">
                                    <i class="icon-eye"></i>
                                </div>
                            </button>

                            <button v-else @click="showDetails = !showDetails" class="btn btn-show-more">
                                {{ translatesGet("HIDE_DETAILS") }}
                                <div class="icon-wrap">
                                    <i class="icon-eye-slash"></i>
                                </div>
                            </button>
                        </template>
                    </div>
                    <div class="modal-transfer-content-wrap">
                        <div class="transfer-address" v-if="!onlyData">
                            <div class="transfer-address-header">{{ translatesGet("TITLE_INPUT") }}</div>
                            <div class="transfer-address-wrap" :class="{ error: showInputError }">
                                <input class="transfer-input" :placeholder="translatesGet('INPUT_PLACEHOLDER_1')" v-model="receiverAddress" />
                                <button @click="transfer()" class="btn btn-transfer">{{ translatesGet("BTN_TRANSFER") }}</button>
                            </div>
                            <div class="input-error-describe" :class="{ active: showInputError }">{{ inputErrorText }}</div>
                        </div>
                        <div class="img-wrap img-wrap-mobile">
                            <div v-if="showLoader" class="nft-load">
                                <div class="nft-load-icon"></div>
                            </div>

                            <img class="your-nft-img" :src="nft.image" alt="main-img" />
                        </div>
                        <div class="nft-details">
                            <div class="nft-details-title">
                                <div class="h3 nft-name">{{ nft.name }}</div>
                                <div class="nft-details-collection">
                                    <div class="icon-wrap">
                                        <img src="@/assets/images/all/push-icon.png" alt="" />
                                    </div>
                                    <span>{{ nft.collection }} </span>
                                </div>
                            </div>
                            <div class="nft-details-describe">{{ nft.description }}</div>
                        </div>

                        <div class="container-mobile-btns">
                            <template v-if="!onlyData">
                                <button v-if="!showDetails" @click="showDetails = !showDetails" class="btn btn-show-more">
                                    {{ translatesGet("SHOW_DETAILS") }}
                                    <div class="icon-wrap">
                                        <i class="icon-eye"></i>
                                    </div>
                                </button>

                                <button v-else @click="showDetails = !showDetails" class="btn btn-show-more">
                                    {{ translatesGet("HIDE_DETAILS") }}
                                    <div class="icon-wrap">
                                        <i class="icon-eye-slash"></i>
                                    </div>
                                </button>
                            </template>
                        </div>

                        <div v-if="showDetails" class="nft-details-block-more">
                            <div class="block-info">
                                <div class="block-info-title title-info">{{ translatesGet("INFO") }}:</div>

                                <div class="block-info-table">
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("CONTRACT") }}</div>
                                        <div class="block-info-td block-info-value">
                                            <a :href="nftExplorerLink" target="_blank" rel="noopener noreferrer">
                                                <div class="block-info-link">{{ addressShort(getBoostContract, 7, 5) }}</div></a
                                            >
                                        </div>
                                    </div>

                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("TOKEN_ID") }}</div>
                                        <div class="block-info-td block-info-value">
                                            <a :href="nftTokenLink" target="_blank" rel="noopener noreferrer"
                                                ><div class="block-info-link">{{ nft.tokenId }}</div></a
                                            >
                                        </div>
                                    </div>

                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("BLOCKCHAIN") }}</div>
                                        <div class="block-info-td block-info-value">
                                            {{ "BNB Chain" }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="block-info">
                                <div class="block-info-title title-attr">{{ translatesGet("ATTRS") }}:</div>

                                <div class="block-info-table">
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("TYPE") }}</div>
                                        <div class="block-info-td block-info-value">{{ nft.boostType == 1 ? "Time Boost" : "Profit Boost" }}</div>
                                    </div>
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("TIME") }}</div>
                                        <div class="block-info-td block-info-value">{{ Number(nft.boostTimePercent) === 0 ? "-" : Number(nft.boostTimePercent) / 100 + "%" }}</div>
                                    </div>
                                    <div class="block-info-row">
                                        <div class="block-info-td block-info-name">{{ translatesGet("PROFIT") }}</div>
                                        <div class="block-info-td block-info-value">{{ Number(nft.boostProfitPercent) === 0 ? "-" : Number(nft.boostProfitPercent) / 100 + "%" }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MultiLang from "@/core/multilang";
    import { mapState } from "vuex";
    import config from "../../../config.json";
    export default {
        name: "TransferModal",
        props: ["nft", "nftType", "onlyData"],
        data() {
            return {
                lang: new MultiLang(this),
                showLoader: false,
                receiverAddress: "",
                showDetails: this.onlyData || false,
                showInputError: false,
                inputErrorText: "",
                inputActive: false,
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
            focusInputIn() {
                return (this.inputActive = true);
            },
            focusInputOut() {
                return (this.inputActive = false);
            },
            getNftImage(index) {
                console.log("there 2");
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./nft-" + index + ".png");
            },
            getImageLinkByPrice(nftPrice) {
                console.log("there");
                console.log(nftPrice);
                let nftId = nftPrice == 17 ? 1 : nftPrice == 47 ? 2 : nftPrice == 97 ? 3 : nftPrice == 197 ? 4 : nftPrice == 497 ? 5 : nftPrice == 997 ? 6 : nftPrice == 1997 ?  7 : nftPrice == 4997 ? 8 : 0;
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./nft-" + nftId + ".png");
            },
            async transfer() {
                if (!this.receiverAddress) {
                    this.showInputError = true;
                    this.inputErrorText = "Please enter the recipient address";
                    return;
                }
                if (this.receiverAddress) {
                    const res = this.receiverAddress.match(/^0x([a-fA-F0-9]{40})/g);
                    if (!res) {
                        this.showInputError = true;
                        this.inputErrorText = "Address Doesn't Seem to Be Valid";
                        return;
                    }
                }
                if (this.receiverAddress.toLowerCase() && this.currentAddress && this.currentAddress.toLowerCase() === this.receiverAddress.toLowerCase()) {
                    this.showInputError = true;
                    this.inputErrorText = "You are  trying to send the NFT to the address of it's owner.";
                    return;
                }
                try {
                    this.showLoader = true;
                    // const type = this.nft.collection.includes("Boost") ? "boost" : "egg";
                    const type = "egg";
                    const res = await this.$root.core.transferNft(type, this.currentAddress, this.nft.tokenId, this.receiverAddress);

                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Sending your transaction into the blockchain...`,
                    });
                    await res.wait();
                    this.$store.commit("push_notification", {
                        type: "warning",
                        typeClass: "warning",
                        message: `Your transaction has successfully entered the blockchain! Waiting for enough confirmations...`,
                    });
                    await res.wait(5);
                    this.showLoader = true;
                    this.$store.commit("push_notification", {
                        type: "success",
                        typeClass: "success",
                        message: `Your transaction has been processed! Your quacky NFT has been sent successfully!`,
                    });
                    this.$emit("close");
                } catch (error) {
                    this.showLoader = false;
                    if (JSON.stringify(error).includes("bad address checksum")) {
                        this.inputErrorText = "Address Doesn't Seem to Be Valid ";
                        this.showInputError = true;
                        return;
                    } else {
                        this.$root.core.handleError(error);
                    }

                    return;
                }
            },
            addressShort(addr, upToBegin, upToLast) {
                return addr.slice(0, upToBegin) + "..." + addr.slice(addr.length - upToLast, addr.length);
            },
        },
        created() {
            console.log(this.nft);
        },
        computed: {
            ...mapState(["currentBlockchain", "currentAddress", "userNftsData"]),
            getNftContract() {
                // return config[this.currentBlockchain][`${this.nft.collection.includes("Boost") ? "BOOST_NFT_CONTRACT" : "NFT_CONTRACT"}`];
                return config[this.currentBlockchain]["NFT_CONTRACT"];
            },
            getBoostContract() {
                // return config[this.currentBlockchain][`${this.nft.collection.includes("Boost") ? "BOOST_NFT_CONTRACT" : "NFT_CONTRACT"}`];
                return config[this.currentBlockchain]["BOOST_NFT_CONTRACT"];
            },
            getPurchaseValue() {
                // const currency = this.nft.image.includes("chainId=97") ? "BNB" : "MATIC";
                const currency = "BUSD";
                return `${this.nft.price} ${currency}`;
            },
            getBackgroundColor() {
                // return this.nftType === "Posegg" ? this.nft.attributes.find((el) => el.trait_type === "background_color")?.value : "#000000";
                return "#000000";
            },
            getClassImg() {
                let boostPercent = (Number(this.nft.boostTimePercent) != 0 ? Number(this.nft.boostTimePercent) : Number(this.nft.boostProfitPercent)) / 100;
                let lvl = boostPercent == 2 ? 1 : boostPercent == 5 ? 2 : 3;
                let nameFix = this.nft.boostType == 1 ? "time-" : "percent-";
                var images = require.context("/src/assets/images/all/", false, /\.png$/);
                return images("./boost-" + nameFix + lvl + ".png");
            },
            nfts() {
                if (
                    this.userNftsData &&
                    this.currentBlockchain &&
                    this.currentAddress &&
                    this.currentAddress !== "0x0000000000000000000000000000000000000000"
                ) {
                    // const arr = this.userNftsData[this.currentBlockchain][config[this.currentBlockchain][`${this.nft.collection.includes("Boost") ? "BOOST_NFT_CONTRACT" : "NFT_CONTRACT"}`]] || [];
                    // return arr.sort((a, b) => b.id - a.id);
                    return this.userNftsData;
                }
                return null;
            },
            nftExplorerLink() {
                return Number(this.nft.chainId) === 56
                    ? `https://bscscan.com/address/${this.nft.nftContractAddress}`
                    : Number(this.nft.chainId) === 137
                    ? `https://polygonscan.com/address/${this.nft.nftContractAddress}`
                    : "";
            },
            nftTokenLink() {
                return Number(this.nft.chainId) === 56
                    ? `https://bscscan.com/token/${this.nft.nftContractAddress}?a=${this.nft.tokenId}`
                    : Number(this.nft.chainId) === 137
                    ? `https://polygonscan.com/token/${this.nft.nftContractAddress}?a=${this.nft.tokenId}`
                    : "";
            },
            getMetadata() {
                // return this.nft.collection.includes("Boost")
                //     ? `https://base.posduck.com/api/getBoostMetadata?chainId=${this.currentBlockchain}&nftAddress=${this.nft.nftContractAddress}&id=${this.nft.tokenId}`
                //     : `https://base.posduck.com/api/getNftMetadata?chainId=${this.currentBlockchain}&nftAddress=${this.nft.nftContractAddress}&id=${this.nft.tokenId}`;
                return null;
            },
        },
        watch: {
            receiverAddress: function (newVal, oldVal) {
                if (newVal.length < oldVal.length) {
                    this.showInputError = false;
                    this.inputErrorText = "";
                }
                if (newVal.toLowerCase() !== oldVal.toLowerCase()) {
                    this.showInputError = false;
                    this.inputErrorText = "";
                }
            },
        },
    };
</script>
