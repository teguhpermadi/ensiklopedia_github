var isPendingInterstitial = false;
var isAutoshowInterstitial = false;

function prepareInterstitialAd() {
    if (!isPendingInterstitial) { // We won't ask for another interstitial ad if we already have an available one
        admob.requestInterstitialAd({
            autoShowInterstitial: isAutoshowInterstitial
        });
    }
}

function onAdLoadedEvent(e) {
    if (e.adType === admob.AD_TYPE.INTERSTITIAL && !isAutoshowInterstitial) {
        isPendingInterstitial = true;
    }
}

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);

    admob.setOptions({
        publisherId:          "ca-app-pub-1984195247855929~1387388198",
        interstitialAdId:     "ca-app-pub-1984195247855929/3307152130",
    });

    document.addEventListener(admob.events.onAdLoaded, onAdLoadedEvent);
    prepareIntestitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);

function showInterstitialAd() {
    if (isPendingInterstitial) {
        admob.showInterstitialAd(function () {
                isPendingInterstitial = false;
                isAutoshowInterstitial = false;
                prepareInterstitialAd();
        });
    } else {
        // The interstitial is not prepared, so in this case, we want to show the interstitial as soon as possible
        isAutoshowInterstitial = true;
        admob.requestInterstitialAd({
            autoShowInterstitial: isAutoshowInterstitial
        });
    }
}